import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components';
import { ArrowLeft } from 'lucide-react';

export const InputDemo: React.FC = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    setError(val.length > 0 && val.length < 3);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Input Component
        </h1>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="space-y-4 max-w-md">
              <Input size="sm" placeholder="Small input" />
              <Input size="md" placeholder="Medium input" />
              <Input size="lg" placeholder="Large input" />
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">With Labels</h2>
            <div className="space-y-4 max-w-md">
              <Input label="Username" placeholder="Enter username" />
              <Input label="Email" type="email" placeholder="Enter email" />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
              />
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Input Types</h2>
            <div className="space-y-4 max-w-md">
              <Input label="Text" type="text" placeholder="Text input" />
              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
              />
              <Input label="Password" type="password" placeholder="Password" />
              <Input label="Number" type="number" placeholder="123" />
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">States</h2>
            <div className="space-y-4 max-w-md">
              <Input label="Normal" placeholder="Normal state" />
              <Input label="Disabled" placeholder="Disabled state" disabled />
              <Input
                label="Error"
                placeholder="Error state"
                error
                errorMessage="This field has an error"
              />
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              Interactive Validation
            </h2>
            <div className="max-w-md">
              <Input
                label="Username (min 3 characters)"
                value={value}
                onChange={handleValidation}
                error={error}
                errorMessage={
                  error ? 'Username must be at least 3 characters' : undefined
                }
                placeholder="Type at least 3 characters"
              />
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              All Sizes with Labels
            </h2>
            <div className="space-y-4 max-w-md">
              <Input
                size="sm"
                label="Small"
                placeholder="Small input with label"
              />
              <Input
                size="md"
                label="Medium"
                placeholder="Medium input with label"
              />
              <Input
                size="lg"
                label="Large"
                placeholder="Large input with label"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
