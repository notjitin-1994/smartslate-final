'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useGetStartedModal } from '@/hooks/useGetStartedModal';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { closeModal } = useGetStartedModal();

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      router.push('/?auth_error=' + encodeURIComponent(error));
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        login(token, user);
        closeModal();
        router.push('/');
      } catch (err) {
        console.error('Error parsing user data:', err);
        router.push('/?auth_error=' + encodeURIComponent('Invalid authentication data'));
      }
    } else {
      console.error('Missing token or user data');
      router.push('/?auth_error=' + encodeURIComponent('Authentication failed'));
    }
  }, [searchParams, login, closeModal, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <div className="absolute inset-0 bg-primary-accent/20 rounded-full blur-xl" />
          <div className="relative w-full h-full bg-gradient-to-br from-primary-accent to-secondary-accent rounded-full flex items-center justify-center">
            <svg className="animate-spin w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-primary mb-2">Completing authentication...</h2>
        <p className="text-secondary">Please wait while we log you in.</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-primary-accent/20 rounded-full blur-xl" />
            <div className="relative w-full h-full bg-gradient-to-br from-primary-accent to-secondary-accent rounded-full flex items-center justify-center">
              <svg className="animate-spin w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">Loading...</h2>
          <p className="text-secondary">Please wait.</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
