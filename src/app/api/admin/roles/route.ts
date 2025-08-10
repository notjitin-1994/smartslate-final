export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withPermission } from '@/middleware/rbac';
import prisma from '@/lib/prisma';

// Get all roles (requires role:manage permission)
export const GET = withPermission('role:manage', async (_req: NextRequest) => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        _count: {
          select: { userRoles: true }
        }
      }
    });

    const formattedRoles = roles.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      userCount: role._count.userRoles,
      isSystem: ['owner', 'learner'].includes(role.id)
    }));

    return NextResponse.json({ ok: true, roles: formattedRoles });
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
  }
});

// Create new role (requires role:manage permission)
export const POST = withPermission('role:manage', async (req: NextRequest) => {
  try {
    const { name, description, permissions } = await req.json();

    // Generate role ID from name
    const roleId = name.toLowerCase().replace(/[^a-z0-9]+/g, '');

    const role = await prisma.role.create({
      data: {
        id: roleId,
        name,
        description,
        permissions
      }
    });

    return NextResponse.json({ ok: true, role });
  } catch (error: any) {
    console.error('Failed to create role:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Role with this ID already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 });
  }
});

// Update role (requires role:manage permission)
export const PATCH = withPermission('role:manage', async (req: NextRequest) => {
  try {
    const { id, name, description, permissions } = await req.json();

    // Don't allow updating system roles
    if (['owner', 'learner'].includes(id)) {
      return NextResponse.json({ error: 'Cannot modify system roles' }, { status: 400 });
    }

    const role = await prisma.role.update({
      where: { id },
      data: {
        name,
        description,
        permissions
      }
    });

    return NextResponse.json({ ok: true, role });
  } catch (error) {
    console.error('Failed to update role:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
});

// Delete role (requires role:manage permission)
export const DELETE = withPermission('role:manage', async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const roleId = searchParams.get('id');

    if (!roleId) {
      return NextResponse.json({ error: 'Role ID is required' }, { status: 400 });
    }

    // Don't allow deleting system roles
    if (['owner', 'learner'].includes(roleId)) {
      return NextResponse.json({ error: 'Cannot delete system roles' }, { status: 400 });
    }

    // Check if role is assigned to any users
    const assignedCount = await prisma.userRole.count({
      where: { roleId }
    });

    if (assignedCount > 0) {
      return NextResponse.json({ 
        error: `Cannot delete role. It is assigned to ${assignedCount} user(s).` 
      }, { status: 400 });
    }

    await prisma.role.delete({
      where: { id: roleId }
    });

    return NextResponse.json({ ok: true, message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Failed to delete role:', error);
    return NextResponse.json({ error: 'Failed to delete role' }, { status: 500 });
  }
});
