import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TableSearch } from './TableSearch';

describe('TableSearch', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input', () => {
    render(<TableSearch onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders custom placeholder', () => {
    render(
      <TableSearch onSearch={mockOnSearch} placeholder="Search users..." />,
    );
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  it('calls onSearch when search button clicked', async () => {
    const user = userEvent.setup();
    render(<TableSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test query');

    const searchButton = screen.getByRole('button');
    await user.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('calls onSearch on Enter key', async () => {
    const user = userEvent.setup();
    render(<TableSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test{Enter}');

    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('shows clear button when text entered', async () => {
    const user = userEvent.setup();
    render(<TableSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test');

    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clears search on clear button click', async () => {
    const user = userEvent.setup();
    render(<TableSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test');

    const clearButton = screen.getByLabelText('Clear search');
    await user.click(clearButton);

    expect(input).toHaveValue('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
