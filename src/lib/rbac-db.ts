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
  // Seed roles if missing
  await seedRoles();

  // Owner mapping for specific email
  if (email === 'jitin@smartslate.io') {
    await assignRoleToUser(userId, 'owner');
    return getUserRoleIds(userId);
  }

  // If user has no roles, assign default learner role
  const existing = await getUserRoleIds(userId);
  if (existing.length === 0) {
    await assignRoleToUser(userId, 'learner');
  }
  return getUserRoleIds(userId);
}


