import prisma from '@/lib/prisma';
import { ROLE_DEFINITIONS, type RoleName } from '@/config/rbac';

export async function seedRoles(): Promise<void> {
  const roleEntries = Object.entries(ROLE_DEFINITIONS) as Array<[
    RoleName,
    { description: string }
  ]>;

  await Promise.all(
    roleEntries.map(([role, def]) =>
      prisma.role.upsert({
        where: { id: role },
        create: { id: role, description: def.description },
        update: { description: def.description },
      })
    )
  );
}

export async function getUserByEmail(email: string) {
  if (!email) return null;
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserByStackId(stackId: string) {
  if (!stackId) return null;
  return prisma.user.findUnique({ where: { id: stackId } });
}

export async function getUserByStackAuthId(stackAuthId: string) {
  if (!stackAuthId) return null;
  return prisma.user.findUnique({ where: { stackAuthId } });
}

export async function getUserRoleIds(userId: string): Promise<string[]> {
  const roles = await prisma.userRole.findMany({
    where: { userId },
    select: { roleId: true },
  });
  return roles.map((r: { roleId: string }) => r.roleId);
}

export async function assignRoleToUser(userId: string, roleId: RoleName): Promise<void> {
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId, roleId } },
    create: { userId, roleId },
    update: {},
  });
}

export async function ensureDefaultRolesForUser(userId: string, email: string | null): Promise<string[]> {
  console.log('=== ROLE ASSIGNMENT START ===');
  console.log('Ensuring roles for user:', { userId, email });
  
  // Seed roles if missing
  await seedRoles();
  console.log('✅ Roles seeded successfully');

  // Owner mapping for specific email
  if (email === 'jitin@smartslate.io') {
    console.log('🔑 Assigning OWNER role to jitin@smartslate.io');
    await assignRoleToUser(userId, 'owner');
    const roles = await getUserRoleIds(userId);
    console.log('✅ Owner roles assigned:', roles);
    return roles;
  }

  // If user has no roles, assign default learner role
  const existing = await getUserRoleIds(userId);
  console.log('🔍 Existing roles for user:', existing);
  
  if (existing.length === 0) {
    console.log('📚 Assigning default LEARNER role');
    await assignRoleToUser(userId, 'learner');
    const finalRoles = await getUserRoleIds(userId);
    console.log('✅ Learner role assigned, final roles:', finalRoles);
    return finalRoles;
  }
  
  console.log('✅ User already has roles, no assignment needed');
  return existing;
}


