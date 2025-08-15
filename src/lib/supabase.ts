import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { withOptionalInsecureTLS } from './fetch';

let cachedAnon: SupabaseClient | null = null;

export function getSupabaseAnon(): SupabaseClient {
  if (cachedAnon) return cachedAnon;
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  if (!url || !anon) throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  cachedAnon = createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: (input, init) => fetch(input, withOptionalInsecureTLS(init)),
    },
  });
  return cachedAnon;
}

export function getSupabaseService(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, service, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: (input, init) => fetch(input, withOptionalInsecureTLS(init)),
    },
  });
}

export function getPostgrestServiceUrl(): string {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error('Missing SUPABASE_URL');
  return (url.endsWith('/') ? url.slice(0, -1) : url) + '/rest/v1';
}

export function getPostgrestServiceHeaders(schema: string): Record<string, string> {
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!service) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  return {
    apikey: service,
    Authorization: `Bearer ${service}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Content-Profile': schema,
    'Accept-Profile': schema,
    Prefer: 'resolution=merge-duplicates,return=representation',
  };
}


