import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthContextFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const ctx = await getAuthContextFromRequest(req);
  if (!ctx.sub) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await prisma.userCourse.findMany({
      where: { userId: ctx.sub },
      include: { Course: true },
      orderBy: { enrolledAt: 'desc' },
    });
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Failed' }, { status: 400 });
  }
}



