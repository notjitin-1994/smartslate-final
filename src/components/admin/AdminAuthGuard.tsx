'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  children: ReactNode;
}

// Stack-enabled guard (requires StackProvider to be mounted)
// Removed Stack-based guard as we are deprecating Stack/Auth backend
function StackAdminGuardClient({ children }: Props) {
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

  // Always use LocalAdminGuardClient now
  return <LocalAdminGuardClient>{children}</LocalAdminGuardClient>;
}
