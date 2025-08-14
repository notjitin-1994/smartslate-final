import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSupabaseService } from '@/lib/supabase';
import { UpdateProfileSchema } from '@/lib/validators/user';
import { verifyJwt } from '@/lib/auth';

// GET returns the current profile (merging auth metadata + db profile)
export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const [scheme, token] = auth.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJwt(token);
    const userId = (payload.sub as string) || null;
    const email = (payload.email as string) || null;
    const fullNameMeta = (payload["user_metadata"] as any)?.full_name as string | undefined;
    if (!userId || !email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = getDb();
    const { rows } = await db.query(
      `SELECT user_id, full_name, company, phone, bio, location, website, twitter, linkedin, github, avatar_url, avatar_path
       FROM app.user_profiles WHERE user_id = $1`,
      [userId]
    );
    const profile = rows[0] || null;

    return NextResponse.json({
      user: { id: userId, email, full_name: fullNameMeta || email.split('@')[0] },
      profile,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}

// PUT updates profile fields in Postgres and optionally Supabase auth metadata name
export async function PUT(req: NextRequest) {
  try {
    const auth = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const [scheme, token] = auth.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const payload = await verifyJwt(token);
    const userId = (payload.sub as string) || null;
    const email = (payload.email as string) || null;
    if (!userId || !email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const json = await req.json().catch(() => ({}));
    const input = UpdateProfileSchema.parse(json);

    const db = getDb();
    // Upsert profile row
    const fields = [
      'full_name','company','phone','bio','location','website','twitter','linkedin','github'
    ] as const;
    const values = fields.map((f) => (input as any)[f] ?? null);

    await db.query(
      `INSERT INTO app.user_profiles (user_id, full_name, company, phone, bio, location, website, twitter, linkedin, github)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (user_id) DO UPDATE SET
         full_name = EXCLUDED.full_name,
         company = EXCLUDED.company,
         phone = EXCLUDED.phone,
         bio = EXCLUDED.bio,
         location = EXCLUDED.location,
         website = EXCLUDED.website,
         twitter = EXCLUDED.twitter,
         linkedin = EXCLUDED.linkedin,
         github = EXCLUDED.github,
         updated_at = now()`,
      [userId, ...values]
    );

    // If name updated, mirror to Supabase auth metadata (service role required)
    if (input.full_name && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const admin = getSupabaseService();
        await admin.auth.admin.updateUserById(userId, {
          user_metadata: { full_name: input.full_name },
        });
      } catch {}
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    if (e?.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid input', details: e.errors }, { status: 400 });
    }
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}


