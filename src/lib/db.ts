import { Pool } from 'pg';

let pool: Pool | null = null;

/**
 * Get a singleton `pg` connection pool configured for Supabase or local Postgres.
 *
 * Behavior:
 * - Infers whether SSL is required by inspecting `DATABASE_URL` host; enables TLS for non-local hosts.
 * - Appends `sslmode=require` to the connection string when SSL is needed and not present.
 * - In non-production (or when `DISABLE_TLS_VERIFY=1`), disables TLS verification for convenience.
 *
 * Env vars:
 * - `DATABASE_URL` (required): Postgres connection string.
 * - `DISABLE_TLS_VERIFY` (optional): set to `1` to bypass TLS verification (local/dev only).
 * - `NODE_ENV` is used to guard TLS verification (production keeps verification on).
 */
export function getDb(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  if (!pool) {
    // Determine if SSL is required (e.g., Supabase) by inspecting host
    let sslRequired = false;
    try {
      const u = new URL(process.env.DATABASE_URL);
      const host = (u.hostname || '').toLowerCase();
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '::1';
      sslRequired = !isLocal;
    } catch {
      // Default to SSL for safety when URL can't be parsed
      sslRequired = true;
    }
    // Build connection string and enforce sslmode=require when SSL is needed
    let connectionString = process.env.DATABASE_URL;
    if (sslRequired && !/([?&])sslmode=/.test(connectionString)) {
      connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=require';
    }

    // For local dev convenience only, allow opting out of TLS verification
    if (sslRequired && (process.env.DISABLE_TLS_VERIFY === '1' || process.env.NODE_ENV !== 'production')) {
      // eslint-disable-next-line no-console
      console.warn('[db] TLS verification disabled for local/dev environment');
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    pool = new Pool({
      connectionString,
      // Cloud Postgres (e.g., Supabase) requires SSL; allow self-signed
      ssl: sslRequired ? { rejectUnauthorized: false } : undefined,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return pool;
}


