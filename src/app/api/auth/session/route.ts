import { NextResponse } from 'next/server';

// This route stores the access token client-side by returning it so the SPA AuthContext can use it.
// In a full SSR setup, you might set an HttpOnly cookie here.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { access_token, user } = body as { access_token?: string; user?: any };
  if (!access_token || !user) return NextResponse.json({ error: 'Missing token or user' }, { status: 400 });
  return NextResponse.json({ ok: true });
}


