import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UpdateCourseSchema } from '@/lib/validators/courses';
import { getAuthContextFromRequest, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(req);
  if (!hasPermission(ctx, 'course:update')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const json = await req.json();
    const input = UpdateCourseSchema.parse(json);
    const course = await prisma.course.update({
      where: { id: params.id },
      data: { ...input, updatedAt: new Date() },
    });
    return NextResponse.json({ success: true, data: course });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}



