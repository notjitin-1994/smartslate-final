import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const base = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
    if (!base) return NextResponse.json({ error: 'SUPABASE_URL not configured' }, { status: 500 });
    const url = `${base.replace(/\/$/, '')}/auth/v1/keys`;
    const apikey = (process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
    const res = await fetch(url, {
      headers: apikey ? { apikey } : undefined,
      cache: 'no-store',
    });
    if (!res.ok) {
      const body = await res.text();
      return new NextResponse(body || 'Upstream error', { status: res.status, headers: { 'content-type': res.headers.get('content-type') || 'text/plain' } });
    }
    const json = await res.text();
    return new NextResponse(json, { status: 200, headers: { 'content-type': 'application/json' } });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}


