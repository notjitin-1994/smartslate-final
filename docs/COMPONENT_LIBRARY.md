# SmartSlate Component Library

## 📚 Overview

This document catalogs all reusable components in the SmartSlate design system, providing usage examples and implementation guidelines.

## 🧩 Layout Components

### Header
**Location**: `src/components/layout/Header.tsx`

**Description**: Fixed floating header with glassmorphism effect, responsive navigation, and mobile menu.

**Usage**:
```tsx
import Header from '@/components/layout/Header';

// Automatically included in layout.tsx
<Header />
```

**Features**:
- Sticky positioning with blur backdrop
- Mobile-responsive hamburger menu
- Smooth scroll on navigation
- Logo with hover effects

### Footer
**Location**: `src/components/layout/Footer.tsx`

**Description**: Minimal footer with company information and branding.

**Usage**:
```tsx
import Footer from '@/components/layout/Footer';

// Automatically included in layout.tsx
<Footer />
```

## 🎨 UI Components

### Glass Container
**Pattern**: Reusable glass morphism container

```tsx
const GlassContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    boxShadow: '0 10px 30px rgba(167, 218, 219, 0.2)',
  },
}));
```

### Primary Button
**Pattern**: Call-to-action button with hover effects

```tsx
const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
    '&::before': {
      left: '100%',
    },
  },
}));
```

### Secondary Button
**Pattern**: Outlined button for secondary actions

```tsx
const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  border: '2px solid rgba(167, 218, 219, 0.3)',
  backgroundColor: 'transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: 'rgba(167, 218, 219, 0.1)',
    transform: 'translateY(-2px)',
  },
}));
```

### Stats Card
**Pattern**: Interactive statistics display card

```tsx
const StatsCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    boxShadow: '0 10px 30px rgba(167, 218, 219, 0.2)',
  },
}));
```

## 🎬 Animation Components

### Fade In Animation
**Pattern**: Reveal content on scroll or trigger

```tsx
const FadeInContent = styled(Box)<{ delay: number; isVisible: boolean }>(
  ({ theme, delay, isVisible }) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
  })
);

// Usage
<FadeInContent delay={1000} isVisible={isVisible}>
  <Typography>Animated content</Typography>
</FadeInContent>
```

### Animated Word
**Pattern**: Staggered text animation

```tsx
const AnimatedWord = styled('span')<{ delay: number; isVisible: boolean }>(
  ({ theme, delay, isVisible }) => ({
    display: 'inline-block',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
    transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  })
);
```

## 📊 Data Display Components

### Progress Bar
**Pattern**: Visual progress indicator

```tsx
const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 3,
  backgroundColor: 'rgba(167, 218, 219, 0.1)',
  borderRadius: theme.spacing(0.5),
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(0.5),
  },
}));
```

### Navigation Dots
**Pattern**: Section navigation indicator

```tsx
const Dot = styled(Box)<{ active: boolean }>(({ theme, active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  border: `2px solid ${active ? theme.palette.primary.main : 'rgba(167, 218, 219, 0.3)'}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : 'rgba(167, 218, 219, 0.2)',
    transform: 'scale(1.2)',
  },
}));
```

## 🎯 Interactive Components

### Scroll Indicator
**Pattern**: Animated scroll prompt

```tsx
const ScrollIndicator = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.palette.primary.main,
  backgroundColor: 'rgba(167, 218, 219, 0.1)',
  border: '2px solid rgba(167, 218, 219, 0.3)',
  animation: 'pulse 2s infinite',
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.2)',
  },
}));
```

## 📱 Responsive Patterns

### Mobile Menu Panel
**Pattern**: Slide-in mobile navigation

```tsx
const MobileMenuPanel = styled(Box)<{ open: boolean }>(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '80%',
  maxWidth: 320,
  height: '100%',
  backgroundColor: 'rgba(13, 27, 42, 0.95)',
  backdropFilter: 'blur(20px)',
  transform: open ? 'translateX(0)' : 'translateX(100%)',
  transition: 'transform 0.3s ease',
  boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.3)',
}));
```

## 🔧 Utility Components

### Section Wrapper
**Pattern**: Consistent section spacing and styling

```tsx
const Section = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: 'transparent',
  borderTop: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(6)} 0`,
  },
}));
```

### Container Extension
**Pattern**: Consistent max-width container

```tsx
const CustomContainer = styled(Container)(({ theme }) => ({
  maxWidth: 1200,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));
```

## 🎨 Theme Integration

All components should use the theme object for consistency:

```tsx
// Good
backgroundColor: theme.palette.primary.main
padding: theme.spacing(2)

// Bad
backgroundColor: '#a7dadb'
padding: '16px'
```

## 📋 Component Checklist

When creating new components, ensure:

- [ ] Uses theme values for colors and spacing
- [ ] Has proper TypeScript types
- [ ] Includes hover/focus states
- [ ] Is responsive
- [ ] Has ARIA labels where needed
- [ ] Follows the glass morphism design pattern
- [ ] Includes smooth transitions
- [ ] Is documented in this library

## 🚀 Usage Tips

1. **Import from correct paths**: Use `@/components/` for absolute imports
2. **Compose components**: Build complex UIs by combining atomic components
3. **Maintain consistency**: Always use existing patterns before creating new ones
4. **Performance**: Use `React.memo` for expensive components
5. **Accessibility**: Test with keyboard navigation

---

This component library is continuously evolving. Please add new patterns as they are created.