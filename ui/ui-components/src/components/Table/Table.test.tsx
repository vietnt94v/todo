import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Table } from './Table'
import { TableConfig } from './types'

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
]

const basicConfig: TableConfig = {
  columns: [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'age', header: 'Age' },
  ],
}

describe('Table', () => {
  it('renders table with data', () => {
    render(<Table config={basicConfig} data={mockData} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('renders table title when provided', () => {
    render(<Table title="Users Table" config={basicConfig} data={mockData} />)
    expect(screen.getByText('Users Table')).toBeInTheDocument()
  })

  it('renders empty state when no data', () => {
    render(<Table config={basicConfig} data={[]} />)
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    render(<Table config={basicConfig} data={[]} loading />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  describe('Client-side mode', () => {
    const clientConfig: TableConfig = {
      ...basicConfig,
      mode: 'client',
      searchConfig: { enabled: true },
      pagination: { itemsPerPageOptions: [2, 5, 10] },
    }

    it('handles client-side search', async () => {
      const user = userEvent.setup()
      render(<Table config={clientConfig} data={mockData} />)
      
      const searchInput = screen.getByPlaceholderText('Search...')
      await user.clear(searchInput)
      await user.type(searchInput, 'Jane')
      
      const searchButton = screen.getAllByRole('button')[0]
      await user.click(searchButton)

      await waitFor(() => {
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
      })
    })

    it('handles client-side pagination', async () => {
      const user = userEvent.setup()
      const paginatedConfig = {
        ...clientConfig,
        pagination: { defaultItemsPerPage: 2, itemsPerPageOptions: [2, 5] },
      }
      
      render(<Table config={paginatedConfig} data={mockData} />)
      
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument()

      const nextButton = screen.getByLabelText('Next page')
      await user.click(nextButton)

      await waitFor(() => {
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
        expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
      })
    })

    it('handles items per page change', async () => {
      const user = userEvent.setup()
      const paginatedConfig = {
        ...clientConfig,
        pagination: { defaultItemsPerPage: 2, itemsPerPageOptions: [2, 5] },
      }
      
      render(<Table config={paginatedConfig} data={mockData} />)
      
      const select = screen.getByRole('combobox')
      await user.selectOptions(select, '5')

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
      })
    })
  })

  describe('Server-side mode', () => {
    const onPageChange = jest.fn()
    const onSearch = jest.fn()
    const onItemsPerPageChange = jest.fn()

    const serverConfig: TableConfig = {
      ...basicConfig,
      mode: 'server',
      searchConfig: { enabled: true },
      serverSideCallbacks: {
        onPageChange,
        onSearch,
        onItemsPerPageChange,
      },
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('calls onSearch callback', async () => {
      const user = userEvent.setup()
      render(<Table config={serverConfig} data={mockData} totalItems={10} />)
      
      const searchInput = screen.getByPlaceholderText('Search...')
      await user.clear(searchInput)
      await user.type(searchInput, 'test')
      
      const searchButton = screen.getByRole('button')
      await user.click(searchButton)

      expect(onSearch).toHaveBeenCalledWith('test')
    })

    it('calls onPageChange callback', async () => {
      const user = userEvent.setup()
      render(
        <Table 
          config={serverConfig} 
          data={mockData} 
          totalItems={10}
          currentPage={1}
          itemsPerPage={5}
        />
      )
      
      const nextButton = screen.getByLabelText('Next page')
      await user.click(nextButton)

      expect(onPageChange).toHaveBeenCalledWith(2)
    })

    it('calls onItemsPerPageChange callback', async () => {
      const user = userEvent.setup()
      render(
        <Table 
          config={serverConfig} 
          data={mockData} 
          totalItems={10}
          currentPage={1}
          itemsPerPage={25}
        />
      )
      
      const select = screen.getByRole('combobox')
      await user.selectOptions(select, '50')

      expect(onItemsPerPageChange).toHaveBeenCalledWith(50)
    })
  })

  describe('Actions', () => {
    it('renders action dropdown', () => {
      const handleUpdate = jest.fn()
      const configWithActions: TableConfig = {
        ...basicConfig,
        actions: [
          { label: 'Update', onClick: handleUpdate },
          { label: 'Delete', onClick: jest.fn() },
        ],
      }

      render(<Table config={configWithActions} data={mockData} />)
      const actionButtons = screen.getAllByLabelText('Actions')
      expect(actionButtons).toHaveLength(3)
    })

    it('handles action click', async () => {
      const handleUpdate = jest.fn()
      const user = userEvent.setup()
      const configWithActions: TableConfig = {
        ...basicConfig,
        actions: [{ label: 'Update', onClick: handleUpdate }],
      }

      render(<Table config={configWithActions} data={mockData} />)
      
      const actionButtons = screen.getAllByLabelText('Actions')
      await user.click(actionButtons[0])

      const updateButton = screen.getByText('Update')
      await user.click(updateButton)

      expect(handleUpdate).toHaveBeenCalledWith(mockData[0])
    })
  })

  describe('Custom render', () => {
    it('uses custom render function', () => {
      const configWithRender: TableConfig = {
        columns: [
          { 
            field: 'name', 
            header: 'Name',
            render: (value) => <strong>{value}</strong>
          },
        ],
      }

      render(<Table config={configWithRender} data={mockData} />)
      const strongElement = screen.getByText('John Doe')
      expect(strongElement.tagName).toBe('STRONG')
    })
  })
})

