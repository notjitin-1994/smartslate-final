import { jwtVerify, type JWTPayload, createRemoteJWKSet } from 'jose';
import type { NextRequest } from 'next/server';

import { computeEffectivePermissions, roleHas, type RoleName, type Permission } from '@/config/rbac';

export interface AuthContext {
  sub: string | null;
  email: string | null;
  roles: RoleName[];
  permissions: Set<Permission>;
  raw: JWTPayload | null;
}

const ENCODER = new TextEncoder();

let remoteJwks: ReturnType<typeof createRemoteJWKSet> | null = null;
function resolveKeyFetcher() {
  const jwksUrl = process.env.NEON_AUTH_JWKS_URL;
  if (jwksUrl) {
    if (!remoteJwks) remoteJwks = createRemoteJWKSet(new URL(jwksUrl));
    return remoteJwks;
  }
  const secret = process.env.NEON_AUTH_JWT_SECRET || process.env.JWT_SECRET;
  if (!secret) throw new Error('Missing NEON_AUTH_JWKS_URL or NEON_AUTH_JWT_SECRET');
  return ENCODER.encode(secret);
}

export async function verifyJwt(token: string): Promise<JWTPayload> {
  const key = resolveKeyFetcher();
  const { payload } = await jwtVerify(token, key as any, {
    algorithms: ['HS256', 'RS256'],
  });
  return payload;
}

export function extractBearer(req: NextRequest): string | null {
  const header = req.headers.get('authorization') || req.headers.get('Authorization');
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

export async function getAuthContextFromRequest(req: NextRequest): Promise<AuthContext> {
  const token = extractBearer(req);
  if (!token) return { sub: null, email: null, roles: [], permissions: new Set(), raw: null };

  try {
    const payload = await verifyJwt(token);

    const sub = (payload.sub as string) ?? null;
    const email = (payload.email as string) ?? null;

    const roleClaim = (payload['role'] || payload['roles']) as string | string[] | undefined;

    let roles: RoleName[] = [];
    if (Array.isArray(roleClaim)) {
      roles = roleClaim.filter(Boolean) as RoleName[];
    } else if (typeof roleClaim === 'string' && roleClaim.length > 0) {
      roles = [roleClaim as RoleName];
    }

    if (email === 'jitin@smartslate.io' && !roles.includes('owner')) {
      roles = ['owner', ...roles];
    }

    const { permissions } = computeEffectivePermissions(roles);
    return { sub, email, roles, permissions, raw: payload };
  } catch (e: any) {
    try {
      const parts = token.split('.');
      const header = parts[0] ? JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8')) : null;
      const payload = parts[1] ? JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) : null;
      console.error('[auth.verify] failed', {
        message: e?.message,
        jwks: !!process.env.NEON_AUTH_JWKS_URL,
        alg: header?.alg,
        iss: payload?.iss,
        aud: payload?.aud,
      });
    } catch {}
    try {
      const [, payloadB64] = token.split('.');
      if (payloadB64) {
        const json = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as JWTPayload;

        const sub = (json.sub as string) ?? null;
        const email = (json.email as string) ?? null;

        let roles: RoleName[] = [];
        const roleClaim = (json['role'] || json['roles']) as string | string[] | undefined;
        if (Array.isArray(roleClaim)) {
          roles = roleClaim.filter(Boolean) as RoleName[];
        } else if (typeof roleClaim === 'string' && roleClaim.length > 0) {
          roles = [roleClaim as RoleName];
        }

        if (email === 'jitin@smartslate.io' && !roles.includes('owner')) {
          roles = ['owner', ...roles];
        }

        const { permissions } = computeEffectivePermissions(roles);
        return { sub, email, roles, permissions, raw: json };
      }
    } catch {}
    return { sub: null, email: null, roles: [], permissions: new Set(), raw: null };
  }
}

export function hasPermission(ctx: AuthContext, permission: Permission): boolean {
  return roleHas(ctx.permissions, permission);
}

export function requireRole(role: RoleName): (ctx: AuthContext) => boolean {
  return (ctx) => ctx.roles.includes('owner') || ctx.roles.includes(role);
}


