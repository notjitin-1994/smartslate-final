import { NextRequest, NextResponse } from 'next/server';
import { getAuthContextFromRequest } from '@/lib/auth';
import { getSupabaseService } from '@/lib/supabase';

// POST expects multipart/form-data with field "file"
export async function POST(req: NextRequest) {
  try {
    const ctx = await getAuthContextFromRequest(req);
    const userId = ctx.sub;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase configuration:', {
        hasUrl: !!process.env.SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      });
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
    if (uploadErr) {
      console.error('Storage upload error:', uploadErr);
      return NextResponse.json({ error: uploadErr.message }, { status: 400 });
    }

    const { data: urlData } = admin.storage.from(bucket).getPublicUrl(path);
    const publicUrl = urlData.publicUrl;

    // Persist to profile using Supabase service role to bypass RLS
    const { error: profileError } = await admin
      .from('user_profiles')
      .upsert({
        user_id: userId,
        avatar_path: `${bucket}/${path}`,
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });

    if (profileError) {
      console.error('Failed to update profile:', profileError);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    console.log('Avatar upload successful:', { userId, path, publicUrl });
    return NextResponse.json({ url: publicUrl });
  } catch (e: any) {
    console.error('Avatar upload error:', e);
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}


