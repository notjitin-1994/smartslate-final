# SmartSlate Component Library

## 📚 Overview

This document catalogs all reusable components in the SmartSlate design system, providing usage examples and implementation guidelines.

## 🧩 Layout Components

### Header
**Location**: `src/components/layout/Header.tsx`

**Description**: Fixed floating header with glassmorphism effect, responsive navigation, mobile menu, and integrated modal triggers.

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
- Modal trigger buttons

### Footer
**Location**: `src/components/layout/Footer.tsx`

**Description**: Minimal footer with company information and branding.

**Usage**:
```tsx
import Footer from '@/components/layout/Footer';

// Automatically included in layout.tsx
<Footer />
```

### MobileMenu
**Location**: `src/components/layout/MobileMenu.tsx`

**Description**: Responsive mobile navigation menu with smooth animations.

**Features**:
- Slide-in animation
- Touch-friendly navigation
- Modal integration
- Responsive design

## 🎨 UI Components

### StandardHero
**Location**: `src/components/ui/StandardHero.tsx`

**Description**: Reusable hero section component with title, subtitle, description, and accent word highlighting.

**Usage**:
```tsx
import StandardHero from '@/components/ui/StandardHero';

<StandardHero
  title="Your Title"
  subtitle="Your subtitle"
  description="Your description"
  accentWords={['key', 'words']}
  showScrollIndicator={true}
>
  <YourCTAButton />
</StandardHero>
```

**Props**:
- `title`: Main heading
- `subtitle`: Secondary heading
- `description`: Body text
- `accentWords`: Array of words to highlight
- `showScrollIndicator`: Show scroll down indicator
- `children`: CTA buttons or other content

### Modal
**Location**: `src/components/ui/Modal.tsx`

**Description**: Reusable modal component with backdrop and animations.

**Usage**:
```tsx
import Modal from '@/components/ui/Modal';

<Modal
  open={isOpen}
  onClose={handleClose}
  title="Modal Title"
>
  <ModalContent />
</Modal>
```

### FormField
**Location**: `src/components/ui/FormField.tsx`

**Description**: Standardized form input field with validation and styling.

**Usage**:
```tsx
import FormField from '@/components/ui/FormField';

<FormField
  label="Email"
  name="email"
  type="email"
  required
  error={errors.email}
/>
```

### WaitlistButton
**Location**: `src/components/ui/WaitlistButton.tsx`

**Description**: Specialized button for waitlist submissions with loading states.

**Usage**:
```tsx
import WaitlistButton from '@/components/ui/WaitlistButton';

<WaitlistButton
  onClick={handleWaitlist}
  loading={isLoading}
  variant="contained"
/>
```

### DemoButton
**Location**: `src/components/ui/DemoButton.tsx`

**Description**: Button component for demo requests with integrated modal functionality.

**Usage**:
```tsx
import DemoButton from '@/components/ui/DemoButton';

<DemoButton
  onClick={openDemoModal}
  variant="outlined"
  size="large"
/>
```

## 🏠 Landing Page Components

### Hero
**Location**: `src/components/landing/Hero.tsx`

**Description**: Main landing page hero section with animated content and CTA buttons.

**Features**:
- Animated text reveal
- Accent word highlighting
- Scroll indicator
- CTA button integration

### Framework
**Location**: `src/components/landing/Framework.tsx`

**Description**: Framework explanation section with visual elements.

### TalentParadox
**Location**: `src/components/landing/TalentParadox.tsx`

**Description**: Section explaining the talent paradox with interactive elements.

### CaseStudyModal
**Location**: `src/components/landing/CaseStudyModal.tsx`

**Description**: Modal for case study requests with comprehensive form.

**Features**:
- Multi-step form
- Field validation
- File upload support
- Email integration

### ConsultationModal
**Location**: `src/components/landing/ConsultationModal.tsx`

**Description**: Modal for consultation booking with scheduling options.

**Features**:
- Date and time selection
- Attendee management
- Challenge identification
- Business context collection

### DemoModal
**Location**: `src/components/landing/DemoModal.tsx`

**Description**: Modal for product demonstration requests.

**Features**:
- Product selection
- Team size input
- Challenge description
- Timeline specification

### PartnerModal
**Location**: `src/components/landing/PartnerModal.tsx`

**Description**: Modal for partnership inquiries.

**Features**:
- Partnership type selection
- Company information
- Target market definition
- Partnership goals

### Partners
**Location**: `src/components/landing/Partners.tsx`

**Description**: Partner showcase section with logos and testimonials.

### ROICalculator
**Location**: `src/components/landing/ROICalculator.tsx`

**Description**: Interactive ROI calculator for learning investments.

**Features**:
- Cost input fields
- Benefit calculations
- Visual charts
- Export functionality

## 🛍️ Product Components

### ProductSection
**Location**: `src/components/products/ProductSection.tsx`

**Description**: Main product showcase component with responsive design.

**Features**:
- Responsive layout
- Animation triggers
- CTA integration
- Status indicators

### ProductList
**Location**: `src/components/products/ProductList.tsx`

**Description**: Grid layout for displaying multiple products.

### ProductFilter
**Location**: `src/components/products/ProductFilter.tsx`

**Description**: Filtering and search functionality for products.

