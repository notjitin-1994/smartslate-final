'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AuthLayoutClientProps {
  children: React.ReactNode;
}

/**
 * Client-side wrapper for Stack Auth pages.
 * - Provides on-brand shell with glassmorphic background and gradient orbs
 * - Adds Framer Motion entrance transitions and focus ring management
 * - Ensures accessible structure, skip link, and responsive layout at 360 / 768 / 1024+ px
 */
export default function AuthLayoutClient({ children }: AuthLayoutClientProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
      {/* Skip link for keyboard users */}
      <a href="#auth-main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:bg-background-surface focus:text-text-primary focus:px-4 focus:py-2 focus:rounded-md">
        Skip to authentication
      </a>

      {/* Animated brand background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary-accent/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="absolute -bottom-56 -right-40 h-[28rem] w-[28rem] rounded-full bg-secondary-accent/10 blur-3xl"
        />
      </div>

      {/* Shell: Left brand panel + Right auth content */}
      <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Brand panel (hidden on smallest screens when space is tight) */}
        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden h-full md:flex md:flex-col md:justify-between glass-effect-strong rounded-2xl p-6 md:p-8 border border-border text-text-secondary"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" width={36} height={36} alt="SmartSlate logo" priority />
              <span className="font-quicksand text-xl text-text-primary">SmartSlate</span>
            </div>
            <h2 className="font-quicksand text-2xl md:text-3xl text-text-primary mb-2">
              Build your future-ready workforce
            </h2>
            <p className="text-sm md:text-base text-text-secondary/90">
              Learn by doing, track real outcomes, and unlock growth with an elegant learning experience.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-brand-primary" />
              <span>Secure by design with Neon Auth</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-brand-secondary" />
              <span>WCAG-friendly and keyboard accessible</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-text-secondary" />
              <span>Seamless on mobile, tablet, and desktop</span>
            </div>
          </div>

          <div className="mt-8 text-sm">
            <span className="text-text-secondary">Need help? </span>
            <Link href="/collaborate" className="text-primary-accent hover:text-primary-accent-light font-semibold">
              Contact us
            </Link>
          </div>
        </motion.aside>

        {/* Auth container (Stack UI lives inside) */}
        <motion.main
          id="auth-main"
          role="main"
          aria-label="Authentication"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="glass-effect-strong rounded-2xl p-5 sm:p-6 md:p-8 border border-border shadow-[var(--shadow-xl)]"
        >
          {/* The Stack Auth handler will render the sign-in/sign-up forms here. */}
          {children}
        </motion.main>
      </div>
    </div>
  );
}


