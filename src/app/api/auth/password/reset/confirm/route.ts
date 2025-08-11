import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

const ConfirmSchema = z.object({ token: z.string().min(1), newPassword: z.string().min(8) });

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = ConfirmSchema.parse(await req.json());
    const record = await prisma.verificationToken.findUnique({ where: { token } });
    if (!record || new Date(record.expires) < new Date())
      return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 400 });
    const userId = record.identifier.replace(/^pwd:/, '');
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash, updatedAt: new Date() } });
    await prisma.verificationToken.delete({ where: { token } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}



