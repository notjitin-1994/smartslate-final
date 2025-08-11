import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CreateModuleSchema } from '@/lib/validators/modules';
import { getAuthContextFromRequest, hasPermission } from '@/lib/auth';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

// Create a module in a course
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(req);
  if (!hasPermission(ctx, 'course:update')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const json = await req.json();
    const input = CreateModuleSchema.parse({ ...json, courseId: params.id });
    const currentMax = await prisma.module.aggregate({
      where: { courseId: input.courseId },
      _max: { order: true },
    });
    const nextOrder = (currentMax._max.order ?? 0) + 1;
    const module = await prisma.module.create({
      data: {
        id: randomUUID(),
        courseId: input.courseId,
        title: input.title,
        description: input.description ?? null,
        order: nextOrder,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, data: module });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}


