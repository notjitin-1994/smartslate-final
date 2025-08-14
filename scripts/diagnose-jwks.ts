#!/usr/bin/env tsx

import { existsSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

const envLocal = join(__dirname, '..', '.env.local');
const env = join(__dirname, '..', '.env');
if (existsSync(envLocal)) config({ path: envLocal });
if (existsSync(env)) config({ path: env });

function resolveJwksUrl(): string | null {
  const jwksExplicit = process.env.SUPABASE_JWKS_URL?.trim();
  if (jwksExplicit) return jwksExplicit;
  const base = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  if (!base) return null;
  return `${base.replace(/\/$/, '')}/auth/v1/keys`;
}

async function main() {
  const jwksUrl = resolveJwksUrl();
  console.log('Resolved JWKS URL:', jwksUrl || '(none)');
  if (!jwksUrl) {
    console.log('Set SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_JWKS_URL)');
    process.exit(1);
  }
  try {
    const res = await fetch(jwksUrl, { method: 'GET' });
    console.log('HTTP status:', res.status, res.statusText);
    const ctype = res.headers.get('content-type');
    console.log('Content-Type:', ctype);
    const text = await res.text();
    console.log('Body (truncated to 500 chars):');
    console.log(text.slice(0, 500));
  } catch (e) {
    console.error('Fetch error:', e);
    process.exit(1);
  }
}

main();


