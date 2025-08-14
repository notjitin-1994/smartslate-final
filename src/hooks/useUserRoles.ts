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
  const [roles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const hasRole = (_role: string): boolean => false;
  const isOwner = false;
  useEffect(() => {
    setLoading(false);
  }, []);
  return { roles, hasRole, isOwner, loading };
}


