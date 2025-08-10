'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@stackframe/stack';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  children: ReactNode;
}

// Stack-enabled guard (requires StackProvider to be mounted)
function StackAdminGuardClient({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorised, setAuthorised] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stackUser = useUser();

  useEffect(() => {
    async function check() {
      try {
        if (!stackUser) return;

        let token: string | null = null;
        try {
          const authData = await stackUser.getAuthJson().catch(async () => {
            return (stackUser as any).getAccessToken();
          });
          token = authData?.accessToken || authData?.token || null;
        } catch (e: any) {
          setError(`Failed to get Stack Auth token: ${e?.message ?? 'Unknown error'}`);
          return;
        }

        if (!token) {
          router.replace('/');
          return;
        }

        const res = await fetch('/api/auth/roles', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();

        if (data.ok && Array.isArray(data.roles) && data.roles.includes('owner')) {
          setAuthorised(true);
        } else {
          router.replace('/');
        }
      } catch (error: any) {
        setError(`Error checking admin permissions: ${error?.message ?? 'Unknown error'}`);
      } finally {
        setChecking(false);
      }
    }

    if (stackUser !== undefined) {
      check();
    }
  }, [stackUser, router]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Authentication Error</h2>
          <p className="mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Reload Page</button>
        </div>
      </div>
    );
  }

  if (stackUser === undefined || checking) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="text-center">
          <div className="mb-4">Checking permissions…</div>
          <div className="text-sm text-gray-400">Verifying admin access</div>
        </div>
      </div>
    );
  }

  if (!authorised) return null;
  return <>{children}</>;
}

// Fallback guard using local AuthContext (no StackProvider required)
function LocalAdminGuardClient({ children }: Props) {
  const router = useRouter();
  const { token, loading } = useAuth();
  const [checking, setChecking] = useState(true);
  const [authorised, setAuthorised] = useState(false);

  useEffect(() => {
    async function check() {
      if (loading) return;
      if (!token) {
        router.replace('/');
        return;
      }

      const res = await fetch('/api/auth/roles', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        router.replace('/');
        return;
      }

      const data = await res.json();
      if (data.ok && Array.isArray(data.roles) && data.roles.includes('owner')) {
        setAuthorised(true);
      } else {
        router.replace('/');
      }
      setChecking(false);
    }
    check();
  }, [token, loading, router]);

  if (loading || checking) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="text-center">
          <div className="mb-4">Checking permissions…</div>
          <div className="text-sm text-gray-400">Verifying admin access</div>
        </div>
      </div>
    );
  }

  if (!authorised) return null;
  return <>{children}</>;
}

export default function AdminAuthGuard({ children }: Props) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

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

  const stackEnabled = Boolean(
    process.env.NEXT_PUBLIC_STACK_PROJECT_ID &&
      process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
  );

  return stackEnabled ? (
    <StackAdminGuardClient>{children}</StackAdminGuardClient>
  ) : (
    <LocalAdminGuardClient>{children}</LocalAdminGuardClient>
  );
}
