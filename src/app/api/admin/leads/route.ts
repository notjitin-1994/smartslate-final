export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withPermission } from '@/middleware/rbac';

// Read leads (requires lead:read)
export const GET = withPermission('lead:read', async (_req: NextRequest) => {
  const [waitlist, solara, ssa, caseStudies, partners] = await Promise.all([
    prisma.courseWaitlistLead.findMany({ take: 100, orderBy: { createdAt: 'desc' } }),
    prisma.solaraWaitlistLead.findMany({ take: 100, orderBy: { createdAt: 'desc' } }),
    prisma.ssaInquiry.findMany({ take: 100, orderBy: { createdAt: 'desc' } }),
    prisma.caseStudyRequest.findMany({ take: 100, orderBy: { createdAt: 'desc' } }),
    prisma.partnerInquiry.findMany({ take: 100, orderBy: { createdAt: 'desc' } }),
  ]);

  return NextResponse.json({ ok: true, data: { waitlist, solara, ssa, caseStudies, partners } });
});


