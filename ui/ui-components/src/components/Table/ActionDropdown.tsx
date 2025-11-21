import React from 'react'
import { MoreVertical } from 'lucide-react'
import { Dropdown, type DropdownItem } from '../Dropdown'
import type { ActionOption } from './types'

export interface ActionDropdownProps {
  actions: ActionOption[]
  row: any
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ actions, row }) => {
  const dropdownItems: DropdownItem[] = actions.map((action, index) => ({
    label: action.label,
    value: index.toString(),
    icon: action.icon,
  }))

  const handleSelect = (value: string) => {
    const index = parseInt(value, 10)
    const action = actions[index]
    if (action) {
      action.onClick(row)
    }
  }

  return (
    <Dropdown
      trigger={
        <div 
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Actions"
          role="button"
        >
          <MoreVertical size={20} className="text-gray-600" />
        </div>
      }
      items={dropdownItems}
      onSelect={handleSelect}
      position="bottom-left"
      usePortal={false}
    />
  )
}
