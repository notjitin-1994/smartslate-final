export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withPermission } from '@/middleware/rbac';

// Get database statistics (requires database:manage permission)
export const GET = withPermission('database:manage', async (_req: NextRequest) => {
  try {
    // Get table stats
    const [
      usersCount,
      coursesCount,
      courseWaitlistCount,
      solaraWaitlistCount,
      ssaInquiriesCount,
      caseStudiesCount,
      partnersCount,
      rolesCount,
      userRolesCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.courseWaitlistLead.count(),
      prisma.solaraWaitlistLead.count(),
      prisma.ssaInquiry.count(),
      prisma.caseStudyRequest.count(),
      prisma.partnerInquiry.count(),
      prisma.role.count(),
      prisma.userRole.count()
    ]);

    const tables = [
      { name: 'users', records: usersCount, lastModified: new Date().toISOString() },
      { name: 'courses', records: coursesCount, lastModified: new Date().toISOString() },
      { name: 'course_waitlist_leads', records: courseWaitlistCount, lastModified: new Date().toISOString() },
      { name: 'solara_waitlist_leads', records: solaraWaitlistCount, lastModified: new Date().toISOString() },
      { name: 'ssa_inquiries', records: ssaInquiriesCount, lastModified: new Date().toISOString() },
      { name: 'case_study_requests', records: caseStudiesCount, lastModified: new Date().toISOString() },
      { name: 'partner_inquiries', records: partnersCount, lastModified: new Date().toISOString() },
      { name: 'roles', records: rolesCount, lastModified: new Date().toISOString() },
      { name: 'user_roles', records: userRolesCount, lastModified: new Date().toISOString() }
    ];

    return NextResponse.json({ ok: true, tables });
  } catch (error) {
    console.error('Failed to fetch database stats:', error);
    return NextResponse.json({ error: 'Failed to fetch database stats' }, { status: 500 });
  }
});
