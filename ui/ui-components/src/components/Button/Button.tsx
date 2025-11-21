import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm h-8',
  md: 'px-4 py-2 text-base h-10',
  lg: 'px-6 py-3 text-lg h-12',
};

const variantClasses = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300',
  secondary:
    'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-300',
  outline:
    'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-blue-300 disabled:text-blue-300',
  ghost:
    'text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:text-blue-300',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      className = '',
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed';

    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
