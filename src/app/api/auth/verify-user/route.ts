export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserRoleIds } from '@/lib/rbac-db';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }

    // Check if user exists in database
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: {
        UserRole: {
          include: {
            Role: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ 
        exists: false, 
        message: 'User not found in database' 
      });
    }

    // Get user roles
    const roleIds = await getUserRoleIds(user.id);

    return NextResponse.json({
      exists: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      roles: user.UserRole.map(ur => ({
        id: ur.Role.id,
        description: ur.Role.description
      })),
      hasLearnerRole: roleIds.includes('learner')
    });

  } catch (error) {
    console.error('Verify user API error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unexpected error' 
    }, { status: 500 });
  }
};
