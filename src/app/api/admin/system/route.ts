export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withPermission } from '@/middleware/rbac';
import { seedRoles } from '@/lib/rbac-db';

// Seed or sync roles (requires settings:write)
export const POST = withPermission('settings:write', async (_req: NextRequest) => {
  await seedRoles();
  return NextResponse.json({ ok: true });
});


