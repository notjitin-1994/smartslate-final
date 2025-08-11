import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get('token');
    if (!token) return NextResponse.json({ success: false, error: 'Missing token' }, { status: 400 });
    const record = await prisma.verificationToken.findUnique({ where: { token } });
    if (!record || new Date(record.expires) < new Date())
      return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 400 });
    const userId = record.identifier.replace(/^verify:/, '');
    await prisma.user.update({ where: { id: userId }, data: { emailVerified: new Date(), updatedAt: new Date() } });
    await prisma.verificationToken.delete({ where: { token } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}



