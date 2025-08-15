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
        // After password sign-in, check if first login and redirect to profile page
        try {
          // Decode JWT payload to read user_metadata flag
          const parts = String(json.token).split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            const hasSeen = Boolean((payload?.user_metadata || {}).has_seen_profile_prompt);
            if (!hasSeen) {
              await fetch('/api/auth/first-login', { method: 'POST', headers: { Authorization: `Bearer ${json.token}` } });
              // Close the modal quickly and navigate
              setTimeout(() => {
                window.location.assign('/profile?first=1');
              }, 50);
            }
          }
        } catch {}
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
        // If dev bypass returned a session, log in and redirect to profile first-visit
        if (json?.token && json?.user) {
          login(json.token, json.user);
          try {
            const parts = String(json.token).split('.');
            if (parts.length === 3) {
              const payload = JSON.parse(atob(parts[1]));
              const hasSeen = Boolean((payload?.user_metadata || {}).has_seen_profile_prompt);
              if (!hasSeen) {
                await fetch('/api/auth/first-login', { method: 'POST', headers: { Authorization: `Bearer ${json.token}` } });
              }
            }
          } catch {}
          setIsSuccess(true);
          setTimeout(() => {
            // Navigate after short success animation
            window.location.assign('/profile?first=1');
          }, 300);
        } else {
          // Standard flow (email verification)
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

  const SocialButton = ({ provider, onClick, disabled = false, comingSoon = false }: { provider: 'google' | 'facebook' | 'microsoft' | 'linkedin' | 'github' | 'sso'; onClick: () => void; disabled?: boolean; comingSoon?: boolean }) => {
    const labels: Record<string, string> = {
      google: 'Continue with Google',
      facebook: 'Continue with Facebook',
      microsoft: 'Continue with Microsoft',
      linkedin: 'Continue with LinkedIn',
      github: 'Continue with GitHub',
      sso: 'Continue with SSO',
    };

    const Logo = () => {
      switch (provider) {
        case 'google':
          return (
            <svg viewBox="0 0 48 48" className="w-6 h-6" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.551 31.91 29.137 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C34.676 5.108 29.568 3 24 3 12.955 3 4 11.955 4 23s8.955 20 20 20 20-8.955 20-20c0-1.333-.138-2.633-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.818C14.411 16.367 18.878 13 24 13c3.059 0 5.842 1.153 7.957 3.043l5.657-5.657C34.676 5.108 29.568 3 24 3 16.318 3 9.65 7.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 43c5.083 0 9.64-1.953 13.117-5.118l-6.052-4.953C29.068 34.373 26.677 35 24 35c-5.105 0-9.505-3.07-11.285-7.438l-6.59 5.08C8.438 38.556 15.646 43 24 43z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.073 3.137-3.386 5.617-6.238 6.929l.001-.001 6.052 4.953C36.85 41.52 44 37 44 23c0-1.333-.138-2.633-.389-3.917z"/>
            </svg>
          );
        case 'facebook':
          return (
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true"><path fill="#1877F2" d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061C2 17.084 5.657 21.245 10.438 22v-6.996H7.898v-2.943h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.47h-1.261c-1.242 0-1.63.776-1.63 1.571v1.882h2.773l-.443 2.943h-2.33V22C18.343 21.245 22 17.084 22 12.061z"/></svg>
          );
        case 'microsoft':
          return (
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
              <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
              <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
              <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
              <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
            </svg>
          );
        case 'linkedin':
          return (
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.604 0 4.269 2.372 4.269 5.456v6.287zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM6.96 20.452H3.713V9H6.96v11.452z"/></svg>
          );
        case 'github':
          return (
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true"><path fill="#FFFFFF" d="M12 .5C5.73.5.95 5.28.95 11.55c0 4.86 3.15 8.98 7.52 10.43.55.1.76-.24.76-.54 0-.26-.01-.94-.01-1.84-3.06.67-3.71-1.31-3.71-1.31-.5-1.27-1.22-1.6-1.22-1.6-.99-.68.07-.66.07-.66 1.1.08 1.68 1.13 1.68 1.13.97 1.66 2.55 1.18 3.18.9.1-.7.38-1.18.69-1.45-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.17 1.13-2.94-.11-.28-.49-1.42.11-2.96 0 0 .93-.3 3.04 1.12a10.5 10.5 0 015.54 0c2.11-1.42 3.04-1.12 3.04-1.12.6 1.54.22 2.68.11 2.96.7.77 1.13 1.74 1.13 2.94 0 4.23-2.58 5.15-5.04 5.42.39.34.74 1.01.74 2.04 0 1.47-.01 2.65-.01 3.01 0 .3.2.65.77.54 4.36-1.45 7.5-5.57 7.5-10.43C23.05 5.28 18.27.5 12 .5z"/></svg>
          );
        case 'sso':
          return (
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true"><path fill="#a7dadb" d="M12 1a5 5 0 00-5 5v3H5a1 1 0 000 2h2v9a1 1 0 001 1h8a1 1 0 001-1V11h2a1 1 0 000-2h-2V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z"/></svg>
          );
      }
    };

    const label = labels[provider] + (comingSoon ? ' (coming soon)' : '');

    return (
      <button
        type="button"
        className={`relative w-full aspect-[5/2] rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-accent/30'}`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled}
        title={comingSoon ? 'Coming soon' : labels[provider]}
        aria-label={label}
      >
        {comingSoon && (
          <span className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-secondary uppercase tracking-wide">Coming soon</span>
        )}
        <span className="sr-only">{label}</span>
        <Logo />
      </button>
    );
  };

  const initialFocusSelector = activeTab === 'signin' ? '#signin-email' : '#signup-name';

  const startGoogleOAuth = async () => {
    try {
      setIsSubmitting(true);
      const supabase = getSupabaseBrowser();
      const origin = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
      const redirectTo = `${origin}/auth/callback`;
      
      console.log('Starting Google OAuth with redirectTo:', redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          // Let Supabase handle the redirect to reliably persist PKCE code_verifier
        },
      } as any);
      
      if (error) {
        console.error('Google OAuth error:', error);
        throw error;
      }
      
      // If SDK returns a URL in some environments, follow it; otherwise it will redirect automatically
      const url = data?.url;
      if (url) window.location.assign(url);
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
                      <p id="auth-modal-subtitle" className="text-secondary text-sm">Sign in or create your Smartslate account</p>
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

                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  <SocialButton provider="google" onClick={startGoogleOAuth} />
                  <SocialButton provider="facebook" onClick={() => {}} disabled comingSoon />
                  <SocialButton provider="microsoft" onClick={() => {}} disabled comingSoon />
                  <SocialButton provider="linkedin" onClick={() => {}} disabled comingSoon />
                  <SocialButton provider="github" onClick={() => {}} disabled comingSoon />
                  <SocialButton provider="sso" onClick={() => {}} disabled comingSoon />
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

                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  <SocialButton provider="google" onClick={startGoogleOAuth} />
                  <SocialButton provider="facebook" onClick={() => {}} disabled comingSoon />
                  <SocialButton provider="microsoft" onClick={() => {}} disabled comingSoon />
                  <SocialButton provider="linkedin" onClick={() => {}} disabled comingSoon />
                  <SocialButton provider="github" onClick={() => {}} disabled comingSoon />
                  <SocialButton provider="sso" onClick={() => {}} disabled comingSoon />
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


