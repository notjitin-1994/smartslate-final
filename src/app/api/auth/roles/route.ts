export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/middleware/rbac';
import { ensureDefaultRolesForUser, getUserRoleIds, seedRoles } from '@/lib/rbac-db';
import { getAuthContextFromRequest } from '@/lib/auth';

// GET: return current user's roles as known in DB
export const GET = withAuth(async (req: NextRequest) => {
  const auth = await getAuthContextFromRequest(req);
  if (!auth.sub) return NextResponse.json({ ok: false }, { status: 401 });

  await seedRoles();

  // Ensure default roles exist
  const dbUser = await (await import('@/lib/rbac-db')).getUserByEmail(auth.email || '');
  if (!dbUser) return NextResponse.json({ ok: true, roles: [] });
  const roleIds = await getUserRoleIds(dbUser.id);
  return NextResponse.json({ ok: true, roles: roleIds });
});

// POST: ensure default roles for current user and return effective list
export const POST = withAuth(async (req: NextRequest) => {
  const auth = await getAuthContextFromRequest(req);
  if (!auth.sub) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    const dbUser = await (await import('@/lib/rbac-db')).getUserByEmail(auth.email || '');
    if (!dbUser) return NextResponse.json({ ok: true, roles: [] });

    const roles = await ensureDefaultRolesForUser(dbUser.id, auth.email);
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


