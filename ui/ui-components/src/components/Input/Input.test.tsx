import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText(/enter text/i)
    expect(input).toBeInTheDocument()
  })

  describe('sizes', () => {
    it('renders small input', () => {
      render(<Input size="sm" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('h-8')
    })

    it('renders medium input', () => {
      render(<Input size="md" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('h-10')
    })

    it('renders large input', () => {
      render(<Input size="lg" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('h-12')
    })
  })

  describe('label', () => {
    it('renders with label', () => {
      render(<Input label="Username" />)
      const label = screen.getByText(/username/i)
      expect(label).toBeInTheDocument()
    })

    it('renders without label', () => {
      render(<Input placeholder="No label" />)
      const label = screen.queryByRole('label')
      expect(label).not.toBeInTheDocument()
    })
  })

  describe('error state', () => {
    it('renders error state', () => {
      render(<Input error data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-red-500')
    })

    it('renders error message', () => {
      render(<Input error errorMessage="This field is required" />)
      const errorMsg = screen.getByText(/this field is required/i)
      expect(errorMsg).toBeInTheDocument()
    })

    it('does not render error message when error is false', () => {
      render(<Input errorMessage="This field is required" />)
      const errorMsg = screen.queryByText(/this field is required/i)
      expect(errorMsg).not.toBeInTheDocument()
    })
  })

  describe('states', () => {
    it('handles disabled state', () => {
      render(<Input disabled placeholder="Disabled" />)
      const input = screen.getByPlaceholderText(/disabled/i)
      expect(input).toBeDisabled()
    })

    it('handles input change', async () => {
      const handleChange = jest.fn()
      const user = userEvent.setup()
      render(<Input onChange={handleChange} placeholder="Type here" />)
      const input = screen.getByPlaceholderText(/type here/i)
      await user.type(input, 'Hello')
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('input types', () => {
    it('renders text input', () => {
      render(<Input type="text" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('renders password input', () => {
      render(<Input type="password" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('renders email input', () => {
      render(<Input type="email" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('renders number input', () => {
      render(<Input type="number" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'number')
    })
  })

  it('accepts custom className', () => {
    render(<Input className="custom-class" data-testid="input" />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})

