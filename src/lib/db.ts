import { Pool } from 'pg';
import { setDefaultResultOrder } from 'node:dns';

// Prefer IPv4 to avoid ENETUNREACH on environments without IPv6
try { setDefaultResultOrder('ipv4first'); } catch {}

let pool: Pool | null = null;
let directPool: Pool | null = null;

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

export function getDbDirect(): Pool {
  if (!process.env.DIRECT_URL) {
    throw new Error('DIRECT_URL is not set');
  }
  if (!directPool) {
    let sslRequired = false;
    try {
      const u = new URL(process.env.DIRECT_URL);
      const host = (u.hostname || '').toLowerCase();
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '::1';
      sslRequired = !isLocal;
    } catch {
      sslRequired = true;
    }
    let connectionString = process.env.DIRECT_URL;
    if (sslRequired && !/([?&])sslmode=/.test(connectionString)) {
      connectionString += (connectionString.includes('?') ? '&' : '?') + 'sslmode=require';
    }
    if (sslRequired && (process.env.DISABLE_TLS_VERIFY === '1' || process.env.NODE_ENV !== 'production')) {
      // eslint-disable-next-line no-console
      console.warn('[db:direct] TLS verification disabled for local/dev environment');
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    directPool = new Pool({
      connectionString,
      ssl: sslRequired ? { rejectUnauthorized: false } : undefined,
      max: 3,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return directPool;
}


