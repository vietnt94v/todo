# Tailwind CSS v4 Migration

## Changes Made / Thay đổi đã thực hiện

### 1. CSS Import Syntax

**Old (v3):**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**New (v4):**

```css
@import 'tailwindcss';
```

### 2. PostCSS Plugin

**Installed:**

```bash
pnpm add -D @tailwindcss/postcss
```

**postcss.config.js:**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Not 'tailwindcss'
    autoprefixer: {},
  },
};
```

### 3. Configuration File

- ❌ Removed `tailwind.config.js` (not needed in v4)
- ✅ Tailwind v4 uses CSS-first configuration

### 4. Custom Configuration (if needed)

If you need custom configuration, add it to your CSS:

```css
@import 'tailwindcss';

@theme {
  --color-primary: #3b82f6;
  --font-sans: system-ui, sans-serif;
}
```

## Verification / Xác minh

✅ Dev server runs without errors  
✅ Build completes successfully  
✅ All Tailwind classes work in components  
✅ No PostCSS warnings

## References

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs/v4-beta)
- [PostCSS Plugin](https://tailwindcss.com/docs/v4-beta#using-postcss)
