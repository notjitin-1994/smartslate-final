import { NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const auth = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!auth) return NextResponse.json({ user: null });
    const [scheme, token] = auth.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) return NextResponse.json({ user: null });
    const payload = await verifyJwt(token);
    const email = (payload.email as string) || null;
    const sub = (payload.sub as string) || null;
    const fullName = (payload["user_metadata"] as any)?.full_name || (email ? email.split('@')[0] : 'User');
    if (!sub || !email) return NextResponse.json({ user: null });
    return NextResponse.json({ user: { id: sub, full_name: fullName, email } });
  } catch {
    return NextResponse.json({ user: null });
  }
}


