import React, { useEffect } from 'react';
import { Portal } from '@/components';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
}

const positionClasses = {
  left: 'left-0 top-0 h-full',
  right: 'right-0 top-0 h-full',
  top: 'top-0 left-0 w-full',
  bottom: 'bottom-0 left-0 w-full',
};

const sizeClasses = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
  },
  top: {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
  },
  bottom: {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
  },
};

const translateClasses = {
  left: {
    open: 'translate-x-0',
    closed: '-translate-x-full',
  },
  right: {
    open: 'translate-x-0',
    closed: 'translate-x-full',
  },
  top: {
    open: 'translate-y-0',
    closed: '-translate-y-full',
  },
  bottom: {
    open: 'translate-y-0',
    closed: 'translate-y-full',
  },
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleOverlayClick}
      />

      <div
        className={`fixed z-50 bg-white shadow-xl transform transition-transform duration-300 ${
          positionClasses[position]
        } ${sizeClasses[position][size]} ${
          isOpen
            ? translateClasses[position].open
            : translateClasses[position].closed
        }`}
      >
        <div className="flex flex-col h-full">
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label="Close drawer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          <div className="flex-1 px-6 py-4 overflow-y-auto">{children}</div>

          {footer && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              {footer}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

Drawer.displayName = 'Drawer';
