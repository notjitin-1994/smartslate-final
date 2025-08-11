import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthContextFromRequest } from '@/lib/auth';
import { UpdateProfileSchema, ChangePasswordSchema } from '@/lib/validators/user';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const ctx = await getAuthContextFromRequest(req);
  if (!ctx.sub) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: ctx.sub }, select: { id: true, email: true, name: true, company: true, emailVerified: true } });
  return NextResponse.json({ success: true, data: user });
}

export async function PATCH(req: NextRequest) {
  const ctx = await getAuthContextFromRequest(req);
  if (!ctx.sub) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const json = await req.json();
    if (json.currentPassword || json.newPassword) {
      const { currentPassword, newPassword } = ChangePasswordSchema.parse(json);
      const existing = await prisma.user.findUnique({ where: { id: ctx.sub } });
      if (!existing?.passwordHash) return NextResponse.json({ success: false, error: 'Password not set' }, { status: 400 });
      const ok = await bcrypt.compare(currentPassword, existing.passwordHash);
      if (!ok) return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 400 });
      const passwordHash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({ where: { id: ctx.sub }, data: { passwordHash, updatedAt: new Date() } });
      return NextResponse.json({ success: true });
    }
    const input = UpdateProfileSchema.parse(json);
    const data: any = { ...input, updatedAt: new Date() };
    if (input.email) data.emailVerified = null; // require re-verify
    const user = await prisma.user.update({ where: { id: ctx.sub }, data, select: { id: true, email: true, name: true, company: true, emailVerified: true } });
    return NextResponse.json({ success: true, data: user });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}



