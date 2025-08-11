import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthContextFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const ctx = await getAuthContextFromRequest(req);
  if (!ctx.sub) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    // For each enrolled course, find next uncompleted lesson by Module.order then Lesson.order
    const enrollments = await prisma.userCourse.findMany({ where: { userId: ctx.sub }, select: { courseId: true } });
    const results: Array<{ courseId: string; lessonId: string | null }> = [];
    for (const { courseId } of enrollments) {
      const modules = await prisma.module.findMany({ where: { courseId }, orderBy: { order: 'asc' }, select: { id: true } });
      const moduleIds = modules.map((m) => m.id);
      if (moduleIds.length === 0) {
        results.push({ courseId, lessonId: null });
        continue;
      }
      const next = await prisma.lesson.findFirst({
        where: {
          moduleId: { in: moduleIds },
          userProgress: { none: { userId: ctx.sub, completed: true } },
        },
        orderBy: [{ Module: { order: 'asc' } }, { order: 'asc' }],
        select: { id: true },
      });
      results.push({ courseId, lessonId: next?.id ?? null });
    }
    return NextResponse.json({ success: true, data: results });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Failed' }, { status: 400 });
  }
}



