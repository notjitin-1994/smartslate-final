import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthContextFromRequest } from '@/lib/auth';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(req);
  if (!ctx.sub) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const userId = ctx.sub;
    const courseId = params.id;

    const enrollment = await prisma.userCourse.upsert({
      where: { userId_courseId: { userId, courseId } },
      create: { id: randomUUID(), userId, courseId },
      update: {},
    });

    return NextResponse.json({ success: true, data: enrollment });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}


