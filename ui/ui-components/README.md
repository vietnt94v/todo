# UI Components Library

A modern, reusable UI component library built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Built with Tailwind CSS v4.1+
- 📦 Tree-shakeable ES modules
- 🔷 Full TypeScript support
- ✅ Comprehensive test coverage with Jest
- 🎯 Accessible components
- 📱 Responsive design

## Components

### Button

A versatile button component with multiple sizes and variants.

**Sizes:** `sm`, `md`, `lg`  
**Variants:** `primary`, `secondary`, `outline`, `ghost`

```tsx
import { Button } from 'ui-components';

<Button size="md" variant="primary">
  Click me
</Button>;
```

### Input

A flexible input component with validation support.

**Sizes:** `sm`, `md`, `lg` (matching button heights)  
**Types:** `text`, `password`, `email`, `number`

```tsx
import { Input } from 'ui-components';

<Input label="Username" error={hasError} errorMessage="Username is required" />;
```

### Table

An advanced table component with pagination, search, and actions.

**Modes:** Client-side and Server-side pagination/filtering

```tsx
import { Table, TableConfig } from 'ui-components'

const config: TableConfig = {
  mode: 'client',
  columns: [
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
  ],
  actions: [
    { label: 'Edit', onClick: (row) => console.log(row) }
  ],
  searchConfig: { enabled: true },
  pagination: { defaultItemsPerPage: 25 }
}

<Table title="Users" config={config} data={users} />
```

## Installation

```bash
pnpm add ui-components
```

## Development

```bash
# Install dependencies
pnpm install

# Run dev server (demo app)
pnpm dev

# Build library
pnpm build:lib

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

## Usage in Other Projects

After building the library, you can use it in other projects:

```tsx
import { Button, Input, Table } from 'ui-components';
import 'ui-components/styles.css';
```

## License

MIT
