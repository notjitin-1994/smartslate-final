export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withPermission } from '@/middleware/rbac';

// Get all users (requires user:read permission)
export const GET = withPermission('user:read', async (req: NextRequest) => {
  try {
    const email = req.nextUrl.searchParams.get('email') || undefined;
    const role = req.nextUrl.searchParams.get('role') || undefined;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        stackAuthId: true,
        createdAt: true,
        updatedAt: true,
        UserRole: {
          select: {
            roleId: true
          }
        }
      },
      where: {
        ...(email ? { email: { contains: email, mode: 'insensitive' } } : {}),
        ...(role
          ? {
              UserRole: {
                some: {
                  roleId: role as any,
                },
              },
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
    
    // Transform to include roles array
    const usersWithRoles = users.map(user => ({
      ...user,
      roles: user.UserRole.map(ur => ur.roleId),
      UserRole: undefined
    }));
    
    return NextResponse.json(usersWithRoles);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
});
