import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Dropdown, DropdownItem } from './Dropdown'

describe('Dropdown', () => {
  const mockOnSelect = jest.fn()

  const items: DropdownItem[] = [
    { label: 'Edit', value: 'edit', icon: '✏️' },
    { label: 'Delete', value: 'delete', icon: '🗑️' },
    { label: 'Disabled', value: 'disabled', disabled: true },
  ]

  const itemsWithDivider: DropdownItem[] = [
    { label: 'Edit', value: 'edit' },
    { label: '', value: '', divider: true },
    { label: 'Delete', value: 'delete' },
  ]

  beforeEach(() => {
    mockOnSelect.mockClear()
  })

  it('renders trigger element', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>} items={items} onSelect={mockOnSelect} />
    )

    expect(screen.getByText('Open Menu')).toBeInTheDocument()
  })

  it('opens dropdown when trigger is clicked', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>} items={items} onSelect={mockOnSelect} />
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('closes dropdown when item is selected', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>} items={items} onSelect={mockOnSelect} />
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    const editItem = screen.getByText('Edit')
    fireEvent.click(editItem)

    expect(mockOnSelect).toHaveBeenCalledWith('edit')
    expect(screen.queryByText('Edit')).not.toBeInTheDocument()
  })

  it('does not call onSelect for disabled items', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>} items={items} onSelect={mockOnSelect} />
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    const disabledItem = screen.getByText('Disabled')
    fireEvent.click(disabledItem)

    expect(mockOnSelect).not.toHaveBeenCalled()
  })

  it('renders dividers correctly', () => {
    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={itemsWithDivider}
        onSelect={mockOnSelect}
      />
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    const dividers = document.querySelectorAll('.h-px.bg-gray-200')
    expect(dividers.length).toBeGreaterThan(0)
  })

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Dropdown trigger={<button>Open Menu</button>} items={items} onSelect={mockOnSelect} />
      </div>
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    expect(screen.getByText('Edit')).toBeInTheDocument()

    const outside = screen.getByTestId('outside')
    fireEvent.mouseDown(outside)

    await waitFor(() => {
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })
  })

  it('closes dropdown when Escape key is pressed', async () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>} items={items} onSelect={mockOnSelect} />
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    expect(screen.getByText('Edit')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => {
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })
  })

  it('does not open when disabled', () => {
    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={items}
        onSelect={mockOnSelect}
        disabled={true}
      />
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    expect(screen.queryByText('Edit')).not.toBeInTheDocument()
  })

  it('renders icons when provided', () => {
    render(
      <Dropdown trigger={<button>Open Menu</button>} items={items} onSelect={mockOnSelect} />
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    expect(screen.getByText('✏️')).toBeInTheDocument()
    expect(screen.getByText('🗑️')).toBeInTheDocument()
  })

  it('applies correct position classes', () => {
    const { rerender } = render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={items}
        onSelect={mockOnSelect}
        position="bottom-left"
      />
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    let menu = screen.getByText('Edit').parentElement
    expect(menu).toHaveClass('top-full', 'left-0')

    fireEvent.click(trigger)

    rerender(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={items}
        onSelect={mockOnSelect}
        position="top-right"
      />
    )

    fireEvent.click(trigger)

    menu = screen.getByText('Edit').parentElement
    expect(menu).toHaveClass('bottom-full', 'right-0')
  })

  it('auto-positions dropdown based on viewport space', async () => {
    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={items}
        onSelect={mockOnSelect}
        position="auto"
      />
    )

    const trigger = screen.getByText('Open Menu')
    fireEvent.click(trigger)

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument()
    })
  })

  it('applies custom className', () => {
    const { container } = render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={items}
        onSelect={mockOnSelect}
        className="custom-class"
      />
    )

    const dropdown = container.querySelector('.custom-class')
    expect(dropdown).toBeInTheDocument()
  })
})

