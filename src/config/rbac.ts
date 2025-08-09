export type RoleName =
  | 'owner'
  | 'learner'
  | 'smartslateCourse'
  | 'smartslateSales'
  | 'smartslateSupport'
  | 'smartslateAnalytics'
  | 'smartslateAdmin';

export type Permission =
  | 'all:*'
  // user & role management
  | 'user:manage'
  | 'role:manage'
  // courses
  | 'course:create'
  | 'course:update'
  | 'course:delete'
  | 'course:publish'
  | 'course:read'
  // sales / CRM / leads
  | 'lead:read'
  | 'lead:export'
  | 'crm:access'
  | 'pipeline:access'
  // support
  | 'ticket:read'
  | 'ticket:write'
  | 'user:read'
  // analytics
  | 'metrics:read'
  | 'reports:read'
  // admin platform
  | 'settings:write'
  | 'integration:configure'
  | 'content:moderate'
  | 'logs:access'
  | 'api:access'
  | 'emergency:override';

export interface RoleDefinition {
  description: string;
  permissions: Permission[];
}

export const ROLE_DEFINITIONS: Record<RoleName, RoleDefinition> = {
  owner: {
    description:
      'Full access. Can manage users, roles, courses, settings, logs, API, and assume any role.',
    permissions: [
      'all:*',
      'user:manage',
      'role:manage',
      'course:create',
      'course:update',
      'course:delete',
      'course:publish',
      'course:read',
      'lead:read',
      'lead:export',
      'crm:access',
      'pipeline:access',
      'ticket:read',
      'ticket:write',
      'user:read',
      'metrics:read',
      'reports:read',
      'settings:write',
      'integration:configure',
      'content:moderate',
      'logs:access',
      'api:access',
      'emergency:override',
    ],
  },
  learner: {
    description: 'Default role for all users. Can browse and read courses.',
    permissions: ['course:read'],
  },
  smartslateCourse: {
    description: 'Course Manager',
    permissions: [
      'course:create',
      'course:update',
      'course:delete',
      'course:publish',
      'course:read',
    ],
  },
  smartslateSales: {
    description: 'Sales Manager',
    permissions: ['lead:read', 'lead:export', 'crm:access', 'pipeline:access'],
  },
  smartslateSupport: {
    description: 'Support Agent',
    permissions: ['ticket:read', 'user:read'],
  },
  smartslateAnalytics: {
    description: 'Analyst',
    permissions: ['metrics:read', 'reports:read'],
  },
  smartslateAdmin: {
    description: 'Platform Admin (no user/role mgmt)',
    permissions: ['settings:write', 'integration:configure', 'content:moderate', 'logs:access'],
  },
};

export interface EffectivePermissions {
  roles: RoleName[];
  permissions: Set<Permission>;
}

export function computeEffectivePermissions(roles: RoleName[]): EffectivePermissions {
  const set = new Set<Permission>();
  for (const role of roles) {
    const def = ROLE_DEFINITIONS[role];
    if (!def) continue;
    for (const p of def.permissions) set.add(p);
  }
  return { roles, permissions: set };
}

export function roleHas(permissionSet: Set<Permission>, permission: Permission): boolean {
  return permissionSet.has('all:*') || permissionSet.has(permission);
}


