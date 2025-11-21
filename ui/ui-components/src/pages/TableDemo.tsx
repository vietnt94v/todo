import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, type TableConfig } from '@/components';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  age: number;
}

const generateMockData = (count: number): User[] => {
  const roles = ['Admin', 'User', 'Manager', 'Developer'];
  const statuses = ['Active', 'Inactive', 'Pending'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    age: 20 + (i % 40),
  }));
};

export const TableDemo: React.FC = () => {
  const [clientData] = useState<User[]>(generateMockData(50));
  const [serverData, setServerData] = useState<User[]>(generateMockData(10));
  const [serverPage, setServerPage] = useState(1);
  const [serverItemsPerPage, setServerItemsPerPage] = useState(25);
  const [serverTotal] = useState(100);

  const handleEdit = (row: User) => {
    alert(`Edit user: ${row.name}`);
  };

  const handleDelete = (row: User) => {
    if (confirm(`Delete user: ${row.name}?`)) {
      alert(`Deleted user: ${row.name}`);
    }
  };

  const clientConfig: TableConfig<User> = {
    mode: 'client',
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
      {
        field: 'status',
        header: 'Status',
        render: (value) => (
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              value === 'Active'
                ? 'bg-green-100 text-green-800'
                : value === 'Inactive'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {value}
          </span>
        ),
      },
      { field: 'age', header: 'Age' },
    ],
    actions: [
      { label: 'Edit', onClick: handleEdit, icon: <Edit size={16} /> },
      { label: 'Delete', onClick: handleDelete, icon: <Trash2 size={16} /> },
    ],
    searchConfig: {
      enabled: true,
      placeholder: 'Search users...',
    },
    pagination: {
      defaultItemsPerPage: 10,
      itemsPerPageOptions: [10, 25, 50],
    },
  };

  const serverConfig: TableConfig<User> = {
    mode: 'server',
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
    ],
    actions: [{ label: 'View', onClick: (row) => alert(`View: ${row.name}`) }],
    searchConfig: {
      enabled: true,
      placeholder: 'Search (server-side)...',
    },
    serverSideCallbacks: {
      onPageChange: (page) => {
        setServerPage(page);
        setServerData(generateMockData(10));
      },
      onItemsPerPageChange: (itemsPerPage) => {
        setServerItemsPerPage(itemsPerPage);
        setServerPage(1);
        setServerData(generateMockData(10));
      },
      onSearch: (term) => {
        console.log('Server search:', term);
        setServerData(generateMockData(10));
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Table Component
        </h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Client-Side Table</h2>
            <p className="text-gray-600 mb-4">
              All data is loaded at once. Pagination, search, and filtering
              happen on the client.
            </p>
            <Table
              title="Users (Client-Side)"
              config={clientConfig}
              data={clientData}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Server-Side Table</h2>
            <p className="text-gray-600 mb-4">
              Data is fetched from server based on pagination and search
              parameters.
            </p>
            <Table
              title="Users (Server-Side)"
              config={serverConfig}
              data={serverData}
              totalItems={serverTotal}
              currentPage={serverPage}
              itemsPerPage={serverItemsPerPage}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Simple Table (No Actions)
            </h2>
            <Table
              title="Simple User List"
              config={{
                columns: [
                  { field: 'name', header: 'Name' },
                  { field: 'email', header: 'Email' },
                  { field: 'role', header: 'Role' },
                ],
              }}
              data={clientData.slice(0, 5)}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Loading State</h2>
            <Table
              title="Loading Example"
              config={clientConfig}
              data={[]}
              loading
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Empty State</h2>
            <Table title="Empty Table" config={clientConfig} data={[]} />
          </section>
        </div>
      </div>
    </div>
  );
};
