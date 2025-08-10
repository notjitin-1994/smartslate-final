export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withPermission } from '@/middleware/rbac';

// Delete a specific lead (requires lead:delete permission)
export const DELETE = withPermission('lead:delete', async (
  req: NextRequest,
  { params }: { params: { leadType: string; leadId: string } }
) => {
  try {
    const { leadType, leadId } = params;

    switch (leadType) {
      case 'waitlist':
        await prisma.courseWaitlistLead.delete({
          where: { id: leadId }
        });
        break;
      case 'solara':
        await prisma.solaraWaitlistLead.delete({
          where: { id: leadId }
        });
        break;
      case 'ssa':
        await prisma.ssaInquiry.delete({
          where: { id: leadId }
        });
        break;
      case 'caseStudies':
        await prisma.caseStudyRequest.delete({
          where: { id: leadId }
        });
        break;
      case 'partners':
        await prisma.partnerInquiry.delete({
          where: { id: leadId }
        });
        break;
      default:
        return NextResponse.json({ error: 'Invalid lead type' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Failed to delete lead:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
});
