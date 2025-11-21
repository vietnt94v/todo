import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from '@/components'

export const ModalDemo: React.FC = () => {
  const [isBasicOpen, setIsBasicOpen] = useState(false)
  const [isWithFooterOpen, setIsWithFooterOpen] = useState(false)
  const [isSmallOpen, setIsSmallOpen] = useState(false)
  const [isLargeOpen, setIsLargeOpen] = useState(false)
  const [isNoCloseOpen, setIsNoCloseOpen] = useState(false)

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Modal Component Demo</h1>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Modal</h2>
          <Button onClick={() => setIsBasicOpen(true)}>Open Basic Modal</Button>
          
          <Modal
            isOpen={isBasicOpen}
            onClose={() => setIsBasicOpen(false)}
            title="Basic Modal"
          >
            <p className="text-gray-600">
              This is a basic modal with a title and close button. You can close it by:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
              <li>Clicking the X button</li>
              <li>Pressing the Escape key</li>
              <li>Clicking outside the modal</li>
            </ul>
          </Modal>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Modal with Footer</h2>
          <Button onClick={() => setIsWithFooterOpen(true)}>Open Modal with Footer</Button>
          
          <Modal
            isOpen={isWithFooterOpen}
            onClose={() => setIsWithFooterOpen(false)}
            title="Confirm Action"
            footer={
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsWithFooterOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsWithFooterOpen(false)}>
                  Confirm
                </Button>
              </div>
            }
          >
            <p className="text-gray-600">
              Are you sure you want to proceed with this action? This modal includes a footer
              with action buttons.
            </p>
          </Modal>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Different Sizes</h2>
          <div className="flex gap-3">
            <Button onClick={() => setIsSmallOpen(true)} size="sm">
              Small Modal
            </Button>
            <Button onClick={() => setIsBasicOpen(true)}>
              Medium Modal (Default)
            </Button>
            <Button onClick={() => setIsLargeOpen(true)} size="lg">
              Large Modal
            </Button>
          </div>
          
          <Modal
            isOpen={isSmallOpen}
            onClose={() => setIsSmallOpen(false)}
            title="Small Modal"
            size="sm"
          >
            <p className="text-gray-600">This is a small modal with limited width.</p>
          </Modal>
          
          <Modal
            isOpen={isLargeOpen}
            onClose={() => setIsLargeOpen(false)}
            title="Large Modal"
            size="xl"
          >
            <div className="text-gray-600">
              <p className="mb-4">This is a large modal with more content space.</p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
            </div>
          </Modal>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Custom Behavior</h2>
          <Button onClick={() => setIsNoCloseOpen(true)} variant="secondary">
            Modal Without Overlay Close
          </Button>
          
          <Modal
            isOpen={isNoCloseOpen}
            onClose={() => setIsNoCloseOpen(false)}
            title="Important Notice"
            closeOnOverlayClick={false}
          >
            <p className="text-gray-600 mb-4">
              This modal cannot be closed by clicking outside. You must use the close button or
              press Escape.
            </p>
            <Button onClick={() => setIsNoCloseOpen(false)}>Close Modal</Button>
          </Modal>
        </section>
      </div>
    </div>
  )
}

