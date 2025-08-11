import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthContextFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(req);
  if (!ctx.sub) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const userId = ctx.sub;
    const courseId = params.id;
    await prisma.userCourse.delete({ where: { userId_courseId: { userId, courseId } } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}


