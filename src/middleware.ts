import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

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
    const configuredCanonicalHost = process.env.CANONICAL_HOST;
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
