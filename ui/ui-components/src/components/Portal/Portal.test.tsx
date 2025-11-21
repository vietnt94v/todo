import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Portal } from './Portal';

describe('Portal', () => {
  afterEach(() => {
    const portalRoot = document.getElementById('portal-root');
    if (portalRoot) {
      portalRoot.remove();
    }
  });

  it('renders children in portal container', () => {
    render(
      <Portal>
        <div data-testid="portal-content">Portal Content</div>
      </Portal>,
    );

    const content = screen.getByTestId('portal-content');
    expect(content).toBeInTheDocument();
    expect(content.textContent).toBe('Portal Content');
  });

  it('creates portal container if it does not exist', () => {
    render(
      <Portal>
        <div>Content</div>
      </Portal>,
    );

    const portalRoot = document.getElementById('portal-root');
    expect(portalRoot).toBeInTheDocument();
  });

  it('uses custom container id', () => {
    render(
      <Portal containerId="custom-portal">
        <div data-testid="custom-content">Custom Portal</div>
      </Portal>,
    );

    const customPortal = document.getElementById('custom-portal');
    expect(customPortal).toBeInTheDocument();

    const content = screen.getByTestId('custom-content');
    expect(content).toBeInTheDocument();
  });

  it('renders children outside of parent component DOM tree', () => {
    const { container } = render(
      <div data-testid="parent">
        <Portal>
          <div data-testid="portal-child">Portal Child</div>
        </Portal>
      </div>,
    );

    const parent = screen.getByTestId('parent');
    const child = screen.getByTestId('portal-child');

    expect(parent).toBeInTheDocument();
    expect(child).toBeInTheDocument();
    expect(container.contains(child)).toBe(false);
  });
});
