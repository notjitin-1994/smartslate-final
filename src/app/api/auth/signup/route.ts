export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { seedRoles, assignRoleToUser, ensureDefaultRolesForUser } from '@/lib/rbac-db';
import { createAuthUser } from '@/lib/stack-auth';
import { randomUUID } from 'crypto';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
      confirmPassword?: string;
      firstName?: string;
      lastName?: string;
      company?: string;
    };
    const { email, firstName, lastName, company } = body;

    console.log('[signup] payload', { email, hasFN: !!firstName, hasLN: !!lastName, hasCompany: !!company });

    if (!email || !isValidEmail(email)) {
      console.error('[signup] invalid email', email);
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const name = [firstName, lastName].filter(Boolean).join(' ').trim() || null;

    let user = await prisma.user.findUnique({ where: { email } });
    console.log('[signup] existing', !!user);
    
    if (!user) {
      console.log('[signup] creating user');
      user = await prisma.user.create({
        data: {
          id: randomUUID(),
          email,
          name,
          company: company || null,
          updatedAt: new Date(),
        },
      });
      console.log('[signup] created', { id: user.id, email: user.email });
    } else {
      const updateData: Partial<{ name: string | null; company: string | null; updatedAt: Date }> = { updatedAt: new Date() };
      let shouldUpdate = false;

      if (name && (!user.name || user.name !== name)) {
        updateData.name = name;
        shouldUpdate = true;
        console.log('[signup] will update name');
      }

      if (company && (!user.company || user.company !== company)) {
        updateData.company = company;
        shouldUpdate = true;
        console.log('[signup] will update company');
      }

      if (shouldUpdate) {
        console.log('[signup] updating user');
        user = await prisma.user.update({ 
          where: { id: user.id }, 
          data: updateData 
        });
        console.log('[signup] updated', { id: user.id });
      }
    }

    console.log('[signup] ensuring roles');
    const roles = await ensureDefaultRolesForUser(user.id, email);
    console.log('[signup] roles', roles);

    const authResult = await createAuthUser({ email, name });
    console.log('[signup] neonAuth', { ok: authResult.ok, status: authResult.status, error: authResult.error });

    return NextResponse.json({ 
      ok: true, 
      userId: user.id,
      external: { neonAuth: authResult.ok, status: authResult.status, error: authResult.error ?? null } 
    });
  } catch (error) {
    console.error('[signup] error', error);
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unexpected error' 
    }, { status: 500 });
  }
};


