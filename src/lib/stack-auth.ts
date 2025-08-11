/**
 * Thin integration for Neon Auth (Stack Auth) Admin API.
 *
 * Two supported configurations:
 * 1) Official Neon Console Admin API (recommended)
 *    - NEON_API_KEY: Neon Console API key with permission to manage Auth
 *    - NEON_PROJECT_ID: Your Neon project ID
 *
 * 2) Generic Stack Auth Admin endpoint (fallback)
 *    - NEON_AUTH_CREATE_USER_URL: Fully qualified Admin API URL to create a user
 *    - NEON_AUTH_API_KEY: Bearer token for that endpoint
 */

export interface CreateAuthUserParams {
  email: string;
  name?: string | null;
}

export interface CreateAuthUserResult {
  ok: boolean;
  status: number;
  id?: string;
  error?: string;
  raw?: unknown;
}

export interface AuthUserRecord {
  id: string;
  email?: string;
  name?: string | null;
}

export interface ListAuthUsersResult {
  ok: boolean;
  status: number;
  users: AuthUserRecord[];
  error?: string;
  raw?: unknown;
}

export async function createAuthUser(params: CreateAuthUserParams): Promise<CreateAuthUserResult> {
  const neonApiKey = process.env.NEON_API_KEY;
  const neonProjectId = process.env.NEON_PROJECT_ID;

  // Preferred: Neon Console Admin API
  if (neonApiKey && neonProjectId) {
    try {
      const res = await fetch('https://console.neon.tech/api/v2/projects/auth/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${neonApiKey}`,
        },
        body: JSON.stringify({
          project_id: neonProjectId,
          auth_provider: 'stack',
          email: params.email,
          name: params.name ?? undefined,
        }),
        credentials: 'omit',
      });

      const status = res.status;
      const raw = await safeJson(res);
      if (!res.ok) {
        return { ok: false, status, error: extractError(raw) || `HTTP ${status}`, raw };
      }

      const id = (raw && (raw.id || raw.userId || raw.user?.id)) as string | undefined;
      return { ok: true, status, id, raw };
    } catch (error: any) {
      return { ok: false, status: -1, error: error?.message || 'Network error' };
    }
  }

  // Fallback: Generic endpoint
  const endpoint = process.env.NEON_AUTH_CREATE_USER_URL;
  const apiKey = process.env.NEON_AUTH_API_KEY;
  if (!endpoint || !apiKey) {
    return { ok: false, status: 0, error: 'Neon Auth admin API not configured' };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email: params.email,
        name: params.name ?? undefined,
      }),
      credentials: 'omit',
    });

    const status = res.status;
    const raw = await safeJson(res);
    if (!res.ok) {
      return { ok: false, status, error: extractError(raw) || `HTTP ${status}`, raw };
    }

    const id = (raw && (raw.id || raw.userId || raw.user?.id)) as string | undefined;
    return { ok: true, status, id, raw };
  } catch (error: any) {
    return { ok: false, status: -1, error: error?.message || 'Network error' };
  }
}

export async function listAuthUsers(): Promise<ListAuthUsersResult> {
  const neonApiKey = process.env.NEON_API_KEY;
  const neonProjectId = process.env.NEON_PROJECT_ID;

  // Attempt Neon Console Admin API (best effort; may vary by version)
  if (neonApiKey && neonProjectId) {
    try {
      const url = `https://console.neon.tech/api/v2/projects/auth/users?project_id=${encodeURIComponent(
        neonProjectId
      )}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${neonApiKey}`,
        },
      });
      const status = res.status;
      const raw = await safeJson(res);
      if (!res.ok) {
        // Fallback to generic endpoint below
        // return { ok: false, status, users: [], error: extractError(raw) || `HTTP ${status}`, raw };
      } else {
        const items = normalizeUsersArray(raw);
        return { ok: true, status, users: items, raw };
      }
    } catch (error: any) {
      // Ignore and try fallback
    }
  }

  // Fallback: Generic list endpoint
  const endpoint = process.env.NEON_AUTH_LIST_USERS_URL;
  const apiKey = process.env.NEON_AUTH_API_KEY;
  if (!endpoint || !apiKey) {
    return { ok: false, status: 0, users: [], error: 'Auth list API not configured' };
  }
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const status = res.status;
    const raw = await safeJson(res);
    if (!res.ok) {
      return { ok: false, status, users: [], error: extractError(raw) || `HTTP ${status}`, raw };
    }
    const items = normalizeUsersArray(raw);
    return { ok: true, status, users: items, raw };
  } catch (error: any) {
    return { ok: false, status: -1, users: [], error: error?.message || 'Network error' };
  }
}

function normalizeUsersArray(body: any): AuthUserRecord[] {
  if (!body) return [];
  const potentialArrays = [body.items, body.users, body.data, body];
  for (const arr of potentialArrays) {
    if (Array.isArray(arr)) {
      return arr
        .map((u: any) => ({
          id: String(u.id ?? u.userId ?? u.uid ?? ''),
          email: u.email ?? u.primaryEmail ?? u.user?.email ?? undefined,
          name: u.name ?? u.displayName ?? u.user?.name ?? null,
        }))
        .filter((u: AuthUserRecord) => !!u.id);
    }
  }
  return [];
}

async function safeJson(res: Response): Promise<any> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function extractError(body: any): string | undefined {
  if (!body) return undefined;
  if (typeof body === 'string') return body;
  return body.error || body.message || body.detail;
}


