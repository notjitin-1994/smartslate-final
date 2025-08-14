import { NextResponse } from 'next/server';
import { getSupabaseAnon, getSupabaseService } from '@/lib/supabase';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const rawName = (body?.name ?? '') as string;
  const rawEmail = (body?.email ?? '') as string;
  const rawPassword = (body?.password ?? '') as string;

  const name = rawName.trim();
  const email = rawEmail.trim().toLowerCase();
  const password = rawPassword;

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
  }

  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: 'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY and restart the dev server.' }, { status: 500 });
    }
    const origin = (req.headers.get('origin') || '').trim() || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const allowBypass = (process.env.NODE_ENV !== 'production' && !!process.env.SUPABASE_SERVICE_ROLE_KEY) || process.env.AUTH_ALLOW_DEV_BYPASS === '1';

    if (allowBypass) {
      // Dev-friendly flow: create confirmed user using service role, bypassing email confirmation.
      try {
        const admin = getSupabaseService();
        const { data: created, error: adminErr } = await admin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { full_name: name },
        });
        if (adminErr || !created.user) {
          return NextResponse.json({ error: adminErr?.message || 'Could not create user' }, { status: 400 });
        }
        // Optional: auto-sign in to return same UX as normal sign up + verify
        const anon = getSupabaseAnon();
        const { data: sessionData, error: signInErr } = await anon.auth.signInWithPassword({ email, password });
        if (signInErr || !sessionData.session) {
          // If auto-signin fails, still return success so user can sign in manually.
          return NextResponse.json({ message: 'Account created (dev). You can now sign in.' });
        }
        return NextResponse.json({
          message: 'Account created (dev). You are signed in.',
          token: sessionData.session.access_token,
          user: {
            id: sessionData.user.id,
            full_name: (sessionData.user.user_metadata?.full_name as string) || sessionData.user.email?.split('@')[0] || 'User',
            email: sessionData.user.email,
          },
        });
      } catch (e: any) {
        console.error('admin signup error:', e);
        // Fallthrough to normal signUp
      }
    }

    // Standard flow: require email verification
    const anon = getSupabaseAnon();
    const { data, error } = await anon.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: origin,
      },
    });
    if (error || !data.user) return NextResponse.json({ error: error?.message || 'Could not sign up' }, { status: 400 });

    return NextResponse.json({ message: 'Signup successful. Check your email to verify your account.' });
  } catch (e: any) {
    console.error('signup error:', e);
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}


