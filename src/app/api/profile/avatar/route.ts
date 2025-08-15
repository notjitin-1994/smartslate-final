import { NextRequest, NextResponse } from 'next/server';
import { getAuthContextFromRequest } from '@/lib/auth';
import { getSupabaseService } from '@/lib/supabase';
import { getDbDirect } from '@/lib/db';

// POST expects multipart/form-data with field "file"
export async function POST(req: NextRequest) {
  try {
    const ctx = await getAuthContextFromRequest(req);
    const userId = ctx.sub;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Supabase service is not configured' }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    if (!file) return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    if (file.size > 5_000_000) return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });

    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const allowed = ['jpg','jpeg','png','webp'];
    if (!allowed.includes(ext)) return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });

    const admin = getSupabaseService();
    const bucket = 'avatars';

    // Ensure bucket exists (idempotent)
    try {
      await admin.storage.createBucket(bucket, { public: true, fileSizeLimit: 5_000_000 });
    } catch {}

    const path = `${userId}/avatar.${ext}`;
    const arrayBuffer = await file.arrayBuffer();
    const { data: uploaded, error: uploadErr } = await admin.storage
      .from(bucket)
      .upload(path, arrayBuffer, { upsert: true, contentType: file.type || `image/${ext}` });
    if (uploadErr) return NextResponse.json({ error: uploadErr.message }, { status: 400 });

    const { data: urlData } = admin.storage.from(bucket).getPublicUrl(path);
    const publicUrl = urlData.publicUrl;

    // Persist to profile using direct DB connection (bypasses RLS and schema limits)
    const db = getDbDirect();
    await db.query(
      `INSERT INTO app.user_profiles (user_id, avatar_path, avatar_url)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id) DO UPDATE SET avatar_path = EXCLUDED.avatar_path, avatar_url = EXCLUDED.avatar_url, updated_at = now()`,
      [userId, `${bucket}/${path}`, publicUrl]
    );

    return NextResponse.json({ url: publicUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}


