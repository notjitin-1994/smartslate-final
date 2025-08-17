'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/** Represents the authenticated user profile stored on the client. */
interface User {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
}

/** Context value exposed by `AuthProvider`. */
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  /** Programmatically sign a user in and persist credentials in localStorage. */
  login: (token: string, user: User) => void;
  /** Sign out the current user, clear storage, and call the server signout API. */
  logout: () => void;
  /** Indicates whether initial auth state hydration is in progress. */
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides client-side authentication state and helpers.
 *
 * - On mount, hydrates auth state from `localStorage` if a JWT is present and not expired.
 * - Persists `auth_token` and `auth_user` to `localStorage` on login.
 * - Calls `/api/auth/signout` on logout (best-effort).
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (storedToken && storedUser && isTokenValid(storedToken)) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setToken(storedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {}
    }
    setLoading(false);
  }, []);

  /** Returns true if the JWT is a well-formed token with a future `exp` claim. */
  const isTokenValid = (token: string): boolean => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Date.now() / 1000;
      return typeof payload.exp === 'number' && payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  /** Sign-in helper that stores token and user in memory and localStorage. */
  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
  };

  /** Clears auth state and attempts a best-effort server signout. */
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    fetch('/api/auth/signout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication state and helpers.
 * Must be used within an `AuthProvider`.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
