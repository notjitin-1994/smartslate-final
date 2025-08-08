'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';
import { useGetStartedModal } from '@/hooks/useGetStartedModal';

type AuthMode = 'signin' | 'signup';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
}

export default function GetStartedModal() {
  const { isOpen, closeModal } = useGetStartedModal();
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (authMode === 'signup') {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      const firstKey = Object.keys(validationErrors)[0] as keyof FormData | undefined;
      if (firstKey) {
        const el = document.getElementById(firstKey);
        if (el) el.focus();
      }
      return;
    }

    setIsLoading(true);
    setError('');

    // No backend: simulate submission and close the modal
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      company: '',
    });

    setIsLoading(false);
    closeModal();
  };

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'signin' ? 'signup' : 'signin');
    setErrors({});
    setError('');
    // Clear passwords when switching modes
    setFormData(prev => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      maxWidth="sm"
      title={authMode === 'signin' ? 'Welcome Back' : 'Get Started'}
      labelledById="auth-modal-title"
      describedById={error ? 'auth-modal-error' : undefined}
      initialFocusSelector="#email"
    >
      <div className="max-w-md mx-auto">
        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-primary-accent/20 rounded-full blur-xl" />
            <div className="relative w-full h-full bg-gradient-to-br from-primary-accent to-secondary-accent rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h2 id="auth-modal-title" className="text-2xl font-bold text-primary mb-2">
            {authMode === 'signin' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="text-secondary text-sm">
            {authMode === 'signin' 
              ? 'Continue your learning journey' 
              : 'Join SmartSlate and unlock your potential'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {authMode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    name="firstName"
                    type="text"
                    value={formData.firstName || ''}
                    onChange={handleInputChange('firstName')}
                    required
                    error={errors.firstName}
                    autoComplete="given-name"
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={formData.lastName || ''}
                    onChange={handleInputChange('lastName')}
                    required
                    error={errors.lastName}
                    autoComplete="family-name"
                  />
                </div>
                <FormField
                  label="Company (Optional)"
                  name="company"
                  type="text"
                  value={formData.company || ''}
                  onChange={handleInputChange('company')}
                  placeholder="Your company name"
                  autoComplete="organization"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            required
            placeholder="you@example.com"
            error={errors.email}
            autoComplete="email"
          />

          <FormField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange('password')}
            required
            placeholder={authMode === 'signin' ? 'Enter your password' : 'Create a password'}
            error={errors.password}
            helpText={authMode === 'signup' ? 'Must be at least 8 characters' : undefined}
            autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'}
          />

          <AnimatePresence mode="wait">
            {authMode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword || ''}
                  onChange={handleInputChange('confirmPassword')}
                  required
                  placeholder="Confirm your password"
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Forgot Password Link */}
          {authMode === 'signin' && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary-accent hover:text-primary-accent-light transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div id="auth-modal-error" className="p-3 rounded-lg bg-red-500/10 border border-red-500/20" aria-live="polite">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {authMode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              authMode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background-dark text-secondary">or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="relative flex items-center justify-center gap-2 py-2.5 px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors opacity-75 cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-primary">Google</span>
              <span className="absolute -top-2 -right-2 bg-primary-accent/20 text-primary-accent text-[10px] font-semibold px-1.5 py-0.5 rounded-full">Soon</span>
            </button>
            <button
              type="button"
              disabled
              className="relative flex items-center justify-center gap-2 py-2.5 px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors opacity-75 cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#1D1D1F" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-sm font-medium text-primary">Apple</span>
              <span className="absolute -top-2 -right-2 bg-primary-accent/20 text-primary-accent text-[10px] font-semibold px-1.5 py-0.5 rounded-full">Soon</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              className="relative flex items-center justify-center gap-2 py-2.5 px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors opacity-75 cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#F25022" d="M11.4 24H0V12.6h11.4V24z"/>
                <path fill="#7FBA00" d="M24 24H12.6V12.6H24V24z"/>
                <path fill="#00A4EF" d="M11.4 11.4H0V0h11.4v11.4z"/>
                <path fill="#FFB900" d="M24 11.4H12.6V0H24v11.4z"/>
              </svg>
              <span className="text-sm font-medium text-primary">Microsoft</span>
              <span className="absolute -top-2 -right-2 bg-primary-accent/20 text-primary-accent text-[10px] font-semibold px-1.5 py-0.5 rounded-full">Soon</span>
            </button>
            <button
              type="button"
              disabled
              className="relative flex items-center justify-center gap-2 py-2.5 px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors opacity-75 cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="11" stroke="#a7dadb" strokeWidth="2"/>
                <path d="M12 8v4m0 4h.01M8 12h8" stroke="#a7dadb" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9 9l6 6m0-6l-6 6" stroke="#a7dadb" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-medium text-primary">SSO</span>
              <span className="absolute -top-2 -right-2 bg-primary-accent/20 text-primary-accent text-[10px] font-semibold px-1.5 py-0.5 rounded-full">Soon</span>
            </button>
          </div>
        </div>

        {/* Toggle Auth Mode */}
        <div className="mt-8 text-center">
          <p className="text-sm text-secondary">
            {authMode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={toggleAuthMode}
              className="ml-1 text-primary-accent hover:text-primary-accent-light font-semibold transition-colors"
            >
              {authMode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}
