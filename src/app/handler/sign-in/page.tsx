'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TextField, Button, Box, Typography } from '@mui/material';
import { containerVariants, itemVariants } from '@/components/auth/animations';
import { StackClientApp } from '@stackframe/stack';

const app = new StackClientApp({
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
  redirectMethod: 'nextjs',
  tokenStore: 'nextjs-cookie',
});

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const continueWithStack = async () => {
    try {
      setBusy(true);
      setErr('');
      await app.redirectToSignIn();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unable to start sign-in';
      setErr(msg);
      setBusy(false);
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <Typography variant="h4" className="font-bold text-primary">Welcome back</Typography>
          <Typography variant="body2" className="text-secondary mt-1">Sign in to continue your learning journey</Typography>
        </div>

        <div className="space-y-4" aria-describedby={err ? 'signin-error' : undefined}>
          <motion.div variants={itemVariants}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              placeholder="you@example.com"
              inputProps={{ id: 'signin-email', autoComplete: 'email' }}
            />
          </motion.div>

          {err && (
            <div id="signin-error" aria-live="polite" className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{err}</p>
            </div>
          )}

          <motion.div variants={itemVariants}>
            <Button onClick={continueWithStack} variant="contained" color="primary" fullWidth disabled={busy} className="btn btn-primary">
              {busy ? 'Redirecting…' : 'Continue with SmartSlate Sign-In'}
            </Button>
          </motion.div>
        </div>

        <div className="auth-divider mt-6"><span>or</span></div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outlined" disabled className="opacity-75">Google</Button>
          <Button variant="outlined" disabled className="opacity-75">Apple</Button>
        </div>

        <Typography variant="body2" className="text-secondary mt-6 text-center">
          New here? <Link className="text-primary-accent hover:text-primary-accent-light" href="/handler/sign-up">Create an account</Link>
        </Typography>
      </motion.div>
    </Box>
  );
}
