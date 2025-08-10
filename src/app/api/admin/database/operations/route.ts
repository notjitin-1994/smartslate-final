export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withPermission } from '@/middleware/rbac';
import { seedRoles } from '@/lib/rbac-db';

// Database operations (requires database:manage permission)
export const POST = withPermission('database:manage', async (req: NextRequest) => {
  try {
    const { action } = await req.json();

    switch (action) {
      case 'export':
        // Export database - return summary for now
        const exportData = {
          users: await prisma.user.count(),
          courses: await prisma.course.count(),
          leads: {
            courseWaitlist: await prisma.courseWaitlistLead.count(),
            solaraWaitlist: await prisma.solaraWaitlistLead.count(),
            ssaInquiries: await prisma.ssaInquiry.count(),
            caseStudies: await prisma.caseStudyRequest.count(),
            partners: await prisma.partnerInquiry.count()
          }
        };
        return NextResponse.json({ ok: true, message: 'Export ready', data: exportData });

      case 'clear':
        // Clear test data (keep essential data)
        const jitin = await prisma.user.findUnique({ where: { email: 'jitin@smartslate.io' } });
        
        // Clear leads
        await Promise.all([
          prisma.courseWaitlistLead.deleteMany(),
          prisma.solaraWaitlistLead.deleteMany(),
          prisma.ssaInquiry.deleteMany(),
          prisma.caseStudyRequest.deleteMany(),
          prisma.partnerInquiry.deleteMany()
        ]);

        // Clear non-essential users (keep jitin@smartslate.io)
        if (jitin) {
          await prisma.userRole.deleteMany({
            where: { userId: { not: jitin.id } }
          });
          await prisma.user.deleteMany({
            where: { id: { not: jitin.id } }
          });
        }

        return NextResponse.json({ ok: true, message: 'Test data cleared successfully' });

      case 'seed':
        // Seed roles
        await seedRoles();
        
        // Ensure jitin@smartslate.io has owner role
        const jitinUser = await prisma.user.findUnique({ where: { email: 'jitin@smartslate.io' } });
        if (jitinUser) {
          await prisma.userRole.upsert({
            where: { userId_roleId: { userId: jitinUser.id, roleId: 'owner' } },
            create: { userId: jitinUser.id, roleId: 'owner' },
            update: {}
          });
        }

        return NextResponse.json({ ok: true, message: 'Roles seeded successfully' });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Database operation failed:', error);
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  }
});
