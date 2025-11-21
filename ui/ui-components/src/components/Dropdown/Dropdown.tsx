import React, { useState, useRef, useEffect } from 'react';
import { Portal } from '../Portal';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'auto';
  className?: string;
  disabled?: boolean;
  usePortal?: boolean;
}

const positionClasses = {
  'bottom-left': 'top-full left-0 mt-2',
  'bottom-right': 'top-full right-0 mt-2',
  'top-left': 'bottom-full left-0 mb-2',
  'top-right': 'bottom-full right-0 mb-2',
};

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  position = 'auto',
  className = '',
  disabled = false,
  usePortal = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calculatedPosition, setCalculatedPosition] = useState<
    'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  >('bottom-left');
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (dropdownRef.current && menuRef.current) {
      const triggerRect = dropdownRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let vertical: 'top' | 'bottom' = 'bottom';
      let horizontal: 'left' | 'right' = 'left';

      // Auto positioning logic
      if (position === 'auto') {
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;
        const spaceRight = viewportWidth - triggerRect.left;
        const spaceLeft = triggerRect.right;

        if (spaceBelow < menuRect.height && spaceAbove > spaceBelow) {
          vertical = 'top';
        }

        if (spaceRight < menuRect.width && spaceLeft > spaceRight) {
          horizontal = 'right';
        }
      } else {
        const [v, h] = position.split('-');
        vertical = v as 'top' | 'bottom';
        horizontal = h as 'left' | 'right';
      }

      const finalPos = `${vertical}-${horizontal}` as const;
      setCalculatedPosition(finalPos);

      if (usePortal) {
        let top = 0;
        let left = 0;

        if (vertical === 'bottom') {
          top = triggerRect.bottom + 8; // +8px for mt-2
        } else {
          top = triggerRect.top - menuRect.height - 8; // -8px for mb-2
        }

        if (horizontal === 'left') {
          left = triggerRect.left;
        } else {
          left = triggerRect.right - menuRect.width;
        }

        setCoords({ top, left });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Use requestAnimationFrame to ensure menu is rendered before calculating position
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [isOpen, position, usePortal]);

  useEffect(() => {
    if (isOpen && usePortal) {
      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      const handleScroll = () => {
        // Debounce scroll updates for better performance
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          updatePosition();
        }, 10); // 10ms debounce for smooth updates
      };

      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleScroll);

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [isOpen, usePortal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If using portal, we need to check if click is inside menu (in portal) or trigger
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (item: DropdownItem) => {
    if (!item.disabled && !item.divider) {
      onSelect(item.value);
      setIsOpen(false);
    }
  };

  const finalPosition = position === 'auto' ? calculatedPosition : position;

  const menuCallbackRef = (node: HTMLDivElement | null) => {
    menuRef.current = node;
    if (node && usePortal) {
      // Update position when menu element is mounted
      // Use double requestAnimationFrame to ensure layout is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updatePosition();
        });
      });
    }
  };

  const menuContent = (
    <div
      ref={menuCallbackRef}
      style={
        usePortal
          ? {
              position: 'fixed',
              top: coords.top,
              left: coords.left,
            }
          : undefined
      }
      className={`${usePortal ? 'fixed z-[9999]' : 'absolute z-50'} min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg py-1 ${
        !usePortal ? positionClasses[finalPosition] : ''
      }`}
    >
      {items.map((item, index) => {
        if (item.divider) {
          return (
            <div key={`divider-${index}`} className="h-px bg-gray-200 my-1" />
          );
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
            {item.icon && (
              <span className="mr-3 flex-shrink-0">{item.icon}</span>
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <div
        onClick={handleToggle}
        className={`cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {trigger}
      </div>

      {isOpen &&
        !disabled &&
        (usePortal ? <Portal>{menuContent}</Portal> : menuContent)}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
