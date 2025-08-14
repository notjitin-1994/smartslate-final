'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedBrowserClient: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (cachedBrowserClient) return cachedBrowserClient;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
  if (!url || !anon) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  cachedBrowserClient = createClient(url, anon, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
  return cachedBrowserClient;
}



