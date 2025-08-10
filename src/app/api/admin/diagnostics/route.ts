export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withPermission } from '@/middleware/rbac';

export const GET = withPermission('metrics:read', async () => {
  const [count, rows] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({ select: { email: true }, take: 10, orderBy: { createdAt: 'desc' } }),
  ]);
  const url = process.env.DATABASE_URL || '';
  let info: { host: string | null; db: string | null } = { host: null, db: null };
  try {
    const u = new URL(url);
    info = { host: u.hostname, db: u.pathname.replace(/^\//, '') || null };
  } catch {}
  return NextResponse.json({ ok: true, data: { count, emails: rows.map((r) => r.email), db: info } });
});
