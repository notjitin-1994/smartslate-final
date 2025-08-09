'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStackApp, useUser } from '@stackframe/stack';

type AuthMode = 'signin' | 'signup';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
}

export default function AuthPageClient() {
  const router = useRouter();
  const app = useStackApp();
  const user = useUser();
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    company: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);
  
  // Show loading state while checking authentication
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary-accent border-t-transparent rounded-full" />
      </div>
    );
  }
  
  // If user is authenticated, show nothing (will redirect)
  if (user) {
    return null;
  }

  // Set auth mode based on the current path
  useEffect(() => {
    if (window.location.pathname.includes('sign-in')) {
      setAuthMode('signin');
    } else if (window.location.pathname.includes('sign-up')) {
      setAuthMode('signup');
    }
  }, []);

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
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

    try {
      if (authMode === 'signup') {
        // Sign up with Stack Auth first
        const result = await app.signUpWithCredential({
          email: formData.email,
          password: formData.password,
        });
        
        if (result.status === 'error') {
          // Check if user already exists
          if (result.error.message.includes('already exists') || result.error.message.includes('already registered')) {
            setError('An account with this email already exists. Please sign in instead.');
            setAuthMode('signin');
            return;
          }
          throw new Error(result.error.message);
        }
        
        // After successful Stack Auth signup, create user in our database
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            company: formData.company,
          }),
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Failed to create user in database:', errorText);
          // Don't fail the whole signup if database sync fails
          // The StackAuthSync will handle it on next page load
        }
        
        // User is automatically signed in after signup with Stack Auth
        // Wait a moment for the auth state to update
        setTimeout(() => {
          router.push('/profile');
        }, 100);
      } else {
        // Sign in with Stack Auth
        const result = await app.signInWithCredential({
          email: formData.email,
          password: formData.password,
        });
        
        if (result.status === 'error') {
          throw new Error(result.error.message);
        }
        
        // Create/update user in our database after successful sign in
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
          }),
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Failed to sync user in database:', errorText);
          // Don't fail the whole signin if database sync fails
          // The StackAuthSync will handle it on next page load
        }
        
        // Wait a moment for the auth state to update
        setTimeout(() => {
          router.push('/profile');
        }, 100);
      }
    } catch (err: any) {
      // Improve error messages for common cases
      let errorMessage = err?.message || 'Something went wrong';
      
      if (errorMessage.includes('Invalid email or password')) {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.';
      } else if (errorMessage.includes('Network') || errorMessage.includes('Failed to fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (errorMessage.includes('too many attempts')) {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
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
    <div className="auth-page-wrapper min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-paper to-background-dark" />
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-primary-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>



      {/* Auth Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full"
      >
        <div className="glass-card custom-auth-card" data-auth-mode={authMode}>
          {/* Header */}
          <div className="text-center mb-8 md:mb-10 lg:mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-20 h-20 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 bg-primary-accent/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-primary-accent to-secondary-accent rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </motion.div>
            <h1 className="heading-lg mb-2">
              {authMode === 'signin' ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-secondary">
              {authMode === 'signin' 
                ? 'Continue your learning journey' 
                : 'Join SmartSlate and unlock your potential'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {authMode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName || ''}
                        onChange={handleInputChange('firstName')}
                        className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="form-error">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName || ''}
                        onChange={handleInputChange('lastName')}
                        className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="form-error">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="company" className="form-label">
                      Company (Optional)
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formData.company || ''}
                      onChange={handleInputChange('company')}
                      className="form-input"
                      placeholder="Your company name"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="form-error">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                placeholder={authMode === 'signin' ? 'Enter your password' : 'Create a password'}
                autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'}
              />
              {errors.password && (
                <p className="form-error">{errors.password}</p>
              )}
              {authMode === 'signup' && (
                <p className="form-help">Must be at least 8 characters</p>
              )}
            </div>

            <AnimatePresence mode="wait">
              {authMode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword || ''}
                      onChange={handleInputChange('confirmPassword')}
                      className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    {errors.confirmPassword && (
                      <p className="form-error">{errors.confirmPassword}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Forgot Password Link */}
            {authMode === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => router.push('/handler/forgot-password')}
                  className="text-sm text-primary-accent hover:text-primary-accent-light transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/20"
              >
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full mt-6"
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
          <div className="relative my-8 md:my-10 lg:my-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background-dark/50 text-secondary backdrop-blur-sm rounded-full">
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
            <button
              type="button"
              disabled
              className="relative flex items-center justify-center gap-2 py-3 px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all opacity-50 cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-primary">Google</span>
              <span className="absolute -top-2 -right-2 bg-primary-accent/20 text-primary-accent text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                Soon
              </span>
            </button>
            <button
              type="button"
              disabled
              className="relative flex items-center justify-center gap-2 py-3 px-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all opacity-50 cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span className="text-sm font-medium text-primary">LinkedIn</span>
              <span className="absolute -top-2 -right-2 bg-primary-accent/20 text-primary-accent text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                Soon
              </span>
            </button>
          </div>

          {/* Toggle Auth Mode */}
          <div className="mt-8 md:mt-10 lg:mt-12 text-center">
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

          {/* Terms */}
          {authMode === 'signup' && (
            <p className="text-xs text-secondary text-center mt-6">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-primary-accent hover:text-primary-accent-light">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary-accent hover:text-primary-accent-light">
                Privacy Policy
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
