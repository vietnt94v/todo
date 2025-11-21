# UI Components Documentation

## Modal Component

A flexible modal dialog component with customizable sizes and behaviors.

### Features
- Multiple sizes: sm, md, lg, xl
- Close on overlay click (configurable)
- Close on Escape key press
- Optional header with title and close button
- Optional footer for actions
- Smooth animations
- Body scroll lock when open

### Usage

```tsx
import { Modal } from './components/Modal'

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
  showCloseButton={true}
  closeOnOverlayClick={true}
  footer={<div>Footer content</div>}
>
  <p>Modal content goes here</p>
</Modal>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | required | Controls modal visibility |
| onClose | () => void | required | Callback when modal closes |
| title | string | optional | Modal title |
| children | ReactNode | required | Modal content |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Modal width |
| showCloseButton | boolean | true | Show close button in header |
| closeOnOverlayClick | boolean | true | Close when clicking overlay |
| footer | ReactNode | optional | Footer content |

---

## Drawer Component

A slide-out drawer component that can appear from any side of the screen.

### Features
- Four positions: left, right, top, bottom
- Multiple sizes: sm, md, lg
- Close on overlay click (configurable)
- Close on Escape key press
- Optional header with title and close button
- Optional footer for actions
- Smooth slide animations
- Body scroll lock when open

### Usage

```tsx
import { Drawer } from './components/Drawer'

<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Drawer Title"
  position="right"
  size="md"
  showCloseButton={true}
  closeOnOverlayClick={true}
  footer={<div>Footer content</div>}
>
  <p>Drawer content goes here</p>
</Drawer>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isOpen | boolean | required | Controls drawer visibility |
| onClose | () => void | required | Callback when drawer closes |
| title | string | optional | Drawer title |
| children | ReactNode | required | Drawer content |
| position | 'left' \| 'right' \| 'top' \| 'bottom' | 'right' | Drawer position |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Drawer size |
| showCloseButton | boolean | true | Show close button in header |
| closeOnOverlayClick | boolean | true | Close when clicking overlay |
| footer | ReactNode | optional | Footer content |

---

## Dropdown Component

A dropdown menu component with support for icons, dividers, and disabled items.

### Features
- Custom trigger element
- **Auto-positioning**: Automatically adjusts position based on viewport space
- Four fixed positions: bottom-left, bottom-right, top-left, top-right
- Support for icons
- Dividers between items
- Disabled items
- Click outside to close
- Escape key to close
- Smooth animations

### Usage

```tsx
import { Dropdown, DropdownItem } from './components/Dropdown'

const items: DropdownItem[] = [
  { label: 'Edit', value: 'edit', icon: '✏️' },
  { label: 'Delete', value: 'delete', icon: '🗑️' },
  { label: '', value: '', divider: true },
  { label: 'Disabled', value: 'disabled', disabled: true },
]

<Dropdown
  trigger={<button>Actions</button>}
  items={items}
  onSelect={(value) => console.log(value)}
  position="bottom-left"
  disabled={false}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | ReactNode | required | Element that triggers dropdown |
| items | DropdownItem[] | required | Array of dropdown items |
| onSelect | (value: string) => void | required | Callback when item selected |
| position | 'auto' \| 'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right' | 'auto' | Dropdown position. 'auto' intelligently positions based on viewport space |
| className | string | '' | Additional CSS classes |
| disabled | boolean | false | Disable dropdown |

### DropdownItem Interface

| Property | Type | Description |
|----------|------|-------------|
| label | string | Item label text |
| value | string | Item value |
| icon | ReactNode | Optional icon |
| disabled | boolean | Disable this item |
| divider | boolean | Render as divider |

---

## Demo Pages

Visit these routes to see the components in action:

- `/modal` - Modal component demos
- `/drawer` - Drawer component demos
- `/dropdown` - Dropdown component demos

## Styling

All components use Tailwind CSS for styling and follow a consistent design system:

- Primary color: Blue (blue-500, blue-600, etc.)
- Gray scale for neutral elements
- Consistent spacing and sizing
- Smooth transitions and animations
- Focus states for accessibility

