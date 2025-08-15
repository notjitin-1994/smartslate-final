import { NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';
import { verifyJwt } from '@/lib/auth';

// Marks the current user as having seen the first-login profile prompt.
// Requires Authorization: Bearer <access_token> header.
export async function POST(req: Request) {
  try {
    const auth = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const [scheme, token] = auth.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyJwt(token);
    const userId = (payload.sub as string) || null;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.SUPABASE_URL) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const admin = getSupabaseService();
    // Mark in user_metadata; using user_metadata so it rides on JWT for future logins
    await admin.auth.admin.updateUserById(userId, {
      user_metadata: { has_seen_profile_prompt: true },
    });

    return NextResponse.json({ ok: true, has_seen_profile_prompt: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}


