import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

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

  // 3) Intercept all Stack Auth sign-in routes and redirect to custom page
  if (
    pathname.includes('/handler/sign-in') ||
    pathname.includes('/handler/signin') ||
    pathname.includes('/handler/auth/sign-in') ||
    pathname.includes('/handler/auth/signin') ||
    pathname === '/handler' ||
    pathname === '/handler/'
  ) {
    if (pathname === '/handler/sign-in') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/handler/sign-in', request.url));
  }

  // 4) Intercept Stack Auth sign-up routes
  if (
    pathname.includes('/handler/sign-up') ||
    pathname.includes('/handler/signup') ||
    pathname.includes('/handler/auth/sign-up') ||
    pathname.includes('/handler/auth/signup')
  ) {
    if (pathname === '/handler/sign-up') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/handler/sign-up', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply to all paths so normalization is global; auth overrides still work
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|sw.js).*)'],
};
