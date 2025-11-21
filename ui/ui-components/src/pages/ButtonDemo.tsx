import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components'
import { ArrowLeft } from 'lucide-react'

export const ButtonDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Button Component</h1>

        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">States</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">All Combinations</h2>
            <div className="space-y-4">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="space-y-2">
                  <h3 className="text-lg font-medium capitalize">{size}</h3>
                  <div className="flex flex-wrap gap-4">
                    {(['primary', 'secondary', 'outline', 'ghost'] as const).map((variant) => (
                      <Button key={variant} size={size} variant={variant}>
                        {variant}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Interactive Example</h2>
            <Button onClick={() => alert('Button clicked!')}>
              Click Me
            </Button>
          </section>
        </div>
      </div>
    </div>
  )
}

