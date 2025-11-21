import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const components = [
    {
      name: 'Button',
      path: '/button',
      description: 'Button component with multiple sizes and variants',
    },
    {
      name: 'Input',
      path: '/input',
      description: 'Input component with validation and error states',
    },
    {
      name: 'Table',
      path: '/table',
      description: 'Advanced table with pagination, search, and actions',
    },
    {
      name: 'Modal',
      path: '/modal',
      description: 'Modal dialog with customizable sizes and behaviors',
    },
    {
      name: 'Drawer',
      path: '/drawer',
      description: 'Slide-out drawer from any side of the screen',
    },
    {
      name: 'Dropdown',
      path: '/dropdown',
      description: 'Dropdown menu with icons and custom triggers',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UI Components Library
          </h1>
          <p className="text-lg text-gray-600">
            A collection of reusable React components built with Tailwind CSS
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {components.map((component) => (
            <Link
              key={component.path}
              to={component.path}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {component.name}
              </h2>
              <p className="text-gray-600">{component.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
