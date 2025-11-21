import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  afterEach(() => {
    const portalRoot = document.getElementById('portal-root');
    if (portalRoot) {
      portalRoot.remove();
    }
  });

  it('renders drawer when isOpen is true', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} title="Test Drawer">
        <div>Drawer Content</div>
      </Drawer>,
    );

    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });

  it('applies correct position classes', () => {
    const { rerender } = render(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        title="Test Drawer"
        position="left"
      >
        <div>Content</div>
      </Drawer>,
    );

    let drawerElement =
      screen.getByText('Test Drawer').parentElement?.parentElement
        ?.parentElement;
    expect(drawerElement).toHaveClass('left-0');

    rerender(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        title="Test Drawer"
        position="right"
      >
        <div>Content</div>
      </Drawer>,
    );

    drawerElement =
      screen.getByText('Test Drawer').parentElement?.parentElement
        ?.parentElement;
    expect(drawerElement).toHaveClass('right-0');
  });

  it('applies correct size classes for left position', () => {
    const { rerender } = render(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        title="Test Drawer"
        position="left"
        size="sm"
      >
        <div>Content</div>
      </Drawer>,
    );

    let drawerElement =
      screen.getByText('Test Drawer').parentElement?.parentElement
        ?.parentElement;
    expect(drawerElement).toHaveClass('w-64');

    rerender(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        title="Test Drawer"
        position="left"
        size="lg"
      >
        <div>Content</div>
      </Drawer>,
    );

    drawerElement =
      screen.getByText('Test Drawer').parentElement?.parentElement
        ?.parentElement;
    expect(drawerElement).toHaveClass('w-96');
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} title="Test Drawer">
        <div>Content</div>
      </Drawer>,
    );

    const closeButton = screen.getByLabelText('Close drawer');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    render(
      <Drawer isOpen={true} onClose={mockOnClose} title="Test Drawer">
        <div>Content</div>
      </Drawer>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked and closeOnOverlayClick is true', () => {
    render(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        title="Test Drawer"
        closeOnOverlayClick={true}
      >
        <div>Content</div>
      </Drawer>,
    );

    const overlays =
      screen.getAllByText('Test Drawer')[0].parentElement?.parentElement
        ?.parentElement?.parentElement?.children;
    if (overlays && overlays.length > 0) {
      const overlay = overlays[0];
      fireEvent.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    render(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        title="Test Drawer"
        closeOnOverlayClick={false}
      >
        <div>Content</div>
      </Drawer>,
    );

    const overlays =
      screen.getAllByText('Test Drawer')[0].parentElement?.parentElement
        ?.parentElement?.parentElement?.children;
    if (overlays && overlays.length > 0) {
      const overlay = overlays[0];
      fireEvent.click(overlay);
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('does not show close button when showCloseButton is false', () => {
    render(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        title="Test Drawer"
        showCloseButton={false}
      >
        <div>Content</div>
      </Drawer>,
    );

    expect(screen.queryByLabelText('Close drawer')).not.toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        title="Test Drawer"
        footer={<div>Footer Content</div>}
      >
        <div>Content</div>
      </Drawer>,
    );

    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('applies translate classes based on isOpen state', () => {
    const { rerender } = render(
      <Drawer
        isOpen={false}
        onClose={mockOnClose}
        title="Test Drawer"
        position="right"
      >
        <div>Content</div>
      </Drawer>,
    );

    let drawerElement =
      screen.getByText('Test Drawer').parentElement?.parentElement
        ?.parentElement;
    expect(drawerElement).toHaveClass('translate-x-full');

    rerender(
      <Drawer
        isOpen={true}
        onClose={mockOnClose}
        title="Test Drawer"
        position="right"
      >
        <div>Content</div>
      </Drawer>,
    );

    drawerElement =
      screen.getByText('Test Drawer').parentElement?.parentElement
        ?.parentElement;
    expect(drawerElement).toHaveClass('translate-x-0');
  });

  it('locks body scroll when drawer is open', async () => {
    const { rerender } = render(
      <Drawer isOpen={true} onClose={mockOnClose} title="Test Drawer">
        <div>Content</div>
      </Drawer>,
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden');
    });

    rerender(
      <Drawer isOpen={false} onClose={mockOnClose} title="Test Drawer">
        <div>Content</div>
      </Drawer>,
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset');
    });
  });

  it('renders in portal', () => {
    const { container } = render(
      <div data-testid="parent">
        <Drawer isOpen={true} onClose={mockOnClose} title="Test Drawer">
          <div>Content</div>
        </Drawer>
      </div>,
    );

    const drawerContent = screen.getByText('Test Drawer');
    expect(drawerContent).toBeInTheDocument();
    expect(container.contains(drawerContent)).toBe(false);
  });
});
