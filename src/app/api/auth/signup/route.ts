export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { seedRoles, assignRoleToUser } from '@/lib/rbac-db';
import { createAuthUser } from '@/lib/stack-auth';
import { randomUUID } from 'crypto';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST = async (req: NextRequest) => {
  try {
    const { email, firstName, lastName } = (await req.json()) as {
      email?: string;
      password?: string;
      confirmPassword?: string;
      firstName?: string;
      lastName?: string;
      company?: string;
    };

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const name = [firstName, lastName].filter(Boolean).join(' ').trim() || null;

    // Upsert User record in RBAC User table
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: randomUUID(),
          email,
          name,
          updatedAt: new Date(),
        },
      });
    } else {
      // Update name if missing
      if (!user.name && name) {
        user = await prisma.user.update({ where: { id: user.id }, data: { name, updatedAt: new Date() } });
      }
    }

    // Ensure roles exist and assign default learner role
    await seedRoles();
    await assignRoleToUser(user.id, 'learner');

    // Try to create user in Neon Auth (Stack Auth) as well, if configured
    const authResult = await createAuthUser({ email, name });

    return NextResponse.json({ ok: true, external: { neonAuth: authResult.ok } });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
};


