'use client';

import { StackProvider, StackClientApp, useUser } from '@stackframe/stack';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState, Suspense } from 'react';

function StackAuthSyncInner({ children }: { children: React.ReactNode }) {
  const stackUser = useUser();
  const { login, logout, user } = useAuth();

  useEffect(() => {
    // Only sync if there's a mismatch between Stack Auth and our AuthContext
    if (stackUser && (!user || user.email !== stackUser.primaryEmail)) {
      // Ensure user exists in our database
      const syncUserToDatabase = async () => {
        try {
          const nameParts = stackUser.displayName?.split(' ') || [];
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: stackUser.primaryEmail,
              firstName: nameParts[0] || null,
              lastName: nameParts.slice(1).join(' ') || null,
              company: null, // Stack Auth doesn't provide company info
            }),
          });
          
          if (!response.ok) {
            console.error('Failed to sync user to database:', await response.text());
          }
        } catch (error) {
          console.error('Error syncing user to database:', error);
        }
      };

      // Sync to database first, then update auth context
      syncUserToDatabase();

      // Sync Stack Auth user with our AuthContext
      const mockToken = btoa(JSON.stringify({
        alg: 'none',
        typ: 'JWT'
      })) + '.' + btoa(JSON.stringify({
        email: stackUser.primaryEmail || '',
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
      })) + '.';

      login(mockToken, {
        id: Date.now(),
        full_name: stackUser.displayName || stackUser.primaryEmail?.split('@')[0] || 'User',
        email: stackUser.primaryEmail || '',
      });
    } else if (!stackUser && user) {
      // User logged out from Stack Auth, sync with our context
      logout();
    }
  }, [stackUser, user, login, logout]);

  return <>{children}</>;
}

function StackAuthSync({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <StackAuthSyncInner>{children}</StackAuthSyncInner>
    </Suspense>
  );
}

export default function AuthStackProvider({ children }: { children: React.ReactNode }) {
  const app = new StackClientApp({
    projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
    publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
    redirectMethod: 'nextjs',
    tokenStore: 'nextjs-cookie',
  });

  return (
    <StackProvider app={app}>
      <StackAuthSync>
        {children}
      </StackAuthSync>
    </StackProvider>
  );
}


