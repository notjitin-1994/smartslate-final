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
type KeyFetcher = ReturnType<typeof createRemoteJWKSet> | Uint8Array;
function resolveKeyFetcher(): KeyFetcher {
  // Prefer offline verification with a shared secret when available to avoid HTTPS fetches.
  const offlineSecret = process.env.SUPABASE_JWT_SECRET || process.env.JWT_SECRET || process.env.NEON_AUTH_JWT_SECRET;
  if (offlineSecret) {
    return ENCODER.encode(offlineSecret);
  }

  // Otherwise, fall back to remote JWKS. If upstream requires apikey, we proxy via our JWKS route.
  const supabaseBaseUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  const supabaseComputedJwks = supabaseBaseUrl
    ? `${supabaseBaseUrl.replace(/\/$/, '')}/auth/v1/keys`
    : undefined;
  let jwksUrl = process.env.SUPABASE_JWKS_URL || supabaseComputedJwks || process.env.NEON_AUTH_JWKS_URL;
  if (!process.env.SUPABASE_JWKS_URL && supabaseComputedJwks) {
    jwksUrl = '/api/auth/jwks';
  }
  if (!jwksUrl) {
    throw new Error('Missing SUPABASE_JWT_SECRET/JWT_SECRET and no JWKS URL available');
  }
  if (!remoteJwks) remoteJwks = createRemoteJWKSet(new URL(jwksUrl));
  return remoteJwks;
}

export async function verifyJwt(token: string): Promise<JWTPayload> {
  const key = resolveKeyFetcher();
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256', 'RS256'],
    });
    return payload;
  } catch (err) {
    // Fallback: if JWKS fetch failed but an HMAC secret is configured, try HS256
    const secret = process.env.SUPABASE_JWT_SECRET || process.env.JWT_SECRET || process.env.NEON_AUTH_JWT_SECRET;
    if (secret) {
      const { payload } = await jwtVerify(token, ENCODER.encode(secret), {
        algorithms: ['HS256'],
      });
      return payload;
    }
    throw err;
  }
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

    // Expect standard claims; roles will be provided by AWS in the future
    const sub = (payload.sub as string) ?? null;
    const email = (payload.email as string) ?? null;

    const roleClaim = (payload['role'] || payload['roles']) as string | string[] | undefined;

    let roles: RoleName[] = [];
    if (Array.isArray(roleClaim)) {
      roles = roleClaim.filter(Boolean) as RoleName[];
    } else if (typeof roleClaim === 'string' && roleClaim.length > 0) {
      roles = [roleClaim as RoleName];
    }

    // Temporary owner override via email until AWS roles are wired
    if (email === 'jitin@smartslate.io' && !roles.includes('owner')) {
      roles = ['owner', ...roles];
    }

    const { permissions } = computeEffectivePermissions(roles);
    return { sub, email, roles, permissions, raw: payload };
  } catch {
    // Fallback: decode token without verification (e.g. unsigned local dev token)
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

        // Temporary owner override via email until AWS roles are wired
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


