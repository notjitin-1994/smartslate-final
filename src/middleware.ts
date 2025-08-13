import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  // 1) Canonical host normalization (production only)
  if (process.env.NODE_ENV === 'production') {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
    const proto = request.headers.get('x-forwarded-proto') || 'https';
    const isWww = host.startsWith('www.');
    const isHttp = proto === 'http';

    if (isWww || isHttp) {
      const nextHost = host.replace(/^www\./, '');
      const redirectUrl = new URL(url);
      redirectUrl.host = nextHost;
      redirectUrl.protocol = 'https:';
      return NextResponse.redirect(redirectUrl, 308);
    }
  }

  // 2) Trailing slash normalization (except root and file-like paths)
  if (
    pathname.length > 1 &&
    pathname.endsWith('/') &&
    !pathname.match(/\.[a-zA-Z0-9]{2,}$/)
  ) {
    const redirectUrl = new URL(url);
    redirectUrl.pathname = pathname.replace(/\/+$/, '');
    return NextResponse.redirect(redirectUrl, 308);
  }

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
