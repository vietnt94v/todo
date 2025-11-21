import React from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  label?: string
  errorMessage?: string
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm h-8',
  md: 'px-4 py-2 text-base h-10',
  lg: 'px-6 py-3 text-lg h-12',
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', error = false, label, errorMessage, className = '', disabled, ...props }, ref) => {
    const baseClasses = 'w-full rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-gray-100'
    
    const stateClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    
    const classes = `${baseClasses} ${sizeClasses[size]} ${stateClasses} ${className}`

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={classes}
          disabled={disabled}
          {...props}
        />
        {error && errorMessage && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