### Hero (Products)
**Location**: `src/components/products/Hero.tsx`

**Description**: Product page hero section with filtering options.

### Product Modals
- **SolaraInterestModal**: `src/components/products/SolaraInterestModal.tsx`
- **SSAInterestModal**: `src/components/products/SSAInterestModal.tsx`

**Description**: Specialized modals for product interest capture.

### Infographics
- **SolaraInfographic**: `src/components/products/SolaraInfographic.tsx`
- **SSAInfographic**: `src/components/products/SSAInfographic.tsx`
- **IgniteInfographic**: `src/components/products/IgniteInfographic.tsx`
- **StrategicSkillsInfographic**: `src/components/products/StrategicSkillsInfographic.tsx`

**Description**: Visual representations of product features and benefits.

## 🔄 Difference Page Components

### DifferenceHero
**Location**: `src/components/difference/DifferenceHero.tsx`

**Description**: Hero section for the difference page.

### ComparisonSection
**Location**: `src/components/difference/ComparisonSection.tsx`

**Description**: Company comparison table or chart.

### KeyDifferentiators
**Location**: `src/components/difference/KeyDifferentiators.tsx`

**Description**: Highlighted key differentiators.

### ImpactMetrics
**Location**: `src/components/difference/ImpactMetrics.tsx`

**Description**: Metrics showing impact and results.

### TransformationJourney
**Location**: `src/components/difference/TransformationJourney.tsx`

**Description**: Visual representation of transformation process.

### CTASection
**Location**: `src/components/difference/CTASection.tsx`

**Description**: Call-to-action section.

## 🎭 Provider Components

### ModalProvider
**Location**: `src/components/providers/ModalProvider.tsx`

**Description**: Context provider for modal state management.

**Usage**:
```tsx
import { ModalProvider } from '@/components/providers/ModalProvider';

<ModalProvider>
  <YourApp />
</ModalProvider>
```

### ThemeProvider
**Location**: `src/components/providers/ThemeProvider.tsx`

**Description**: Material-UI theme provider with custom theme.

### PWAClient
**Location**: `src/components/providers/PWAClient.tsx`

**Description**: PWA functionality provider.

### TrackClient
**Location**: `src/components/providers/TrackClient.tsx`

**Description**: Analytics tracking provider.

## 🎨 Styling Components

### LandingStyles
**Location**: `src/components/landing/styles/LandingStyles.tsx`

**Description**: Styled components for landing page elements.

**Components**:
- `FadeInContent`: Animated content wrapper
- `PrimaryButton`: Primary CTA button
- `SecondaryButton`: Secondary action button
- `GlassContainer`: Glass morphism container

### DifferenceStyles
**Location**: `src/components/difference/styles/DifferenceStyles.tsx`

**Description**: Styled components for difference page elements.

## 🎯 Icons

### ProductIcons
**Location**: `src/components/icons/ProductIcons.tsx`

**Description**: Icon components for products and features.

## 📱 PWA Components

### Manifest
**Location**: `src/app/manifest.ts`

**Description**: PWA manifest configuration.

### Service Worker
**Location**: `public/sw.js`

**Description**: Service worker for offline functionality.

## 🎨 Design Patterns

### Glass Morphism
Consistent glass morphism effect across components:

```tsx
const glassEffect = {
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '16px',
};
```

### Animation Classes
CSS classes for consistent animations:

```css
.icon-anim {
  transition: all 0.3s ease;
}

.icon-bounce-y {
  animation: bounceY 2s infinite;
}
```

### Responsive Design
Mobile-first responsive design patterns:

```tsx
// Mobile overlay with desktop side-by-side
<div className="md:hidden">
  {/* Mobile layout */}
</div>
<div className="hidden md:flex">
  {/* Desktop layout */}
</div>
```

## 📋 Usage Guidelines

### Component Import Pattern
```tsx
// Use absolute imports from src/
import ComponentName from '@/components/path/ComponentName';
```

### Props Interface
Always define TypeScript interfaces for component props:

```tsx
interface ComponentProps {
  title: string;
  description?: string;
  onClick: () => void;
}
```

### Error Handling
Include error boundaries and loading states:

```tsx
const Component = ({ data, loading, error }: ComponentProps) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <ComponentContent data={data} />;
};
```

### Accessibility
Ensure components meet accessibility standards:

- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## 🚀 Performance Considerations

### Lazy Loading
Use dynamic imports for large components:

```tsx
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
});
```

### Memoization
Memoize expensive components and callbacks:

```tsx
const MemoizedComponent = React.memo(Component);
const memoizedCallback = useCallback(() => {}, [dependencies]);
```

### Image Optimization
Use Next.js Image component for optimized images:

```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={isAboveFold}
/>
```

## 🔧 Development Workflow

### Component Creation
1. Create component file in appropriate directory
2. Define TypeScript interface for props
3. Implement component with accessibility in mind
4. Add to component library documentation
5. Test across different screen sizes

### Styling Approach
- Use Tailwind CSS for utility classes
- Create styled components for complex patterns
- Maintain consistent spacing and typography
- Follow design system color palette

### Testing Strategy
- Unit tests for component logic
- Integration tests for component interactions
- Visual regression tests for UI consistency
- Accessibility testing with screen readers