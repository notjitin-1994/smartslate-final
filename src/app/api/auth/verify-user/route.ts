export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ensureDefaultRolesForUser } from '@/lib/rbac-db';
import { randomUUID } from 'crypto';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json().catch(() => ({} as any));
    const { email, name, company } = body as { email?: string; name?: string; company?: string };
    console.log('[verify-user] payload', { email, hasName: !!name, hasCompany: !!company });

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { email } });
    console.log('[verify-user] existing', !!user);

    let isNew = false;
    if (!user) {
      console.log('[verify-user] creating user');
      user = await prisma.user.create({
        data: {
          id: randomUUID(),
          email,
          name: name || null,
          company: company || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      isNew = true;
      console.log('[verify-user] created', { id: user.id, email: user.email });

      const roles = await ensureDefaultRolesForUser(user.id, email);
      console.log('[verify-user] roles', roles);
    } else {
      console.log('[verify-user] user exists', { id: user.id, email: user.email });
    }

    return NextResponse.json({
      ok: true,
      userId: user.id,
      email: user.email,
      name: user.name,
      isNew,
    });
  } catch (error) {
    console.error('[verify-user] error', error);
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
};
