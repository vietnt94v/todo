# UI Components Setup Guide

## ✅ Fixed Issues / Đã sửa lỗi

### Tailwind CSS v4 PostCSS Error

**Problem:** Tailwind CSS v4 requires `@tailwindcss/postcss` instead of using `tailwindcss` directly as a PostCSS plugin.

**Solution:**

```bash
pnpm add -D @tailwindcss/postcss
```

Updated `postcss.config.js`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

## 🚀 Quick Start

### Development (Demo App)

```bash
pnpm dev
```

Opens demo app at `http://localhost:5173/`

### Build Library

```bash
pnpm build:lib
```

Outputs to `dist/` folder

### Run Tests

```bash
pnpm test
```

### Test Coverage

```bash
pnpm test:coverage
```

## 📦 Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.test.tsx
│   │   └── index.ts
│   └── Table/
│       ├── Table.tsx
│       ├── Table.test.tsx
│       ├── TableTitle.tsx
│       ├── TableSearch.tsx
│       ├── TableFilter.tsx
│       ├── TableBody.tsx
│       ├── TablePagination.tsx
│       ├── ActionDropdown.tsx
│       ├── types.ts
│       └── index.ts
├── pages/           # Demo pages
│   ├── Home.tsx
│   ├── ButtonDemo.tsx
│   ├── InputDemo.tsx
│   └── TableDemo.tsx
├── App.tsx          # Demo app router
├── main.tsx         # Demo app entry
├── index.ts         # Library entry point
└── index.css        # Global styles with Tailwind

dist/                # Build output
├── ui-components.es.js
├── ui-components.cjs.js
└── index.d.ts
```

## 🎯 Component Features

### Button

- Sizes: sm (h-8), md (h-10), lg (h-12)
- Variants: primary, secondary, outline, ghost
- States: default, hover, active, disabled

### Input

- Sizes matching Button heights
- Label support
- Error state with message
- All input types supported

### Table

- Client-side pagination/search/filter
- Server-side mode with callbacks
- Configurable actions dropdown
- Custom column rendering
- Items per page: 25, 50, 75, 100

## 📝 Usage in Other Projects

```bash
# Install (when published)
pnpm add ui-components

# Or link locally for development
cd /path/to/ui-components
pnpm link

cd /path/to/your-project
pnpm link ui-components
```

```tsx
import { Button, Input, Table } from 'ui-components'
import type { TableConfig } from 'ui-components'

// Use components
<Button size="md" variant="primary">Click</Button>
<Input label="Email" type="email" />
<Table config={config} data={data} />
```

## 🔧 Technologies

- React 19.2.0
- TypeScript 5.9.3
- Tailwind CSS 4.1.17
- Vite 7.2.4
- Jest 30.2.0
- React Testing Library 16.3.0
- lucide-react 0.554.0

## ✨ All Features Implemented

✅ Tailwind CSS v4.1+ with @tailwindcss/postcss  
✅ SASS support  
✅ Jest testing with comprehensive coverage  
✅ Library build configuration  
✅ TypeScript declarations  
✅ Demo application with routing  
✅ All components with tests  
✅ README documentation
