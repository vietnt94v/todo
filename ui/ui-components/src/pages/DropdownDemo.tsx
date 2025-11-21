import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, type DropdownItem, Button } from '@/components'

export const DropdownDemo: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<string>('')

  const actionItems: DropdownItem[] = [
    { label: 'Edit', value: 'edit', icon: '✏️' },
    { label: 'Duplicate', value: 'duplicate', icon: '📋' },
    { label: 'Archive', value: 'archive', icon: '📦' },
    { label: '', value: '', divider: true },
    { label: 'Delete', value: 'delete', icon: '🗑️' },
  ]

  const userItems: DropdownItem[] = [
    { label: 'Profile', value: 'profile', icon: '👤' },
    { label: 'Settings', value: 'settings', icon: '⚙️' },
    { label: 'Billing', value: 'billing', icon: '💳' },
    { label: '', value: '', divider: true },
    { label: 'Help & Support', value: 'help', icon: '❓' },
    { label: '', value: '', divider: true },
    { label: 'Logout', value: 'logout', icon: '🚪' },
  ]

  const statusItems: DropdownItem[] = [
    { label: 'Active', value: 'active', icon: '🟢' },
    { label: 'Away', value: 'away', icon: '🟡' },
    { label: 'Do Not Disturb', value: 'dnd', icon: '🔴' },
    { label: 'Offline', value: 'offline', icon: '⚫' },
  ]

  const disabledItems: DropdownItem[] = [
    { label: 'Available Option', value: 'available' },
    { label: 'Disabled Option', value: 'disabled', disabled: true },
    { label: 'Another Available', value: 'available2' },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dropdown Component Demo</h1>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Dropdown (Auto Position)</h2>
          <p className="text-sm text-gray-600 mb-4">
            The dropdown automatically adjusts its position based on available space in the viewport.
          </p>
          <div className="flex gap-4 items-center">
            <Dropdown
              trigger={<Button>Actions (Auto)</Button>}
              items={actionItems}
              onSelect={(value) => setSelectedAction(value)}
              position="auto"
            />
            {selectedAction && (
              <span className="text-gray-600">Selected: <strong>{selectedAction}</strong></span>
            )}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Fixed Dropdown Positions</h2>
          <p className="text-sm text-gray-600 mb-4">
            You can also specify a fixed position if needed.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dropdown
              trigger={<Button variant="secondary">Bottom Left</Button>}
              items={statusItems}
              onSelect={(value) => console.log(value)}
              position="bottom-left"
            />
            <Dropdown
              trigger={<Button variant="secondary">Bottom Right</Button>}
              items={statusItems}
              onSelect={(value) => console.log(value)}
              position="bottom-right"
            />
            <Dropdown
              trigger={<Button variant="secondary">Top Left</Button>}
              items={statusItems}
              onSelect={(value) => console.log(value)}
              position="top-left"
            />
            <Dropdown
              trigger={<Button variant="secondary">Top Right</Button>}
              items={statusItems}
              onSelect={(value) => console.log(value)}
              position="top-right"
            />
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">User Menu Example</h2>
          <div className="flex gap-4 items-center">
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <span className="font-medium">John Doe</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              }
              items={userItems}
              onSelect={(value) => setSelectedUser(value)}
              position="bottom-right"
            />
            {selectedUser && (
              <span className="text-gray-600">Selected: <strong>{selectedUser}</strong></span>
            )}
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Dropdown with Icons</h2>
          <Dropdown
            trigger={<Button variant="outline">Status: Online 🟢</Button>}
            items={statusItems}
            onSelect={(value) => console.log('Status changed to:', value)}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Disabled States</h2>
          <div className="flex gap-4">
            <Dropdown
              trigger={<Button variant="outline">With Disabled Items</Button>}
              items={disabledItems}
              onSelect={(value) => console.log('Selected:', value)}
            />
            <Dropdown
              trigger={<Button variant="outline" disabled>Disabled Dropdown</Button>}
              items={actionItems}
              onSelect={(value) => console.log(value)}
              disabled
            />
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Custom Trigger</h2>
          <Dropdown
            trigger={
              <div className="inline-flex items-center gap-2 px-4 py-2 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">Quick Actions</span>
              </div>
            }
            items={actionItems}
            onSelect={(value) => console.log('Quick action:', value)}
          />
        </section>
      </div>
    </div>
  )
}

