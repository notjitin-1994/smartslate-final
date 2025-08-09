'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

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
 * • Expects the `auth_token` (mock JWT generated in StackProvider) to be stored
 *   in localStorage. The token is attached as a Bearer header so backend route
 *   handlers can evaluate permissions.
 * • If the user is not authorised, we push them back to the home page.
 */
export default function AdminAuthGuard({ children }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorised, setAuthorised] = useState(false);

  useEffect(() => {
    async function check() {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        const res = await fetch('/api/auth/roles', {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        const data = await res.json();

        if (data.ok && Array.isArray(data.roles) && data.roles.includes('owner')) {
          setAuthorised(true);
        } else {
          router.replace('/');
        }
      } catch {
        router.replace('/');
      } finally {
        setChecking(false);
      }
    }

    check();
    // We intentionally do NOT include router in deps to avoid re-running on route changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Checking permissions…
      </div>
    );
  }

  if (!authorised) return null; // Redirecting

  return <>{children}</>;
}
