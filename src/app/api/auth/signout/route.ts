import { NextResponse } from 'next/server';
import { getSupabaseAnon } from '@/lib/supabase';

export async function POST() {
  try {
    const supabase = getSupabaseAnon();
    await supabase.auth.signOut();
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}


