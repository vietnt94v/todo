import React, { useState, useRef, useEffect } from 'react'

export interface DropdownItem {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
  divider?: boolean
}

export interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  onSelect: (value: string) => void
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'auto'
  className?: string
  disabled?: boolean
}

const positionClasses = {
  'bottom-left': 'top-full left-0 mt-2',
  'bottom-right': 'top-full right-0 mt-2',
  'top-left': 'bottom-full left-0 mb-2',
  'top-right': 'bottom-full right-0 mb-2',
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  position = 'auto',
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [calculatedPosition, setCalculatedPosition] = useState<'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'>('bottom-left')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && position === 'auto' && dropdownRef.current && menuRef.current) {
      const triggerRect = dropdownRef.current.getBoundingClientRect()
      const menuRect = menuRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

      const spaceBelow = viewportHeight - triggerRect.bottom
      const spaceAbove = triggerRect.top
      const spaceRight = viewportWidth - triggerRect.left
      const spaceLeft = triggerRect.right

      let vertical: 'top' | 'bottom' = 'bottom'
      let horizontal: 'left' | 'right' = 'left'

      if (spaceBelow < menuRect.height && spaceAbove > spaceBelow) {
        vertical = 'top'
      }

      if (spaceRight < menuRect.width && spaceLeft > spaceRight) {
        horizontal = 'right'
      }

      setCalculatedPosition(`${vertical}-${horizontal}` as 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right')
    }
  }, [isOpen, position])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleSelect = (item: DropdownItem) => {
    if (!item.disabled && !item.divider) {
      onSelect(item.value)
      setIsOpen(false)
    }
  }

  const finalPosition = position === 'auto' ? calculatedPosition : position

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <div
        onClick={handleToggle}
        className={`cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {trigger}
      </div>

      {isOpen && !disabled && (
        <div
          ref={menuRef}
          className={`absolute z-50 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg py-1 ${positionClasses[finalPosition]}`}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return <div key={`divider-${index}`} className="h-px bg-gray-200 my-1" />
            }

            return (
              <button
                key={item.value}
                onClick={() => handleSelect(item)}
                disabled={item.disabled}
                className={`w-full flex items-center px-4 py-2 text-left text-sm transition-colors duration-150 ${
                  item.disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {item.icon && <span className="mr-3 flex-shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

Dropdown.displayName = 'Dropdown'

