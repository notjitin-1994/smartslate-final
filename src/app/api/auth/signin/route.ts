import { NextResponse } from 'next/server';
import { getSupabaseAnon } from '@/lib/supabase';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: 'Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY and restart the dev server.' }, { status: 500 });
    }
    const supabase = getSupabaseAnon();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) return NextResponse.json({ error: error?.message || 'Invalid credentials' }, { status: 401 });

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


