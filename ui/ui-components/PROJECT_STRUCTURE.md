# Project Structure / Cấu trúc dự án

## Overview / Tổng quan

This document describes the organized structure of the UI Components library.

Tài liệu này mô tả cấu trúc tổ chức của thư viện UI Components.

---

## Directory Structure / Cấu trúc thư mục

```
src/
├── components/           # All reusable UI components
│   ├── index.ts         # Central export for all components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.test.tsx
│   │   └── index.ts
│   ├── Table/
│   │   ├── Table.tsx
│   │   ├── TableBody.tsx
│   │   ├── TableFilter.tsx
│   │   ├── TablePagination.tsx
│   │   ├── TableSearch.tsx
│   │   ├── TableTitle.tsx
│   │   ├── ActionDropdown.tsx
│   │   ├── types.ts
│   │   ├── *.test.tsx
│   │   └── index.ts
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   ├── Modal.test.tsx
│   │   └── index.ts
│   ├── Drawer/
│   │   ├── Drawer.tsx
│   │   ├── Drawer.test.tsx
│   │   └── index.ts
│   ├── Dropdown/
│   │   ├── Dropdown.tsx
│   │   ├── Dropdown.test.tsx
│   │   └── index.ts
│   └── Portal/
│       ├── Portal.tsx
│       ├── Portal.test.tsx
│       └── index.ts
│
├── pages/               # Demo pages for components
│   ├── index.ts        # Central export for all pages
│   ├── Home.tsx
│   ├── ButtonDemo.tsx
│   ├── InputDemo.tsx
│   ├── TableDemo.tsx
│   ├── ModalDemo.tsx
│   ├── DrawerDemo.tsx
│   └── DropdownDemo.tsx
│
├── routes/             # Router configuration
│   ├── index.ts       # Export routes
│   └── routes.tsx     # Route definitions
│
├── App.tsx            # Main app component (clean, uses routes)
├── main.tsx           # Entry point
├── index.ts           # Library exports (for npm package)
├── index.css          # Global styles
└── setupTests.ts      # Test configuration
```

---

## Import/Export Pattern / Mẫu Import/Export

### Components / Các component

Each component folder has its own `index.ts` that exports the component and its types:

Mỗi thư mục component có `index.ts` riêng để export component và types:

```typescript
// components/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

Central export in `components/index.ts`:

Export tập trung trong `components/index.ts`:

```typescript
// components/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'

export { Modal } from './Modal'
export type { ModalProps } from './Modal'
// ... etc
```

### Pages / Các trang

All pages are exported from `pages/index.ts`:

Tất cả pages được export từ `pages/index.ts`:

```typescript
// pages/index.ts
export { Home } from './Home'
export { ButtonDemo } from './ButtonDemo'
// ... etc
```

### Routes / Định tuyến

Routes are defined separately in `routes/routes.tsx`:

Routes được định nghĩa riêng trong `routes/routes.tsx`:

```typescript
// routes/routes.tsx
import type { RouteObject } from 'react-router-dom'
import { Home, ButtonDemo, ... } from '../pages'

export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/button', element: <ButtonDemo /> },
  // ... etc
]
```

---

## Usage Examples / Ví dụ sử dụng

### Importing Components / Import components

```typescript
// ✅ Good - Import from components index
import { Button, Modal, Dropdown } from './components'

// ❌ Bad - Direct import from component file
import { Button } from './components/Button/Button'
```

### Importing Pages / Import pages

```typescript
// ✅ Good - Import from pages index
import { Home, ButtonDemo } from './pages'

// ❌ Bad - Direct import
import { Home } from './pages/Home'
```

### Using Routes / Sử dụng routes

```typescript
// App.tsx
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { routes } from './routes'

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

## Benefits / Lợi ích

### 1. Clean Imports / Import sạch sẽ
- Single source of truth for exports
- Easy to refactor and maintain
- Nguồn duy nhất cho exports
- Dễ refactor và maintain

### 2. Separation of Concerns / Tách biệt trách nhiệm
- Components: Reusable UI elements
- Pages: Demo/application pages
- Routes: Navigation configuration
- Components: Các phần tử UI tái sử dụng
- Pages: Trang demo/ứng dụng
- Routes: Cấu hình điều hướng

