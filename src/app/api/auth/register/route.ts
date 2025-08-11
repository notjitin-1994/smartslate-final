import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

const RegisterSchema = z.object({ email: z.string().email(), password: z.string().min(8), name: z.string().optional(), company: z.string().optional() });

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { email, password, name, company } = RegisterSchema.parse(json);
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 400 });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { id: randomUUID(), email, name: name ?? null, company: company ?? null, passwordHash, updatedAt: new Date() } as any });
    return NextResponse.json({ success: true, data: { id: user.id, email: user.email } });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}


