export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withPermission } from '@/middleware/rbac';

// Read-only metrics (requires metrics:read)
export const GET = withPermission('metrics:read', async (_req: NextRequest) => {
  console.log('=== ADMIN METRICS REQUEST ===');
  console.log('Timestamp:', new Date().toISOString());
  
  const [leadsCount, coursesCount, usersCount] = await Promise.all([
    prisma.courseWaitlistLead.count(),
    prisma.course.count(),
    prisma.user.count(),
  ]);
  
  console.log('📊 Database counts:', { leadsCount, coursesCount, usersCount });
  
  return NextResponse.json({ ok: true, data: { leadsCount, coursesCount, usersCount } });
});


