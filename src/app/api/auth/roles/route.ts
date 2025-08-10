export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/rbac';
import { ensureDefaultRolesForUser, getUserRoleIds, seedRoles, getUserByEmail, getUserByStackAuthId } from '@/lib/rbac-db';
import { getAuthContextFromRequest } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { randomUUID } from 'crypto';

// GET: return current user's roles as known in DB
export const GET = withAuth(async (req: NextRequest) => {
  const auth = await getAuthContextFromRequest(req);
  if (!auth.sub) return NextResponse.json({ ok: false }, { status: 401 });

  await seedRoles();

  // Auto-create user if missing so roles are never silently empty for valid auth
  let dbUser = await getUserByEmail(auth.email || '');
  if (!dbUser && auth.sub) {
    dbUser = await getUserByStackAuthId(auth.sub);
  }
  if (!dbUser && auth.email) {
    dbUser = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: auth.email,
        stackAuthId: auth.sub,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  if (!dbUser) return NextResponse.json({ ok: true, roles: [] });

  const roleIds = await getUserRoleIds(dbUser.id);
  return NextResponse.json({ ok: true, roles: roleIds });
});

// POST: ensure default roles for current user and return effective list
export const POST = withAuth(async (req: NextRequest) => {
  const auth = await getAuthContextFromRequest(req);
  if (!auth.sub) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    // Ensure we have a DB user for the authenticated subject
    let dbUser = await getUserByEmail(auth.email || '');
    if (!dbUser && auth.sub) {
      dbUser = await getUserByStackAuthId(auth.sub);
    }

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: randomUUID(),
          email: auth.email ?? null,
          stackAuthId: auth.sub,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }

    const roles = await ensureDefaultRolesForUser(dbUser.id, dbUser.email ?? auth.email);
    return NextResponse.json({ ok: true, roles });
  } catch (error: any) {
    // If database is unavailable, use dev override
    if (error.code === 'P1001' || error.message?.includes('Can\'t reach database server')) {
      console.error('Database unavailable, using dev override for roles');
      const devOverride = await import('./dev-override');
      return devOverride.POST(req);
    }
    throw error;
  }
});


