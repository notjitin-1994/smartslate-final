import type { Agent as UndiciAgent, Dispatcher } from 'undici';
import { Agent } from 'undici';

let insecureDispatcher: UndiciAgent | null = null;

function getOptionalDispatcher(): UndiciAgent | undefined {
  // Enable only when explicitly allowed (useful behind corporate proxies with MITM certs)
  if (process.env.ALLOW_INSECURE_TLS_OUTBOUND === '1') {
    if (!insecureDispatcher) {
      insecureDispatcher = new Agent({ connect: { rejectUnauthorized: false } as any });
    }
    return insecureDispatcher;
  }
  return undefined;
}

export function withOptionalInsecureTLS(init?: RequestInit & { dispatcher?: Dispatcher }): RequestInit & { dispatcher?: Dispatcher } {
  const dispatcher = getOptionalDispatcher();
  return dispatcher ? { ...(init || {}), dispatcher } : (init || {});
}

export function insecureAwareFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  return fetch(input as any, withOptionalInsecureTLS(init) as any);
}


