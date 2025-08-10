'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@stackframe/stack';

interface Props {
  children: ReactNode;
}

/**
 * Guards the admin area by ensuring the current user has the `owner` role.
 *
 * Implementation notes:
 * • Makes a POST request to /api/auth/roles which returns the roles of the
 *   currently authenticated user from the database. The POST route also
 *   ensures default roles are seeded, so it is the safest endpoint to hit.
 * • Gets the Stack Auth token from the useUser hook and attaches it as a Bearer header
 *   so backend route handlers can evaluate permissions.
 * • If the user is not authorised, we push them back to the home page.
 */
export default function AdminAuthGuard({ children }: Props) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authorised, setAuthorised] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Only call useUser() on the client side to avoid SSR issues
  const [stackUser, setStackUser] = useState<any>(undefined);

  // Ensure we're on the client side and get Stack Auth user
  useEffect(() => {
    setIsClient(true);
    
    // Import and use useUser only on the client side
    const { useUser } = require('@stackframe/stack');
    const user = useUser();
    setStackUser(user);
  }, []);

  // Immediate debugging
  if (isClient) {
    console.log('🔍 AdminAuthGuard: Component mounted on client');
    console.log('🔍 AdminAuthGuard: stackUser value:', stackUser);
    console.log('🔍 AdminAuthGuard: stackUser type:', typeof stackUser);
    console.log('🔍 AdminAuthGuard: stackUser === undefined:', stackUser === undefined);
    console.log('🔍 AdminAuthGuard: stackUser === null:', stackUser === null);
  }

  useEffect(() => {
    if (!isClient) return; // Don't run on server side
    
    console.log('🔍 AdminAuthGuard: useEffect triggered');
    console.log('🔍 AdminAuthGuard: stackUser in useEffect:', stackUser);
    
    async function check() {
      try {
        console.log('🔍 AdminAuthGuard: Starting permission check...');
        
        // Wait for Stack Auth user to be loaded
        if (!stackUser) {
          console.log('⏳ AdminAuthGuard: Waiting for Stack Auth user to load...');
          return; // Don't redirect yet, wait for user to load
        }

        console.log('✅ AdminAuthGuard: Stack Auth user found:', {
          email: stackUser.primaryEmail,
          id: stackUser.id,
          displayName: stackUser.displayName
        });

        // Get the Stack Auth token
        let token: string | null = null;
        try {
          console.log('🔑 AdminAuthGuard: Attempting to get Stack Auth token...');
          
          // Try multiple ways to get the token
          let authData;
          try {
            authData = await stackUser.getAuthJson();
            console.log('✅ AdminAuthGuard: getAuthJson() succeeded');
          } catch (error) {
            console.log('⚠️ AdminAuthGuard: getAuthJson() failed, trying alternative method...');
            // Try alternative method if getAuthJson fails
            try {
              authData = await (stackUser as any).getAccessToken();
              console.log('✅ AdminAuthGuard: getAccessToken() succeeded');
            } catch (altError) {
              console.error('❌ AdminAuthGuard: Both token methods failed:', { getAuthJson: error, getAccessToken: altError });
              throw error;
            }
          }
          
          token = authData.accessToken || authData.token;
          console.log('✅ AdminAuthGuard: Got Stack Auth token:', token ? `Token received (${token.substring(0, 20)}...)` : 'No token');
        } catch (error) {
          console.error('❌ AdminAuthGuard: Failed to get Stack Auth token:', error);
          setError(`Failed to get Stack Auth token: ${error instanceof Error ? error.message : 'Unknown error'}`);
          return;
        }

        if (!token) {
          console.log('❌ AdminAuthGuard: No Stack Auth token available, redirecting to home');
          router.replace('/');
          return;
        }

        // Check roles with the token
        console.log('📡 AdminAuthGuard: Calling /api/auth/roles with token...');
        const res = await fetch('/api/auth/roles', {
          method: 'POST',
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        console.log('📡 AdminAuthGuard: Roles API response status:', res.status, res.statusText);
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error('❌ AdminAuthGuard: Roles API error response:', errorText);
          throw new Error(`Roles API returned ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        console.log('📡 AdminAuthGuard: Roles API response data:', data);

        if (data.ok && Array.isArray(data.roles) && data.roles.includes('owner')) {
          console.log('✅ AdminAuthGuard: User has owner role, granting admin access');
          setAuthorised(true);
        } else {
          console.log('❌ AdminAuthGuard: User does not have owner role, redirecting to home');
          console.log('  - data.ok:', data.ok);
          console.log('  - data.roles:', data.roles);
          console.log('  - includes owner:', data.roles?.includes('owner'));
          router.replace('/');
        }
      } catch (error) {
        console.error('❌ AdminAuthGuard: Error checking admin permissions:', error);
        setError(`Error checking admin permissions: ${error instanceof Error ? error.message : 'Unknown error'}`);
        // Don't redirect immediately, show error instead
      } finally {
        setChecking(false);
      }
    }

    // Only run the check when stackUser changes and is not null
    if (stackUser !== undefined) {
      check();
    }
    // We intentionally do NOT include router in deps to avoid re-running on route changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackUser, isClient]);

  // Show loading while waiting for client-side hydration
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="text-center">
          <div className="mb-4">Loading...</div>
          <div className="text-sm text-gray-400">Initializing</div>
        </div>
      </div>
    );
  }

  // Show error if something went wrong
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Authentication Error</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Show loading while waiting for Stack Auth user
  if (stackUser === undefined) {
    console.log('🔍 AdminAuthGuard: Showing "Loading Stack Auth..."');
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="text-center">
          <div className="mb-4">Loading Stack Auth...</div>
          <div className="text-sm text-gray-400">This may take a few seconds</div>
        </div>
      </div>
    );
  }

  if (checking) {
    console.log('🔍 AdminAuthGuard: Showing "Checking permissions..."');
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="text-center">
          <div className="mb-4">Checking permissions…</div>
          <div className="text-sm text-gray-400">Verifying admin access</div>
        </div>
      </div>
    );
  }

  if (!authorised) {
    console.log('🔍 AdminAuthGuard: Not authorised, returning null (redirecting)');
    return null; // Redirecting
  }

  console.log('🔍 AdminAuthGuard: Rendering children (authorised)');
  return <>{children}</>;
}
