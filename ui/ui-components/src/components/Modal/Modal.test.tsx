import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  afterEach(() => {
    const portalRoot = document.getElementById('portal-root')
    if (portalRoot) {
      portalRoot.remove()
    }
  })

  it('renders modal when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('does not render modal when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    )

    const closeButton = screen.getByLabelText('Close modal')
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    )

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when overlay is clicked and closeOnOverlayClick is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" closeOnOverlayClick={true}>
        <div>Content</div>
      </Modal>
    )

    const overlay = screen.getByText('Test Modal').parentElement?.parentElement
    if (overlay) {
      fireEvent.click(overlay)
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    }
  })

  it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" closeOnOverlayClick={false}>
        <div>Content</div>
      </Modal>
    )

    const overlay = screen.getByText('Test Modal').parentElement?.parentElement
    if (overlay) {
      fireEvent.click(overlay)
      expect(mockOnClose).not.toHaveBeenCalled()
    }
  })

  it('does not show close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" showCloseButton={false}>
        <div>Content</div>
      </Modal>
    )

    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(
      <Modal
        isOpen={true}
        onClose={mockOnClose}
        title="Test Modal"
        footer={<div>Footer Content</div>}
      >
        <div>Content</div>
      </Modal>
    )

    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" size="sm">
        <div>Content</div>
      </Modal>
    )

    let modalContent = screen.getByText('Test Modal').parentElement?.parentElement
    expect(modalContent).toHaveClass('max-w-sm')

    rerender(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal" size="lg">
        <div>Content</div>
      </Modal>
    )

    modalContent = screen.getByText('Test Modal').parentElement?.parentElement
    expect(modalContent).toHaveClass('max-w-lg')
  })

  it('locks body scroll when modal is open', async () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    )

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })

    rerender(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <div>Content</div>
      </Modal>
    )

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset')
    })
  })

  it('renders in portal', () => {
    const { container } = render(
      <div data-testid="parent">
        <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
          <div>Content</div>
        </Modal>
      </div>
    )

    const modalContent = screen.getByText('Test Modal')
    expect(modalContent).toBeInTheDocument()
    expect(container.contains(modalContent)).toBe(false)
  })
})

