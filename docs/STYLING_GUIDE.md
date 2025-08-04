# SmartSlate Styling Guide

## 🎨 Design System Overview

This guide documents the SmartSlate design system and provides guidelines for maintaining visual consistency across the application.

## 📐 Design Principles

1. **Glassmorphism**: Use subtle transparency and backdrop blur for depth
2. **Consistent Spacing**: Follow the spacing scale for all components
3. **Smooth Animations**: Use easing functions for natural motion
4. **Accessibility First**: Ensure proper contrast and focus states

## 🎨 Color Palette

### Brand Colors
```css
--primary-accent: #a7dadb;          /* Main brand color - Cyan */
--primary-accent-light: #d0edf0;    /* Light variant */
--primary-accent-dark: #7bc5c7;     /* Dark variant */

--secondary-accent: #4F46E5;        /* Action color - Purple */
--secondary-accent-light: #7C69F5;  /* Light variant */
--secondary-accent-dark: #3730A3;   /* Dark variant */
```

### Background Colors
```css
--background-dark: #020C1B;         /* Main background */
--background-paper: #0d1b2a;        /* Elevated surfaces */
--background-surface: #142433;      /* Card backgrounds */
```

### Text Colors
```css
--text-primary: #e0e0e0;           /* Primary text */
--text-secondary: #b0c5c6;         /* Secondary text */
--text-disabled: #7a8a8b;          /* Disabled text */
```

## 📏 Spacing System

Use consistent spacing throughout the application:

```css
--space-xs: 4px;    /* Tight spacing */
--space-sm: 8px;    /* Small elements */
--space-md: 16px;   /* Default spacing */
--space-lg: 24px;   /* Section spacing */
--space-xl: 32px;   /* Large spacing */
--space-xxl: 64px;  /* Hero sections */
```

## 🎭 Typography

### Font Families
- **Headings**: Quicksand (700 weight)
- **Body**: Lato (400, 500, 700 weights)

### Font Sizes
- **Hero Title**: 2.5rem (mobile) → 4rem (desktop)
- **Section Title**: 2rem (mobile) → 3rem (desktop)
- **Body Text**: 1.125rem with 1.8 line-height
- **Small Text**: 0.875rem

## 🌟 Component Patterns

### Glass Effect
```css
.glass-effect {
  background-color: var(--glass-bg);
  backdrop-filter: var(--blur-md);
  -webkit-backdrop-filter: var(--blur-md);
  border: 1px solid var(--glass-border);
}
```

### Primary Button
```css
.primary-button {
  background-color: var(--secondary-accent);
  color: #ffffff;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.primary-button:hover {
  background-color: var(--secondary-accent-dark);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
}
```

### Card Component
```css
.card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(167, 218, 219, 0.2);
}
```

## 🎬 Animations

### Standard Easing Functions
```css
--transition-fast: all 0.2s ease-in-out;
--transition-medium: all 0.3s ease-in-out;
--transition-slow: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
```

### Common Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scaleIn {
  from { 
    transform: scale(0.9);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}
```

## 📱 Responsive Design

### Breakpoints
- **xs**: 0-599px
- **sm**: 600-959px
- **md**: 960-1279px
- **lg**: 1280-1919px
- **xl**: 1920px+

### Mobile-First Approach
```css
/* Mobile styles (default) */
.component {
  padding: 16px;
  font-size: 1rem;
}

/* Tablet and up */
@media (min-width: 600px) {
  .component {
    padding: 24px;
    font-size: 1.125rem;
  }
}

/* Desktop and up */
@media (min-width: 1280px) {
  .component {
    padding: 32px;
    font-size: 1.25rem;
  }
}
```

## ♿ Accessibility Guidelines

1. **Focus States**: All interactive elements must have visible focus indicators
2. **Color Contrast**: Maintain WCAG AA compliance (4.5:1 for normal text)
3. **ARIA Labels**: Use descriptive labels for screen readers
4. **Keyboard Navigation**: Ensure all features are keyboard accessible

## 🛠️ Utility Classes

### Text Utilities
```css
.text-gradient {
  background: linear-gradient(135deg, var(--primary-accent), var(--secondary-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.accent {
  color: var(--primary-accent);
  font-weight: 700;
}
```

### Effect Utilities
```css
.glow-effect {
  box-shadow: 0 0 30px rgba(167, 218, 219, 0.2);
}

.glass-effect-strong {
  background-color: var(--container-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
}
```

## 🎯 Best Practices

1. **Consistency**: Always use design tokens instead of hardcoded values
2. **Performance**: Use `will-change` sparingly and remove after animations
3. **Semantic HTML**: Use appropriate HTML elements for better accessibility
4. **Progressive Enhancement**: Ensure the site works without JavaScript
5. **Testing**: Test on multiple devices and screen sizes

## 📦 Component Architecture

### Styled Components Pattern
```typescript
const StyledComponent = styled(Box)(({ theme }) => ({
  // Base styles
  padding: theme.spacing(2),
  
  // Responsive styles
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
  
  // Interactive states
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  
  // Child elements
  '& .child-element': {
    color: theme.palette.primary.main,
  },
}));
```

### Theme Extension
When adding new design tokens, update both the CSS variables and Material-UI theme:

```typescript
// In theme configuration
createTheme({
  palette: {
    primary: {
      main: '#a7dadb',
    },
  },
  spacing: 8, // Base spacing unit
});
```

## 🔄 Migration Guide

When updating existing components:

1. Replace hardcoded colors with CSS variables
2. Use spacing tokens instead of arbitrary values
3. Apply glass effects where appropriate
4. Ensure responsive behavior follows the system
5. Add proper transitions and hover states

---

This guide is a living document. Please update it when adding new patterns or modifying the design system.