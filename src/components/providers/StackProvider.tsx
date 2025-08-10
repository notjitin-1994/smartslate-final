'use client';

import { StackProvider, StackClientApp, useUser } from '@stackframe/stack';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, Suspense } from 'react';

function StackAuthSyncInner({ children }: { children: React.ReactNode }) {
  const stackUser = useUser();
  const { login, logout, user } = useAuth();

  useEffect(() => {
    // Only sync if there's a mismatch between Stack Auth and our AuthContext
    if (stackUser && (!user || user.email !== stackUser.primaryEmail)) {
      // Ensure user exists in our database
      const syncUserToDatabase = async () => {
        try {
          const response = await fetch('/api/auth/verify-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: stackUser.primaryEmail,
              name: stackUser.displayName || null,
              company: null, // Stack Auth doesn't provide company info
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            console.error('Failed to sync user to database:', errorData);
            // Alert user that there's a sync issue
            if (typeof window !== 'undefined') {
              console.error(`Database sync failed for ${stackUser.primaryEmail}. Please contact support if issues persist.`);
            }
          } else {
            const userData = await response.json();
            console.log('User verified/synced in database:', userData);
          }
        } catch (error) {
          console.error('Error syncing user to database:', error);
        }
      };

      // Sync to database first, then update auth context
      syncUserToDatabase();

      // Obtain a real token from Stack (if available) and sync AuthContext
      const getIdToken = async (): Promise<string | null> => {
        try {
          const su = stackUser as unknown as { getIdToken?: () => Promise<string> };
          if (typeof su?.getIdToken === 'function') {
            const token = await su.getIdToken();
            return typeof token === 'string' ? token : null;
          }
        } catch (e) {
          console.error('Failed to get Stack ID token', e);
        }
        return null;
      };

      getIdToken().then((idToken) => {
        if (idToken) {
          login(idToken, {
            id: Date.now(),
            full_name: stackUser.displayName || stackUser.primaryEmail?.split('@')[0] || 'User',
            email: stackUser.primaryEmail || '',
          });
        } else {
          console.warn('No Stack ID token available; skipping local AuthContext login');
        }
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
  // Check if Stack environment variables are available
  const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
  const publishableKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY;

  if (!projectId || !publishableKey) {
    console.warn('Stack Auth environment variables not found. Stack Auth features will be disabled.');
    return <>{children}</>;
  }

  const app = new StackClientApp({
    projectId,
    publishableClientKey: publishableKey,
    redirectMethod: 'nextjs',
    tokenStore: 'nextjs-cookie',
    signInUrl: '/handler/sign-in',
    signUpUrl: '/handler/sign-up',
  });

  return (
    <StackProvider app={app}>
      <StackAuthSync>
        {children}
      </StackAuthSync>
    </StackProvider>
  );
}


