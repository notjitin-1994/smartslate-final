'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { containerVariants, itemVariants, shakeError } from '@/components/auth/animations';

function toB64(obj: unknown) {
  return btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export default function SignUpPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = 'First name is required';
    if (!form.lastName) e.lastName = 'Last name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password || form.password.length < 8) e.password = 'Must be at least 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return e;
  };

  const synthToken = (email: string) => {
    return `${toB64({ alg: 'none', typ: 'JWT' })}.${toB64({
      email,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    })}.`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    const v = validate();
    if (Object.values(v).some(Boolean)) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          company: form.company,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to create account');

      const token = synthToken(form.email);
      const fullName = `${form.firstName} ${form.lastName}`.trim();
      login(token, {
        id: Date.now(),
        full_name: fullName || form.email.split('@')[0] || 'User',
        email: form.email,
      });
      window.location.href = '/';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="min-h-[calc(100vh-88px)] flex items-center justify-center px-4 py-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md modal-content p-8"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-accent/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-secondary-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <Typography variant="h4" className="font-bold text-primary">Create your account</Typography>
          <Typography variant="body2" className="text-secondary mt-1">Join SmartSlate and unlock your potential</Typography>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby={submitError ? 'signup-error' : undefined}>
          <div className="grid grid-cols-2 gap-3">
            <motion.div variants={itemVariants}>
              <TextField
                label="First name"
                value={form.firstName}
                onChange={update('firstName')}
                fullWidth
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
                inputProps={{
                  'aria-invalid': !!errors.firstName,
                  'aria-describedby': errors.firstName ? 'firstName-error' : undefined,
                  id: 'firstName',
                  autoComplete: 'given-name',
                }}
                FormHelperTextProps={{ id: 'firstName-error' }}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <TextField
                label="Last name"
                value={form.lastName}
                onChange={update('lastName')}
                fullWidth
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
                inputProps={{
                  'aria-invalid': !!errors.lastName,
                  'aria-describedby': errors.lastName ? 'lastName-error' : undefined,
                  id: 'lastName',
                  autoComplete: 'family-name',
                }}
                FormHelperTextProps={{ id: 'lastName-error' }}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <TextField
              label="Company (optional)"
              value={form.company}
              onChange={update('company')}
              fullWidth
              inputProps={{ id: 'company', autoComplete: 'organization' }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={update('email')}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
              inputProps={{
                'aria-invalid': !!errors.email,
                'aria-describedby': errors.email ? 'email-error' : undefined,
                id: 'email',
                autoComplete: 'email',
              }}
              FormHelperTextProps={{ id: 'email-error' }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={update('password')}
              fullWidth
              required
              error={!!errors.password}
              helperText={errors.password || 'Must be at least 8 characters'}
              inputProps={{
                'aria-invalid': !!errors.password,
                'aria-describedby': (errors.password ? 'password-error ' : '') + 'password-hint',
                id: 'password',
                autoComplete: 'new-password',
              }}
              FormHelperTextProps={{ id: 'password-error' }}
            />
            <span id="password-hint" className="sr-only">Password must be at least 8 characters.</span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <TextField
              label="Confirm password"
              type="password"
              value={form.confirmPassword}
              onChange={update('confirmPassword')}
              fullWidth
              required
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              inputProps={{
                'aria-invalid': !!errors.confirmPassword,
                'aria-describedby': errors.confirmPassword ? 'confirmPassword-error' : undefined,
                id: 'confirmPassword',
                autoComplete: 'new-password',
              }}
              FormHelperTextProps={{ id: 'confirmPassword-error' }}
            />
          </motion.div>

          {submitError && (
            <motion.div variants={shakeError} initial="hidden" animate="visible">
              <div id="signup-error" aria-live="polite" className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{submitError}</p>
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={submitting} className="btn btn-primary">
              {submitting ? 'Creating account…' : 'Create Account'}
            </Button>
          </motion.div>
        </form>

        <div className="auth-divider mt-6"><span>or continue with</span></div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outlined" disabled className="opacity-75">Google</Button>
          <Button variant="outlined" disabled className="opacity-75">Apple</Button>
        </div>

        <Typography variant="body2" className="text-secondary mt-6 text-center">
          Already have an account? <Link className="text-primary-accent hover:text-primary-accent-light" href="/handler/sign-in">Sign in</Link>
        </Typography>
      </motion.div>
    </Box>
  );
}
