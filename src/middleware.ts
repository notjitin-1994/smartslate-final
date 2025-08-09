import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Intercept all Stack Auth sign-in routes and redirect to custom page
  if (
    pathname.includes('/handler/sign-in') ||
    pathname.includes('/handler/signin') ||
    pathname.includes('/handler/auth/sign-in') ||
    pathname.includes('/handler/auth/signin') ||
    pathname === '/handler' ||
    pathname === '/handler/'
  ) {
    // If already on the custom sign-in page, don't redirect
    if (pathname === '/handler/sign-in') {
      return NextResponse.next();
    }
    
    // Redirect to custom sign-in page
    return NextResponse.redirect(new URL('/handler/sign-in', request.url));
  }
  
  // Intercept Stack Auth sign-up routes
  if (
    pathname.includes('/handler/sign-up') ||
    pathname.includes('/handler/signup') ||
    pathname.includes('/handler/auth/sign-up') ||
    pathname.includes('/handler/auth/signup')
  ) {
    // If already on the custom sign-up page, don't redirect
    if (pathname === '/handler/sign-up') {
      return NextResponse.next();
    }
    
    // Redirect to custom sign-up page
    return NextResponse.redirect(new URL('/handler/sign-up', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/handler/:path*',
};
