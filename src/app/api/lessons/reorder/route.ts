import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ReorderLessonsSchema } from '@/lib/validators/lessons';
import { getAuthContextFromRequest, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ctx = await getAuthContextFromRequest(req);
  if (!hasPermission(ctx, 'course:update')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const body = await req.json();
    const { moduleId, lessonIdsInOrder } = ReorderLessonsSchema.parse(body);

    // Ensure all provided lessons belong to the module
    const lessons = await prisma.lesson.findMany({ where: { id: { in: lessonIdsInOrder } } });
    const allBelong = lessons.every((l) => l.moduleId === moduleId);
    if (!allBelong) return NextResponse.json({ success: false, error: 'Lessons must belong to the same module' }, { status: 400 });

    await prisma.$transaction(
      lessonIdsInOrder.map((id, idx) =>
        prisma.lesson.update({ where: { id }, data: { order: idx + 1, updatedAt: new Date() } })
      )
    );
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}



