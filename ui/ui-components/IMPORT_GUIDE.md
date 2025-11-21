# Import Guide / Hướng dẫn Import

## Overview / Tổng quan

This project uses path aliases with `@` for cleaner and more maintainable imports.

Dự án này sử dụng path aliases với `@` để có imports sạch hơn và dễ bảo trì hơn.

---

## Path Aliases / Đường dẫn rút gọn

### Available Aliases / Aliases có sẵn

```typescript
@/*           → src/*
@/components  → src/components
@/pages       → src/pages
@/routes      → src/routes
```

---

## Import Patterns / Mẫu Import

### ✅ Recommended / Khuyến nghị

#### 1. Import Components / Import các component

```typescript
// ✅ Good - Import from @/components
import { Button, Modal, Dropdown } from '@/components'

// ✅ Good - Import with types
import { Button, type ButtonProps } from '@/components'

// ✅ Good - Multiple components
import { 
  Table, 
  Modal, 
  Drawer, 
  type TableConfig 
} from '@/components'
```

#### 2. Import Pages / Import các trang

```typescript
// ✅ Good - Import from @/pages
import { Home, ButtonDemo } from '@/pages'
```

#### 3. Import Routes / Import routes

```typescript
// ✅ Good - Import from @/routes
import { routes } from '@/routes'
```

#### 4. Import from src / Import từ src

```typescript
// ✅ Good - Any file in src
import { someUtil } from '@/utils/helper'
import { API_URL } from '@/constants'
```

---

### ❌ Not Recommended / Không khuyến nghị

```typescript
// ❌ Bad - Relative paths
import { Button } from '../components/Button'
import { Modal } from '../../components/Modal/Modal'

// ❌ Bad - Direct component file import
import { Button } from '@/components/Button/Button'

// ❌ Bad - Mixed styles
import { Button } from '@/components'
import { Modal } from '../components/Modal'
```

---

## Component Export Organization / Tổ chức Export Component

The `@/components` index is organized by category:

Index `@/components` được tổ chức theo danh mục:

### 1. Basic Form Components / Components Form cơ bản
```typescript
import { Button, Input } from '@/components'
```

### 2. Table Components / Components Table
```typescript
import { 
  Table,
  TableTitle,
  TableSearch,
  TableFilter,
  TableBody,
  TablePagination,
  ActionDropdown,
  type TableConfig
} from '@/components'
```

### 3. Overlay Components / Components Overlay
```typescript
import { Modal, Drawer, Dropdown } from '@/components'
```

### 4. Utility Components / Components Tiện ích
```typescript
import { Portal } from '@/components'
```

---

## Examples by Use Case / Ví dụ theo trường hợp sử dụng

### Creating a New Page / Tạo trang mới

```typescript
// src/pages/NewPage.tsx
import React from 'react'
import { Button, Modal, Input } from '@/components'

export const NewPage: React.FC = () => {
  return (
    <div>
      <Button>Click me</Button>
      <Input placeholder="Enter text" />
    </div>
  )
}
```

### Creating a New Component / Tạo component mới

```typescript
// src/components/Card/Card.tsx
import React from 'react'
import { Button } from '@/components'

export interface CardProps {
  title: string
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
      <Button>Action</Button>
    </div>
  )
}
```

### Using in Routes / Sử dụng trong Routes

```typescript
// src/routes/routes.tsx
import type { RouteObject } from 'react-router-dom'
import { Home, ButtonDemo, NewPage } from '@/pages'

export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/button', element: <ButtonDemo /> },
  { path: '/new', element: <NewPage /> }
]
```

### Using in App / Sử dụng trong App

```typescript
// src/App.tsx
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { routes } from '@/routes'

function AppRoutes() {
  return useRoutes(routes)
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}
```

---

## Type Imports / Import Types

Always use `type` keyword for type-only imports:

Luôn sử dụng từ khóa `type` cho type-only imports:

```typescript
// ✅ Good - Type-only import
import { Button, type ButtonProps } from '@/components'
import type { TableConfig } from '@/components'

// ❌ Bad - Mixed import (may cause issues with verbatimModuleSyntax)
import { ButtonProps } from '@/components'
```

---

## Benefits / Lợi ích

### 1. Cleaner Code / Code sạch hơn

**Before / Trước:**
```typescript
import { Button } from '../../../components/Button'
import { Modal } from '../../components/Modal/Modal'
```

**After / Sau:**
```typescript
import { Button, Modal } from '@/components'
```

### 2. Easier Refactoring / Refactor dễ hơn

- Move files without updating imports
- No more `../../../` hell
- Di chuyển files mà không cần cập nhật imports
- Không còn `../../../` phức tạp

### 3. Better IDE Support / Hỗ trợ IDE tốt hơn

- Auto-completion works better
- Go to definition works correctly
- Refactoring tools work better
- Auto-completion hoạt động tốt hơn
- Go to definition hoạt động đúng
- Công cụ refactoring hoạt động tốt hơn

