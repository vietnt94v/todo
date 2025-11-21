import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button } from '@/components';

export const DrawerDemo: React.FC = () => {
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isTopOpen, setIsTopOpen] = useState(false);
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [isWithFooterOpen, setIsWithFooterOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Drawer Component Demo
      </h1>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Drawer Positions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button onClick={() => setIsLeftOpen(true)}>Left Drawer</Button>
            <Button onClick={() => setIsRightOpen(true)}>Right Drawer</Button>
            <Button onClick={() => setIsTopOpen(true)}>Top Drawer</Button>
            <Button onClick={() => setIsBottomOpen(true)}>Bottom Drawer</Button>
          </div>

          <Drawer
            isOpen={isLeftOpen}
            onClose={() => setIsLeftOpen(false)}
            title="Left Drawer"
            position="left"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                This drawer slides in from the left side.
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded">Menu Item 1</div>
                <div className="p-3 bg-blue-50 rounded">Menu Item 2</div>
                <div className="p-3 bg-blue-50 rounded">Menu Item 3</div>
              </div>
            </div>
          </Drawer>

          <Drawer
            isOpen={isRightOpen}
            onClose={() => setIsRightOpen(false)}
            title="Right Drawer"
            position="right"
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                This drawer slides in from the right side.
              </p>
              <div className="space-y-2">
                <div className="p-3 bg-green-50 rounded">Setting 1</div>
                <div className="p-3 bg-green-50 rounded">Setting 2</div>
                <div className="p-3 bg-green-50 rounded">Setting 3</div>
              </div>
            </div>
          </Drawer>

          <Drawer
            isOpen={isTopOpen}
            onClose={() => setIsTopOpen(false)}
            title="Top Drawer"
            position="top"
          >
            <p className="text-gray-600">This drawer slides in from the top.</p>
          </Drawer>

          <Drawer
            isOpen={isBottomOpen}
            onClose={() => setIsBottomOpen(false)}
            title="Bottom Drawer"
            position="bottom"
          >
            <p className="text-gray-600">
              This drawer slides in from the bottom.
            </p>
          </Drawer>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Drawer with Footer
          </h2>
          <Button onClick={() => setIsWithFooterOpen(true)} variant="secondary">
            Open Drawer with Footer
          </Button>

          <Drawer
            isOpen={isWithFooterOpen}
            onClose={() => setIsWithFooterOpen(false)}
            title="User Profile"
            footer={
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setIsWithFooterOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsWithFooterOpen(false)}>
                  Save Changes
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>
          </Drawer>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Different Sizes
          </h2>
          <div className="flex gap-3">
            <Button onClick={() => setIsRightOpen(true)} size="sm">
              Small (Default)
            </Button>
            <Button onClick={() => setIsLargeOpen(true)}>Large Drawer</Button>
          </div>

          <Drawer
            isOpen={isLargeOpen}
            onClose={() => setIsLargeOpen(false)}
            title="Large Drawer"
            size="lg"
          >
            <div className="space-y-4 text-gray-600">
              <p>This is a large drawer with more width for content.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded">Column 1</div>
                <div className="p-4 bg-gray-50 rounded">Column 2</div>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Drawer>
        </section>
      </div>
    </div>
  );
};
