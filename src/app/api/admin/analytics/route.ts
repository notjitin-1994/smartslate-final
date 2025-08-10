export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withPermission } from '@/middleware/rbac';
import prisma from '@/lib/prisma';

// Get analytics data (requires metrics:read permission)
export const GET = withPermission('metrics:read', async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get('timeRange') || '7d';

    // Calculate date range
    const now = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case '24h':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Get lead counts
    const [
      courseWaitlistCount,
      solaraWaitlistCount,
      ssaInquiriesCount,
      caseStudiesCount,
      partnersCount,
      totalUsers,
      totalCourses
    ] = await Promise.all([
      prisma.courseWaitlistLead.count({
        where: { createdAt: { gte: startDate } }
      }),
      prisma.solaraWaitlistLead.count({
        where: { createdAt: { gte: startDate } }
      }),
      prisma.ssaInquiry.count({
        where: { createdAt: { gte: startDate } }
      }),
      prisma.caseStudyRequest.count({
        where: { createdAt: { gte: startDate } }
      }),
      prisma.partnerInquiry.count({
        where: { createdAt: { gte: startDate } }
      }),
      prisma.user.count(),
      prisma.course.count({ where: { published: true } })
    ]);

    const totalLeads = courseWaitlistCount + solaraWaitlistCount + ssaInquiriesCount + caseStudiesCount + partnersCount;

    // Generate daily data for the time range
    const days = timeRange === '24h' ? 24 : parseInt(timeRange);
    const leadsOverTime = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = timeRange === '24h' 
        ? `${date.getHours()}:00`
        : date.toLocaleDateString('en-US', { weekday: 'short' });
      
      // Simulate lead data (in production, you'd query actual data)
      leadsOverTime.push({
        date: dayName,
        leads: Math.floor(Math.random() * 20) + 10
      });
    }

    // Calculate metrics
    const previousPeriodLeads = Math.floor(totalLeads * 0.85); // Simulated
    const leadsChange = ((totalLeads - previousPeriodLeads) / previousPeriodLeads * 100).toFixed(1);
    
    const analytics = {
      metrics: {
        totalLeads: { value: totalLeads, change: parseFloat(leadsChange), trend: parseFloat(leadsChange) > 0 ? 'up' : 'down' },
        conversionRate: { value: 2.5, change: 0.3, trend: 'up' },
        avgDealSize: { value: 4500, change: 8.2, trend: 'up' },
        activeUsers: { value: totalUsers, change: 5.1, trend: 'up' },
      },
      leadsOverTime,
      leadsBySource: [
        { name: 'Course Waitlist', value: courseWaitlistCount, color: '#06b6d4' },
        { name: 'Solara', value: solaraWaitlistCount, color: '#8b5cf6' },
        { name: 'SSA', value: ssaInquiriesCount, color: '#10b981' },
        { name: 'Partners', value: partnersCount, color: '#f59e0b' },
        { name: 'Case Studies', value: caseStudiesCount, color: '#ef4444' },
      ],
      conversionFunnel: [
        { stage: 'Visitors', count: 1000 },
        { stage: 'Leads', count: totalLeads },
        { stage: 'Qualified', count: Math.floor(totalLeads * 0.4) },
        { stage: 'Customers', count: Math.floor(totalLeads * 0.1) },
      ],
      totalCourses,
      totalUsers
    };

    return NextResponse.json({ ok: true, analytics });
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
});
