import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getSupabaseService } from '@/lib/supabase';
import { UpdateProfileSchema } from '@/lib/validators/user';
import { getAuthContextFromRequest } from '@/lib/auth';

// GET returns the current profile (merging auth metadata + db profile)
export async function GET(req: NextRequest) {
  try {
    const ctx = await getAuthContextFromRequest(req);
    const userId = ctx.sub;
    const email = ctx.email;
    const fullNameMeta = (ctx.raw?.["user_metadata"] as any)?.full_name as string | undefined;
    if (!userId || !email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = getDb();
    let { rows } = await db.query(
      `SELECT user_id, full_name, company, phone, bio, location, website, twitter, linkedin, github, avatar_url, avatar_path
       FROM app.user_profiles WHERE user_id = $1`,
      [userId]
    );
    let profile = rows[0] || null;
    // Auto-provision minimal profile row if missing
    if (!profile) {
      const fullName = fullNameMeta || (email ? email.split('@')[0] : null);
      try {
        await db.query(
          `INSERT INTO app.user_profiles (user_id, full_name) VALUES ($1, $2) ON CONFLICT (user_id) DO NOTHING`,
          [userId, fullName]
        );
        const refetch = await db.query(
          `SELECT user_id, full_name, company, phone, bio, location, website, twitter, linkedin, github, avatar_url, avatar_path
           FROM app.user_profiles WHERE user_id = $1`,
          [userId]
        );
        profile = refetch.rows[0] || null;
      } catch {}
    }

    // Attempt to sync provider avatar into profile when user hasn't uploaded a custom avatar
    // Rule: If user uploaded (avatar_path not null) we NEVER override. Otherwise, keep in sync with provider when available.
    try {
      const hasCustomUpload = Boolean(profile?.avatar_path);
      // Extract potential avatar URL from JWT payload first to avoid admin call when possible
      const raw = ctx.raw as any;
      const meta = (raw?.user_metadata as any) || {};
      const avatarFromJwt = [meta.avatar_url, meta.picture, raw?.avatar_url, raw?.picture].find(
        (v) => typeof v === 'string' && v.length > 0
      ) as string | undefined;

      let providerAvatarUrl: string | undefined = avatarFromJwt;

      // If still unknown and service role is available, fetch full user from Supabase Admin API
      if (!providerAvatarUrl && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        try {
          const admin = getSupabaseService();
          const { data, error } = await admin.auth.admin.getUserById(userId);
          if (!error && data?.user) {
            const u: any = data.user;
            providerAvatarUrl = (u.user_metadata?.avatar_url as string) || (u.user_metadata?.picture as string);
            if (!providerAvatarUrl && Array.isArray(u.identities)) {
              for (const ident of u.identities) {
                const idData: any = ident?.identity_data || {};
                const candidate = (idData.avatar_url as string) || (idData.picture as string) || (idData.profile_image_url as string);
                if (candidate) { providerAvatarUrl = candidate; break; }
              }
            }
          }
        } catch {}
      }

      // Upsert avatar_url only when the user hasn't uploaded; keep in sync with provider if it changes
      if (!hasCustomUpload && providerAvatarUrl) {
        const shouldUpdate = !profile?.avatar_url || profile?.avatar_url !== providerAvatarUrl;
        if (shouldUpdate) {
          await db.query(
            `UPDATE app.user_profiles
             SET avatar_url = $2, updated_at = now()
             WHERE user_id = $1 AND avatar_path IS NULL`,
            [userId, providerAvatarUrl]
          );
          const refetch = await db.query(
            `SELECT user_id, full_name, company, phone, bio, location, website, twitter, linkedin, github, avatar_url, avatar_path
             FROM app.user_profiles WHERE user_id = $1`,
            [userId]
          );
          profile = refetch.rows[0] || profile;
        }
      }
    } catch {}

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
    const ctx = await getAuthContextFromRequest(req);
    const userId = ctx.sub;
    const email = ctx.email;
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


