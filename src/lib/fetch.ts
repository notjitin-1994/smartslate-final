import type { Agent as UndiciAgent } from 'undici';
import { Agent } from 'undici';

let insecureDispatcher: UndiciAgent | null = null;

function getOptionalDispatcher(): UndiciAgent | undefined {
  // Enable only when explicitly allowed (useful behind corporate proxies with MITM certs)
  if (process.env.ALLOW_INSECURE_TLS_OUTBOUND === '1') {
    if (!insecureDispatcher) {
      insecureDispatcher = new Agent({ connect: { tls: { rejectUnauthorized: false } } });
    }
    return insecureDispatcher;
  }
  return undefined;
}

export function withOptionalInsecureTLS(init?: RequestInit): RequestInit {
  const dispatcher = getOptionalDispatcher();
  return dispatcher ? { ...(init || {}), dispatcher } : (init || {});
}

export function insecureAwareFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  return fetch(input as any, withOptionalInsecureTLS(init) as any);
}


