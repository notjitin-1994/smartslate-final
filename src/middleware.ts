import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  // If OAuth provider redirected back with an auth code (or error) to a non-callback path,
  // forward to our dedicated callback page to complete the session exchange.
  const hasOAuthParams = url.searchParams.has('code') || url.searchParams.has('error') || url.searchParams.has('error_description');
  if (hasOAuthParams && pathname !== '/auth/callback') {
    const callbackUrl = new URL('/auth/callback', url);
    const passthrough = ['code', 'state', 'error', 'error_description'] as const;
    for (const key of passthrough) {
      const value = url.searchParams.get(key);
      if (value) callbackUrl.searchParams.set(key, value);
    }
    // Preserve original destination as `next`, excluding OAuth parameters
    const nextParams = new URLSearchParams(url.search);
    for (const key of passthrough) nextParams.delete(key);
    const nextStr = pathname + (nextParams.toString() ? `?${nextParams.toString()}` : '');
    callbackUrl.searchParams.set('next', nextStr || '/');
    return NextResponse.redirect(callbackUrl, 307);
  }

  // Bypass all redirects/normalization for localhost in any env to avoid HTTPS redirects in local dev
  const hostHeader = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const isLocalHost = hostHeader.startsWith('localhost') || hostHeader.startsWith('127.0.0.1') || hostHeader === '::1' || hostHeader.endsWith('.local');
  if (isLocalHost) {
    return NextResponse.next();
  }

  // 1) Canonical host normalization (production only)
  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto') || 'https';
    // Enforce HTTPS only (avoid host flips that can conflict with hosting provider canonicalization)
    if (proto === 'http') {
      const redirectUrl = new URL(url);
      redirectUrl.protocol = 'https:';
      return NextResponse.redirect(redirectUrl, 308);
    }

    // Optionally enforce a single canonical host if explicitly configured
    const configuredCanonicalHost = process.env.CANONICAL_HOST || (() => {
      try {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL;
        if (!appUrl) return '';
        const u = new URL(appUrl);
        return u.host;
      } catch {
        return '';
      }
    })();
    if (configuredCanonicalHost) {
      const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
      if (host && host !== configuredCanonicalHost) {
        const redirectUrl = new URL(url);
        redirectUrl.host = configuredCanonicalHost;
        return NextResponse.redirect(redirectUrl, 308);
      }
    }
  }

  // 2) Trailing slash normalization disabled to avoid conflicts with host/CDN rules

  // Removed Stack handler redirects

  return NextResponse.next();
}

export const config = {
  // Apply to all paths so normalization is global; auth overrides still work
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|sw.js).*)'],
};
