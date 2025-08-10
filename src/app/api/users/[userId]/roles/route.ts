export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withPermission } from '@/middleware/rbac';
import { assignRoleToUser, getUserRoleIds } from '@/lib/rbac-db';
import prisma from '@/lib/prisma';
import type { RoleName } from '@/config/rbac';

// Get user's roles
export const GET = withPermission('user:read', async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { userId } = params;
    const roleIds = await getUserRoleIds(userId);
    return NextResponse.json({ ok: true, roles: roleIds });
  } catch (error) {
    console.error('Failed to fetch user roles:', error);
    return NextResponse.json({ error: 'Failed to fetch user roles' }, { status: 500 });
  }
});

// Update user's roles (requires role:manage permission)
export const PUT = withPermission('role:manage', async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { userId } = params;
    const { roles } = await req.json();

    // Validate roles
    const validRoles: RoleName[] = ['owner', 'learner', 'smartslateCourse', 'smartslateSales', 'smartslateSupport', 'smartslateAnalytics', 'smartslateAdmin'];
    const requestedRoles = roles.filter((role: string) => validRoles.includes(role as RoleName));

    // Clear existing roles
    await prisma.userRole.deleteMany({
      where: { userId }
    });

    // Assign new roles
    await Promise.all(
      requestedRoles.map((roleId: RoleName) => assignRoleToUser(userId, roleId))
    );

    const updatedRoles = await getUserRoleIds(userId);
    return NextResponse.json({ ok: true, roles: updatedRoles });
  } catch (error) {
    console.error('Failed to update user roles:', error);
    return NextResponse.json({ error: 'Failed to update user roles' }, { status: 500 });
  }
});
