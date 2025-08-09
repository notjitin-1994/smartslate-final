import { NextRequest, NextResponse } from 'next/server';
import { getAuthContextFromRequest, hasPermission } from '@/lib/auth';
import type { Permission } from '@/config/rbac';

export type Guard = (req: NextRequest) => Promise<NextResponse | null>;

export function withPermission(required: Permission, handler: (req: NextRequest, ctx: Awaited<ReturnType<typeof getAuthContextFromRequest>>) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const auth = await getAuthContextFromRequest(req);
    if (!hasPermission(auth, required)) {
      return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
    }
    return handler(req, auth);
  };
}

export function withAuth(handler: (req: NextRequest, ctx: Awaited<ReturnType<typeof getAuthContextFromRequest>>) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const auth = await getAuthContextFromRequest(req);
    if (!auth.sub) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req, auth);
  };
}


