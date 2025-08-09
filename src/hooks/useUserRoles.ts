'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UseUserRolesResult {
  roles: string[];
  hasRole: (role: string) => boolean;
  isOwner: boolean;
  loading: boolean;
}

export function useUserRoles(): UseUserRolesResult {
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    async function fetchRoles() {
      if (!isAuthenticated || !token) {
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/roles', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.ok && Array.isArray(data.roles)) {
          setRoles(data.roles);
        } else {
          setRoles([]);
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRoles();
  }, [isAuthenticated, token]);

  const hasRole = (role: string): boolean => {
    return roles.includes(role);
  };

  const isOwner = hasRole('owner');

  return {
    roles,
    hasRole,
    isOwner,
    loading,
  };
}