### 4. Consistent Style / Phong cách nhất quán

- All imports look the same
- Easy to read and understand
- Team collaboration is easier
- Tất cả imports giống nhau
- Dễ đọc và hiểu
- Làm việc nhóm dễ hơn

---

## Configuration / Cấu hình

### TypeScript Configuration / Cấu hình TypeScript

**File:** `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components": ["src/components"],
      "@/pages": ["src/pages"],
      "@/routes": ["src/routes"]
    }
  }
}
```

### Vite Configuration / Cấu hình Vite

**File:** `vite.config.ts`

```typescript
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/routes': resolve(__dirname, './src/routes'),
    },
  },
})
```

---

## Adding New Aliases / Thêm Aliases mới

If you need to add a new alias:

Nếu cần thêm alias mới:

### Step 1: Update tsconfig.app.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@/components": ["src/components"],
      "@/pages": ["src/pages"],
      "@/routes": ["src/routes"],
      "@/utils": ["src/utils"]  // ⭐ New alias
    }
  }
}
```

### Step 2: Update vite.config.ts

```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/routes': resolve(__dirname, './src/routes'),
      '@/utils': resolve(__dirname, './src/utils'),  // ⭐ New alias
    },
  },
})
```

### Step 3: Use the new alias

```typescript
import { formatDate } from '@/utils'
```

---

## Troubleshooting / Xử lý sự cố

### Issue: Import not found / Vấn đề: Không tìm thấy import

**Solution / Giải pháp:**

1. Restart TypeScript server in your IDE
2. Clear build cache: `rm -rf node_modules/.vite`
3. Rebuild: `npm run build`

1. Khởi động lại TypeScript server trong IDE
2. Xóa build cache: `rm -rf node_modules/.vite`
3. Build lại: `npm run build`

### Issue: Types not working / Vấn đề: Types không hoạt động

**Solution / Giải pháp:**

Make sure you're using `type` keyword for type imports:

Đảm bảo bạn đang sử dụng từ khóa `type` cho type imports:

```typescript
// ✅ Correct
import { Button, type ButtonProps } from '@/components'

// ❌ Wrong
import { ButtonProps } from '@/components'
```

### Issue: Build fails / Vấn đề: Build thất bại

**Solution / Giải pháp:**

Check that both `tsconfig.app.json` and `vite.config.ts` have the same aliases configured.

Kiểm tra xem cả `tsconfig.app.json` và `vite.config.ts` đều có cùng aliases được cấu hình.

---

## Best Practices / Thực hành tốt nhất

1. ✅ Always use `@/components` for component imports
2. ✅ Use `type` keyword for type-only imports
3. ✅ Group related imports together
4. ✅ Keep imports at the top of the file
5. ✅ Use destructuring for multiple imports
6. ❌ Don't mix relative and alias imports
7. ❌ Don't import from component files directly
8. ❌ Don't create circular dependencies

1. ✅ Luôn dùng `@/components` cho component imports
2. ✅ Dùng từ khóa `type` cho type-only imports
3. ✅ Nhóm các imports liên quan lại
4. ✅ Giữ imports ở đầu file
5. ✅ Dùng destructuring cho nhiều imports
6. ❌ Không trộn lẫn relative và alias imports
7. ❌ Không import trực tiếp từ component files
8. ❌ Không tạo circular dependencies

---

## Migration Checklist / Danh sách kiểm tra Migration

When migrating existing code:

Khi migrate code hiện có:

- [ ] Update all `../components` to `@/components`
- [ ] Update all `../pages` to `@/pages`
- [ ] Update all `../routes` to `@/routes`
- [ ] Add `type` keyword for type imports
- [ ] Test build: `npm run build`
- [ ] Test dev server: `npm run dev`
- [ ] Run tests: `npm test`

---

## Quick Reference / Tham khảo nhanh

| Old Style | New Style |
|-----------|-----------|
| `import { Button } from '../components/Button'` | `import { Button } from '@/components'` |
| `import { Home } from '../pages/Home'` | `import { Home } from '@/pages'` |
| `import { routes } from '../routes'` | `import { routes } from '@/routes'` |
| `import { ButtonProps } from '@/components'` | `import { type ButtonProps } from '@/components'` |

---

## Summary / Tóm tắt

✅ Use `@/components` for all component imports

✅ Use `@/pages` for all page imports

✅ Use `@/routes` for route imports

✅ Use `type` keyword for type-only imports

✅ Keep imports organized and consistent

✅ Sử dụng `@/components` cho tất cả component imports

✅ Sử dụng `@/pages` cho tất cả page imports

✅ Sử dụng `@/routes` cho route imports

✅ Sử dụng từ khóa `type` cho type-only imports

✅ Giữ imports được tổ chức và nhất quán

