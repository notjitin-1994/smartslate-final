import { NextResponse } from 'next/server';
import { getSupabaseAnon } from '@/lib/supabase';

/**
 * POST /api/auth/signin
 *
 * Authenticates a user using Supabase email/password and returns a short-lived access token
 * along with minimal user profile for client storage.
 *
 * Request body:
 * ```json
 * { "email": "user@example.com", "password": "secret" }
 * ```
 *
 * Success response (200):
 * ```json
 * {
 *   "token": "<jwt>",
 *   "user": { "id": "uuid", "full_name": "User", "email": "user@example.com" }
 * }
 * ```
 *
 * Errors:
 * - 400: Missing email or password
 * - 401: Invalid credentials or no session returned
 * - 500: Supabase not configured or unexpected server error
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    if (!process.env.SUPABASE_URL || (!process.env.SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)) {
      console.error('Missing Supabase configuration:', {
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
      });
      return NextResponse.json({ error: 'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY and restart the dev server.' }, { status: 500 });
    }
    const supabase = getSupabaseAnon();
    console.log('Attempting sign-in for email:', email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Supabase sign-in error:', error);
      return NextResponse.json({ error: error?.message || 'Invalid credentials' }, { status: 401 });
    }
    if (!data.session) {
      console.error('No session returned from Supabase');
      return NextResponse.json({ error: 'Authentication failed - no session' }, { status: 401 });
    }

    return NextResponse.json({
      token: data.session.access_token,
      user: {
        id: data.user.id,
        full_name: (data.user.user_metadata?.full_name as string) || data.user.email?.split('@')[0] || 'User',
        email: data.user.email,
      },
    });
  } catch (e: any) {
    console.error('signin error:', e);
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}


