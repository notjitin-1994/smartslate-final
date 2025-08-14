'use client';

import { useEffect } from 'react';

export default function OAuthCodeRouter() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const url = new URL(window.location.href);
      if (url.pathname === '/auth/callback') return;
      const code = url.searchParams.get('code');
      const hasOAuth = code || url.searchParams.get('error') || url.searchParams.get('error_description');
      if (!hasOAuth) return;

      const passthrough = ['code', 'state', 'error', 'error_description'] as const;
      const callback = new URL('/auth/callback', url.origin);
      for (const key of passthrough) {
        const v = url.searchParams.get(key);
        if (v) callback.searchParams.set(key, v);
      }
      const nextParams = new URLSearchParams(url.search);
      for (const key of passthrough) nextParams.delete(key);
      const nextStr = url.pathname + (nextParams.toString() ? `?${nextParams.toString()}` : '');
      callback.searchParams.set('next', nextStr || '/');
      window.location.replace(callback.toString());
    } catch {}
  }, []);
  return null;
}


