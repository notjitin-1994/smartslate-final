import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

const RequestSchema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const { email } = RequestSchema.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ success: true });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60);
    await prisma.verificationToken.upsert({
      where: { identifier_token: { identifier: `pwd:${user.id}`, token } },
      create: { identifier: `pwd:${user.id}`, token, expires },
      update: { token, expires },
    } as any);
    // TODO: send email using lib/email
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}



