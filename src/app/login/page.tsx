'use client';

import { useEffect, useMemo, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import { useAuth } from '@/contexts/AuthContext';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

type AuthTab = 'signin' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  // Set initial tab based on URL params
  useEffect(() => {
    const tab = searchParams.get('tab') as AuthTab;
    if (tab === 'signin' || tab === 'signup') {
      setActiveTab(tab);
    }
  }, [searchParams]);

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
        setTimeout(() => router.push('/'), 1000);
      } else {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: signup.name.trim(), email: signup.email.trim().toLowerCase(), password: signup.password }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || 'Sign up failed');
        if (json?.token && json?.user) {
          login(json.token, json.user);
          setIsSuccess(true);
          setTimeout(() => router.push('/'), 1000);
        } else {
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            setActiveTab('signin');
          }, 1400);
        }
      }
    } catch (err: any) {
      const message = err?.message || 'Something went wrong';
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const startGoogleOAuth = async () => {
    try {
      setIsSubmitting(true);
      const supabase = getSupabaseBrowser();
      const origin = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
      const redirectTo = `${origin}/auth/callback`;
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      } as any);
      
      if (error) throw error;
      
      const url = data?.url;
      if (url) window.location.assign(url);
    } catch (err: any) {
      const message = err?.message || 'Google sign-in failed';
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home link */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-secondary hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Smartslate
          </Link>
        </div>

        {/* Auth Card */}
        <div className="bg-background-dark/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="text-center p-6 pb-4">
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
            <h1 className="text-xl md:text-2xl font-bold mb-1">Welcome</h1>
            <p className="text-secondary text-sm">Sign in or create your Smartslate account</p>
          </div>

          {/* Tabs */}
          <div className="px-6">
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
          <div className="px-6 pb-6 pt-4">
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
                  <p className="text-secondary text-sm">Redirecting you...</p>
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
                    <Link href="/login?tab=signin" className="text-sm text-primary-accent hover:underline">Forgot password?</Link>
                  </div>

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

                  <button
                    type="button"
                    onClick={startGoogleOAuth}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
                      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.551 31.91 29.137 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C34.676 5.108 29.568 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.333-.138-2.633-.389-3.917z"/>
                      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.818C14.411 16.367 18.878 13 24 13c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C34.676 5.108 29.568 3 24 3 16.318 3 9.65 7.337 6.306 14.691z"/>
                      <path fill="#4CAF50" d="M24 43c5.083 0 9.64-1.953 13.117-5.118l-6.052-4.953C29.068 34.373 26.677 35 24 35c-5.105 0-9.505-3.07-11.285-7.438l-6.59 5.08C8.438 38.556 15.646 43 24 43z"/>
                      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.073 3.137-3.386 5.617-6.238 6.929l.001-.001 6.052 4.953C36.85 41.52 44 37 44 23c0-1.333-.138-2.633-.389-3.917z"/>
                    </svg>
                    Continue with Google
                  </button>
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

                  <div>
                    <label className="inline-flex items-center gap-2 text-sm text-secondary">
                      <input
                        type="checkbox"
                        checked={signup.agree}
                        onChange={(e) => updateField('signup', 'agree', e.target.checked)}
                        className="w-4 h-4 text-primary-accent"
                      />
                      I agree to the
                      <Link href="/legal/terms" className="text-primary-accent hover:underline">Terms</Link>
                      and
                      <Link href="/legal/privacy" className="text-primary-accent hover:underline">Privacy Policy</Link>
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

                  <button
                    type="button"
                    onClick={startGoogleOAuth}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
                      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.551 31.91 29.137 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C34.676 5.108 29.568 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.333-.138-2.633-.389-3.917z"/>
                      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.818C14.411 16.367 18.878 13 24 13c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C34.676 5.108 29.568 3 24 3 16.318 3 9.65 7.337 6.306 14.691z"/>
                      <path fill="#4CAF50" d="M24 43c5.083 0 9.64-1.953 13.117-5.118l-6.052-4.953C29.068 34.373 26.677 35 24 35c-5.105 0-9.505-3.07-11.285-7.438l-6.59 5.08C8.438 38.556 15.646 43 24 43z"/>
                      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.073 3.137-3.386 5.617-6.238 6.929l.001-.001 6.052 4.953C36.85 41.52 44 37 44 23c0-1.333-.138-2.633-.389-3.917z"/>
                    </svg>
                    Continue with Google
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 p-4 bg-background-dark/50 backdrop-blur-sm">
            <div className="text-center text-sm text-secondary">
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
    </div>
  );
}
