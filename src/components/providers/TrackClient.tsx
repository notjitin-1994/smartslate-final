'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function parseUtm(search: string) {
  const params = new URLSearchParams(search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = params.get(k);
    if (v) out[k] = v;
  }
  return out;
}

async function postJSON(url: string, body: any) {
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
  } catch {}
}

export default function TrackClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Tracking backend removed; stubbed
  }, []);

  useEffect(() => {
    const search = searchParams?.toString() || '';
    const payload = {
      pathname,
      search,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      utm: parseUtm(search),
      viewport: {
        w: typeof window !== 'undefined' ? window.innerWidth : null,
        h: typeof window !== 'undefined' ? window.innerHeight : null,
      },
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };
    // Tracking backend removed; stubbed
  }, [pathname, searchParams]);

  return null;
}
