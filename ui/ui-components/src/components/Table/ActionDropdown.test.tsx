import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionDropdown } from './ActionDropdown';

describe('ActionDropdown', () => {
  const mockRow = { id: 1, name: 'Test' };
  const mockActions = [
    { label: 'Edit', onClick: jest.fn() },
    { label: 'Delete', onClick: jest.fn() },
  ];

  it('renders dropdown button', () => {
    render(<ActionDropdown actions={mockActions} row={mockRow} />);
    expect(screen.getByLabelText('Actions')).toBeInTheDocument();
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    render(<ActionDropdown actions={mockActions} row={mockRow} />);

    const button = screen.getByLabelText('Actions');
    await user.click(button);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls action onClick with row data', async () => {
    const user = userEvent.setup();
    const handleEdit = jest.fn();
    const actions = [{ label: 'Edit', onClick: handleEdit }];

    render(<ActionDropdown actions={actions} row={mockRow} />);

    const button = screen.getByLabelText('Actions');
    await user.click(button);

    const editButton = screen.getByText('Edit');
    await user.click(editButton);

    expect(handleEdit).toHaveBeenCalledWith(mockRow);
  });

  it('closes dropdown after action click', async () => {
    const user = userEvent.setup();
    render(<ActionDropdown actions={mockActions} row={mockRow} />);

    const button = screen.getByLabelText('Actions');
    await user.click(button);

    const editButton = screen.getByText('Edit');
    await user.click(editButton);

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});
