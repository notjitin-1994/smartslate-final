'use client';

import { useEffect, useMemo, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

type AuthTab = 'signin' | 'signup';

export default function AuthModal() {
  const { isOpen, close, defaultTab } = useAuthModal();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<AuthTab>('signin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signin, setSignin] = useState({
    email: '',
    password: '',
    remember: true,
  });
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (defaultTab) setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordStrength = useMemo(() => {
    const pwd = activeTab === 'signin' ? signin.password : signup.password;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return Math.min(score, 5);
  }, [activeTab, signin.password, signup.password]);

  const passwordStrengthLabel = ['Too short', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'][passwordStrength];

  const resetState = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrors({});
    setSignin({ email: '', password: '', remember: true });
    setSignup({ name: '', email: '', password: '', confirmPassword: '', agree: true });
  };

  const handleClose = () => {
    resetState();
    close();
  };

  const updateField = (form: 'signin' | 'signup', field: string, value: string | boolean) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (form === 'signin') {
      setSignin((prev) => ({ ...prev, [field]: value } as typeof signin));
    } else {
      setSignup((prev) => ({ ...prev, [field]: value } as typeof signup));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (activeTab === 'signin') {
      if (!signin.email) newErrors.email = 'Email is required';
      else if (!emailRegex.test(signin.email)) newErrors.email = 'Enter a valid email';
      if (!signin.password) newErrors.password = 'Password is required';
    } else {
      if (!signup.name) newErrors.name = 'Name is required';
      if (!signup.email) newErrors.email = 'Email is required';
      else if (!emailRegex.test(signup.email)) newErrors.email = 'Enter a valid email';
      if (!signup.password) newErrors.password = 'Create a password';
      else if (signup.password.length < 8) newErrors.password = 'Use at least 8 characters';
      if (!signup.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
      else if (signup.password !== signup.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!signup.agree) newErrors.agree = 'Please accept terms to continue';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      if (activeTab === 'signin') {
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: signin.email, password: signin.password }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || 'Sign in failed');
        if (!json?.token || !json?.user) throw new Error('Invalid response');
        login(json.token, json.user);
        setIsSuccess(true);
        setTimeout(() => handleClose(), 1000);
      } else {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: signup.name.trim(), email: signup.email.trim().toLowerCase(), password: signup.password }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || 'Sign up failed');
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setActiveTab('signin');
        }, 1400);
      }
    } catch (err: any) {
      const message = err?.message || 'Something went wrong';
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const SocialButton = ({ provider, onClick }: { provider: 'google' | 'github' | 'linkedin'; onClick: () => void }) => {
    const labels = {
      google: 'Continue with Google',
      github: 'Continue with GitHub',
      linkedin: 'Continue with LinkedIn',
    } as const;
    const Icon = () => {
      switch (provider) {
        case 'google':
          return (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21.35 11.1H12v2.9h5.35c-.25 1.5-1.8 4.4-5.35 4.4-3.25 0-5.9-2.7-5.9-6s2.65-6 5.9-6c1.85 0 3.1.8 3.8 1.5l2.6-2.5C17.1 3.1 14.8 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c6.4 0 8.2-4.5 8.2-6.8 0-.5-.05-1-.15-1.5z" />
            </svg>
          );
        case 'github':
          return (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.84c.85 0 1.7.12 2.5.35 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.57 4.94.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10 10 0 0012 2z" clipRule="evenodd" />
            </svg>
          );
        case 'linkedin':
          return (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.82-2.05 3.74-2.05 4 0 4.74 2.63 4.74 6.06V23h-4v-7.38c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.82 1.9-2.82 3.89V23h-4V8z" />
            </svg>
          );
      }
    };
    return (
      <button type="button" onClick={onClick} className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
        <Icon />
        <span>{labels[provider]}</span>
      </button>
    );
  };

  const initialFocusSelector = activeTab === 'signin' ? '#signin-email' : '#signup-name';

  const startGoogleOAuth = async () => {
    try {
      setIsSubmitting(true);
      const supabase = getSupabaseBrowser();
      const origin = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
      const nextPath = typeof window !== 'undefined' ? (window.location.pathname + window.location.search) : '/';
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
      
      console.log('Starting Google OAuth with redirectTo:', redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      } as any);
      
      if (error) {
        console.error('Google OAuth error:', error);
        throw error;
      }
      
      const url = data?.url;
      if (url) {
        console.log('Redirecting to Google OAuth URL:', url);
        window.location.href = url;
        return;
      }
      
      console.log('No OAuth URL returned, data:', data);
      // Fallback: if SDK auto-redirects, do nothing
    } catch (err: any) {
      console.error('Google OAuth failed:', err);
      const message = err?.message || 'Google sign-in failed';
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="md"
      labelledById="auth-modal-title"
      describedById="auth-modal-subtitle"
      initialFocusSelector={initialFocusSelector}
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="text-center p-5 pb-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-accent to-primary-accent-dark rounded-xl mb-3"
          >
            <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0 0H7m5 0h5" />
            </svg>
          </motion.div>
          <h2 id="auth-modal-title" className="text-xl md:text-2xl font-bold mb-1">Welcome</h2>
          <p id="auth-modal-subtitle" className="text-secondary text-sm">Sign in or create your SmartSlate account</p>
        </div>

        {/* Tabs */}
        <div className="px-5">
          <div className="grid grid-cols-2 bg-white/5 border border-white/10 rounded-lg p-1">
            {(['signin', 'signup'] as AuthTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab ? 'bg-primary-accent text-background-dark' : 'text-secondary hover:text-primary'
                }`}
              >
                {tab === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-5 pb-4 pt-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Success</h3>
                <p className="text-secondary text-sm">You are all set. Closing the modal…</p>
              </motion.div>
            ) : activeTab === 'signin' ? (
              <motion.form
                key="signin"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {errors.form && (
                  <p className="text-sm text-red-400" role="alert">{errors.form}</p>
                )}
                <FormField
                  label="Email"
                  name="signin-email"
                  type="email"
                  value={signin.email}
                  onChange={(v) => updateField('signin', 'email', v)}
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                  error={errors.email}
                />
                <div className="relative">
                  <FormField
                    label="Password"
                    name="signin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={signin.password}
                    onChange={(v) => updateField('signin', 'password', v)}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                    error={errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-9 md:top-10 text-secondary hover:text-primary"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3l18 18" />
                        <path d="M10.58 10.58a2 2 0 102.83 2.83" />
                        <path d="M16.88 16.88A10.84 10.84 0 0112 19c-5 0-9.27-3.11-11-7 1-2.27 2.7-4.2 4.8-5.5" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-secondary">
                    <input
                      type="checkbox"
                      checked={signin.remember}
                      onChange={(e) => updateField('signin', 'remember', e.target.checked)}
                      className="w-4 h-4 text-primary-accent"
                    />
                    Remember me
                  </label>
                  <a href="/handler/sign-in" className="text-sm text-primary-accent hover:underline">Forgot password?</a>
                </div>

                {/* Strength bar */}
                {signin.password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[0,1,2,3,4].map((i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded ${i < passwordStrength ? 'bg-primary-accent' : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-secondary">{passwordStrengthLabel}</p>
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                  {isSubmitting ? 'Signing in…' : 'Sign In'}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background-dark px-2 text-secondary">or</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <SocialButton provider="google" onClick={startGoogleOAuth} />
                  <SocialButton provider="github" onClick={() => setActiveTab('signin')} />
                  <SocialButton provider="linkedin" onClick={() => setActiveTab('signin')} />
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {errors.form && (
                  <p className="text-sm text-red-400" role="alert">{errors.form}</p>
                )}
                <FormField
                  label="Full Name"
                  name="signup-name"
                  value={signup.name}
                  onChange={(v) => updateField('signup', 'name', v)}
                  required
                  placeholder="Jane Doe"
                  error={errors.name}
                />
                <FormField
                  label="Email"
                  name="signup-email"
                  type="email"
                  value={signup.email}
                  onChange={(v) => updateField('signup', 'email', v)}
                  required
                  placeholder="jane@company.com"
                  autoComplete="email"
                  error={errors.email}
                />
                <div className="relative">
                  <FormField
                    label="Password"
                    name="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={signup.password}
                    onChange={(v) => updateField('signup', 'password', v)}
                    required
                    placeholder="Create a secure password"
                    autoComplete="new-password"
                    error={errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-9 md:top-10 text-secondary hover:text-primary"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3l18 18" />
                        <path d="M10.58 10.58a2 2 0 102.83 2.83" />
                        <path d="M16.88 16.88A10.84 10.84 0 0112 19c-5 0-9.27-3.11-11-7 1-2.27 2.7-4.2 4.8-5.5" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <FormField
                    label="Confirm Password"
                    name="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={signup.confirmPassword}
                    onChange={(v) => updateField('signup', 'confirmPassword', v)}
                    required
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    error={errors.confirmPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="absolute right-3 top-9 md:top-10 text-secondary hover:text-primary"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3l18 18" />
                        <path d="M10.58 10.58a2 2 0 102.83 2.83" />
                        <path d="M16.88 16.88A10.84 10.84 0 0112 19c-5 0-9.27-3.11-11-7 1-2.27 2.7-4.2 4.8-5.5" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Strength bar */}
                {signup.password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[0,1,2,3,4].map((i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded ${i < passwordStrength ? 'bg-primary-accent' : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-secondary">{passwordStrengthLabel}</p>
                  </div>
                )}

                <div>
                  <label className="inline-flex items-center gap-2 text-sm text-secondary">
                    <input
                      type="checkbox"
                      checked={signup.agree}
                      onChange={(e) => updateField('signup', 'agree', e.target.checked)}
                      className="w-4 h-4 text-primary-accent"
                    />
                    I agree to the
                    <a href="/legal/terms" className="text-primary-accent hover:underline">Terms</a>
                    and
                    <a href="/legal/privacy" className="text-primary-accent hover:underline">Privacy Policy</a>
                  </label>
                  {errors.agree && <p className="text-sm text-red-400 mt-1">{errors.agree}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-secondary w-full">
                  {isSubmitting ? 'Creating account…' : 'Create Account'}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background-dark px-2 text-secondary">or</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <SocialButton provider="google" onClick={startGoogleOAuth} />
                  <SocialButton provider="github" onClick={() => setActiveTab('signup')} />
                  <SocialButton provider="linkedin" onClick={() => setActiveTab('signup')} />
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 bg-background-dark/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <button type="button" onClick={handleClose} className="btn btn-tertiary">Close</button>
            <div className="text-sm text-secondary">
              {activeTab === 'signin' ? (
                <span>
                  New here?{' '}
                  <button className="text-primary-accent hover:underline" onClick={() => setActiveTab('signup')}>
                    Create an account
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button className="text-primary-accent hover:underline" onClick={() => setActiveTab('signin')}>
                    Sign in
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}


