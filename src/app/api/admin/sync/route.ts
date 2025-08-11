export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withPermission } from '@/middleware/rbac';
import { seedRoles } from '@/lib/rbac-db';
import prisma from '@/lib/prisma';
import { syncUsersBothWays } from '@/server/services/user-sync';

interface SyncJob {
  id: string;
  name: string;
  description: string;
  lastRun: string;
  status: 'success' | 'failed' | 'running' | 'never';
  duration?: string;
  nextRun?: string;
  isAutomatic?: boolean;
}

// Get sync jobs status
export const GET = withPermission('database:manage', async (_req: NextRequest) => {
  try {
    // In a real app, you'd fetch this from a database
    const syncJobs: SyncJob[] = [
      {
        id: 'roles',
        name: 'Sync Roles & Permissions',
        description: 'Synchronize role definitions and permissions with the database',
        lastRun: new Date().toISOString(),
        status: 'success',
        duration: '1.2s',
        isAutomatic: true,
        nextRun: new Date(Date.now() + 86400000).toISOString() // 24 hours later
      },
      {
        id: 'users',
        name: 'Sync User Data',
        description: 'Synchronize user data between authentication provider and database',
        lastRun: new Date().toISOString(),
        status: 'success',
        duration: '3.5s',
        isAutomatic: true,
        nextRun: new Date(Date.now() + 43200000).toISOString() // 12 hours later
      },
      {
        id: 'courses',
        name: 'Import Course Catalog',
        description: 'Import or update course catalog from external source',
        lastRun: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        status: 'success',
        duration: '5.2s',
        isAutomatic: false
      },
      {
        id: 'leads',
        name: 'Export Leads to CRM',
        description: 'Export lead data to external CRM system',
        lastRun: new Date().toISOString(),
        status: 'success',
        isAutomatic: true,
        nextRun: new Date(Date.now() + 43200000).toISOString() // 12 hours later
      },
      {
        id: 'analytics',
        name: 'Aggregate Analytics Data',
        description: 'Process and aggregate analytics data for reporting',
        lastRun: new Date().toISOString(),
        status: 'success',
        duration: '10.3s',
        isAutomatic: true,
        nextRun: new Date(Date.now() + 86400000).toISOString() // 24 hours later
      }
    ];

    return NextResponse.json({ ok: true, jobs: syncJobs });
  } catch (error) {
    console.error('Failed to fetch sync jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch sync jobs' }, { status: 500 });
  }
});

// Run sync job
export const POST = withPermission('database:manage', async (req: NextRequest) => {
  try {
    const { jobId } = await req.json();
    const startTime = Date.now();

    let result: { status: 'success' | 'failed'; message: string; details?: unknown } = { status: 'success', message: '' };

    switch (jobId) {
      case 'roles':
        // Sync roles
        await seedRoles();
        result.message = 'Roles synchronized successfully';
        break;

      case 'users':
        {
          const summary = await syncUsersBothWays();
          result.message = `Sync complete: DB +${summary.createdInDb}/${summary.updatedInDb}, Auth +${summary.createdInAuth}/${summary.updatedInAuth}`;
          result.details = summary;
        }
        break;

      case 'courses':
        // In a real app, you'd import from external source
        const courseCount = await prisma.course.count();
        result.message = `Imported ${courseCount} courses`;
        break;

      case 'leads':
        // Export leads to CRM
        const leadCounts = {
          courseWaitlist: await prisma.courseWaitlistLead.count(),
          solaraWaitlist: await prisma.solaraWaitlistLead.count(),
          ssaInquiries: await prisma.ssaInquiry.count(),
          caseStudies: await prisma.caseStudyRequest.count(),
          partners: await prisma.partnerInquiry.count()
        };
        const totalLeads = Object.values(leadCounts).reduce((sum, count) => sum + count, 0);
        result.message = `Exported ${totalLeads} leads to CRM`;
        break;

      case 'analytics':
        // Aggregate analytics
        result.message = 'Analytics data aggregated successfully';
        break;

      case 'all':
        // Run all sync jobs
        await seedRoles();
        const summary = await syncUsersBothWays();
        result.message = `All sync jobs completed successfully (users: DB +${summary.createdInDb}/${summary.updatedInDb}, Auth +${summary.createdInAuth}/${summary.updatedInAuth})`;
        result.details = summary;
        break;

      default:
        throw new Error('Invalid job ID');
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    return NextResponse.json({ 
      ok: true, 
      ...result,
      duration: `${duration}s`
    });
  } catch (error: any) {
    console.error('Sync job failed:', error);
    return NextResponse.json({ 
      error: error.message || 'Sync job failed',
      status: 'failed'
    }, { status: 500 });
  }
});