### 3. Scalability / Khả năng mở rộng
- Easy to add new components
- Easy to add new routes
- Clear structure for team collaboration
- Dễ thêm component mới
- Dễ thêm route mới
- Cấu trúc rõ ràng cho làm việc nhóm

### 4. Type Safety / An toàn kiểu
- All types exported properly
- TypeScript can track imports
- Tất cả types được export đúng cách
- TypeScript có thể theo dõi imports

---

## Adding New Components / Thêm component mới

### Step 1: Create component folder / Tạo thư mục component

```bash
mkdir src/components/NewComponent
```

### Step 2: Create component files / Tạo files component

```typescript
// src/components/NewComponent/NewComponent.tsx
export interface NewComponentProps {
  // props here
}

export const NewComponent: React.FC<NewComponentProps> = (props) => {
  // implementation
}
```

### Step 3: Create index.ts / Tạo index.ts

```typescript
// src/components/NewComponent/index.ts
export { NewComponent } from './NewComponent'
export type { NewComponentProps } from './NewComponent'
```

### Step 4: Add to components index / Thêm vào components index

```typescript
// src/components/index.ts
export { NewComponent } from './NewComponent'
export type { NewComponentProps } from './NewComponent'
```

### Step 5: Create test file / Tạo file test

```typescript
// src/components/NewComponent/NewComponent.test.tsx
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { NewComponent } from './NewComponent'

describe('NewComponent', () => {
  it('renders correctly', () => {
    // test implementation
  })
})
```

---

## Adding New Routes / Thêm route mới

### Step 1: Create page component / Tạo page component

```typescript
// src/pages/NewPage.tsx
export const NewPage: React.FC = () => {
  return <div>New Page</div>
}
```

### Step 2: Add to pages index / Thêm vào pages index

```typescript
// src/pages/index.ts
export { NewPage } from './NewPage'
```

### Step 3: Add route / Thêm route

```typescript
// src/routes/routes.tsx
import { NewPage } from '../pages'

export const routes: RouteObject[] = [
  // ... existing routes
  {
    path: '/new-page',
    element: <NewPage />
  }
]
```

---

## Removed Files / Files đã xóa

The following unused files have been removed:

Các file không sử dụng sau đã được xóa:

- ❌ `src/App.css` - Unused styles
- ❌ `src/assets/react.svg` - Unused asset
- ❌ `src/assets/` - Empty directory

---

## Testing / Kiểm thử

All components have test files co-located with the component:

Tất cả components có file test cùng vị trí với component:

```bash
# Run all tests
npm test

# Run specific component tests
npm test Button
npm test Modal
```

---

## Library Export / Export thư viện

The main `src/index.ts` exports all components for use as an npm package:

File `src/index.ts` chính export tất cả components để sử dụng như npm package:

```typescript
// src/index.ts
export * from './components'
```

This allows consumers to import like:

Điều này cho phép người dùng import như:

```typescript
import { Button, Modal, Dropdown } from 'ui-components'
```

---

## Best Practices / Thực hành tốt nhất

1. ✅ Always use index.ts for exports / Luôn dùng index.ts cho exports
2. ✅ Keep components in their own folders / Giữ components trong thư mục riêng
3. ✅ Co-locate tests with components / Đặt tests cùng với components
4. ✅ Use type-only imports for types / Dùng type-only imports cho types
5. ✅ Keep routes separate from App.tsx / Giữ routes tách biệt khỏi App.tsx
6. ✅ Export types alongside components / Export types cùng với components
7. ✅ Remove unused files and code / Xóa files và code không dùng

---

## Maintenance / Bảo trì

When refactoring or moving components:

Khi refactor hoặc di chuyển components:

1. Update the component's index.ts
2. Update components/index.ts
3. Update any imports in pages
4. Run tests to ensure nothing breaks
5. Check for unused imports

1. Cập nhật index.ts của component
2. Cập nhật components/index.ts
3. Cập nhật imports trong pages
4. Chạy tests để đảm bảo không lỗi
5. Kiểm tra imports không dùng

