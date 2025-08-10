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
      console.log('🔄 Stack Auth sync triggered for:', stackUser.primaryEmail);
      
      // Ensure user exists in our database
      const syncUserToDatabase = async () => {
        try {
          console.log('=== STACK SYNC START ===');
          console.log('Syncing user to database:', {
            email: stackUser.primaryEmail,
            name: stackUser.displayName,
            stackAuthId: stackUser.id,
            timestamp: new Date().toISOString()
          });

          // Add a small delay to ensure Stack Auth is fully ready
          await new Promise(resolve => setTimeout(resolve, 100));

          const response = await fetch('/api/auth/verify-user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: stackUser.primaryEmail,
              name: stackUser.displayName || null,
              company: null, // Stack Auth doesn't provide company info
              stackAuthId: stackUser.id, // Pass Stack Auth user ID
            }),
          });
          
          console.log('📡 Verify-user API response:', {
            status: response.status,
            ok: response.ok,
            statusText: response.statusText
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            console.error('❌ STACK SYNC FAILED - Database sync failed:', {
              status: response.status,
              error: errorData,
              email: stackUser.primaryEmail
            });
            // Don't show error to user for now, just log it
            console.warn(`Database sync failed for ${stackUser.primaryEmail}. This might be normal for new users.`);
          } else {
            const userData = await response.json();
            console.log('✅ STACK SYNC SUCCESS - User verified/synced in database:', userData);
          }
        } catch (error) {
          console.error('❌ STACK SYNC ERROR - Error syncing user to database:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            email: stackUser.primaryEmail,
            timestamp: new Date().toISOString()
          });
          // Don't show error to user for now, just log it
          console.warn(`Database sync error for ${stackUser.primaryEmail}. This might be normal for new users.`);
        }
      };

      // Sync to database first, then update auth context
      syncUserToDatabase();

      // Obtain a real token from Stack (if available) and sync AuthContext
      const getAccessToken = async (): Promise<string | null> => {
        try {
          console.log('🔑 Attempting to get Stack access token...');
          const authData = await stackUser.getAuthJson();
          console.log('✅ Stack auth data acquired:', authData.accessToken ? 'Access token received' : 'No access token');
          return authData.accessToken;
        } catch (e) {
          console.error('❌ Failed to get Stack access token:', e);
        }
        return null;
      };

      getAccessToken().then((accessToken) => {
        if (accessToken) {
          console.log('🎯 Logging in to AuthContext with Stack access token');
          login(accessToken, {
            id: Date.now(),
            full_name: stackUser.displayName || stackUser.primaryEmail?.split('@')[0] || 'User',
            email: stackUser.primaryEmail || '',
          });
        } else {
          console.warn('⚠️ No Stack access token available; skipping local AuthContext login');
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
    urls: {
      signIn: '/handler/sign-in',
      signUp: '/handler/sign-up',
    },
  });

  return (
    <StackProvider app={app}>
      <StackAuthSync>
        {children}
      </StackAuthSync>
    </StackProvider>
  );
}


