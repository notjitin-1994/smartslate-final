# Get Started Modal Documentation

## Overview
The Get Started modal is a beautiful authentication overlay that allows users to sign in or create an account on SmartSlate. It features a glassmorphic design that matches the site's aesthetic and provides a seamless user experience.

## Features

### Design Elements
- **Glassmorphism**: Translucent background with backdrop blur
- **Gradient Accents**: Primary (cyan) and secondary (purple) color gradients
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Works perfectly on mobile and desktop
- **Dark Theme**: Consistent with the site's dark aesthetic

### Authentication Modes
1. **Sign In Mode**
   - Email and password fields
   - "Forgot password?" link
   - Quick toggle to sign up

2. **Sign Up Mode**
   - First name and last name fields
   - Company field (optional)
   - Email and password fields
   - Password confirmation
   - Form validation

### Form Features
- **Real-time Validation**: Errors clear as user types
- **Password Requirements**: Minimum 8 characters
- **Email Validation**: Proper email format checking
- **Loading States**: Visual feedback during submission
- **Keyboard Navigation**: Full accessibility support

### Social Login Options
- Google authentication button
- Apple authentication button
- Clean, modern button designs

## Usage

### Opening the Modal
The modal can be triggered by clicking the "Get Started" button in the header (both desktop and mobile versions).

### State Management
The modal state is managed using Zustand through the `useGetStartedModal` hook:

```typescript
import { useGetStartedModal } from '@/hooks/useGetStartedModal';

const { isOpen, openModal, closeModal } = useGetStartedModal();
```

### Notes
Sign up calls the backend endpoint `/api/auth/signup` to upsert a local user and optionally provision in Neon Auth if configured via env. A short-lived client token is synthesized to update UI state immediately.

## Component Structure

### Files
- `/src/components/auth/GetStartedModal.tsx` - Main modal component
- `/src/hooks/useGetStartedModal.ts` - State management hook
- `/src/components/ui/Modal.tsx` - Base modal component
- `/src/components/ui/FormField.tsx` - Reusable form field component

### Props and Customization
The modal uses the existing UI components and follows the site's design system. To customize:

1. **Colors**: Update CSS variables in `globals.css`
2. **Animations**: Modify Framer Motion settings in the component
3. **Form Fields**: Add/remove fields in the `FormData` interface
4. **Validation**: Update the `validateForm` function

## Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support (Tab, Shift+Tab, Escape)
- Focus management
- Screen reader friendly

## Future Enhancements
- Password strength indicator
- Two-factor authentication support
- Remember me checkbox
- Social login implementation
- Password reset flow
- Email verification flow