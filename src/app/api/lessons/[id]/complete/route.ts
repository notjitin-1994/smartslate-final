import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthContextFromRequest } from '@/lib/auth';
import { recalcCourseProgress } from '@/server/services/progress';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(req);
  if (!ctx.sub) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const userId = ctx.sub;
    const lessonId = params.id;

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId }, include: { Module: true } });
    if (!lesson) return NextResponse.json({ success: false, error: 'Lesson not found' }, { status: 404 });

    const existing = await prisma.userLessonProgress.findUnique({ where: { userId_lessonId: { userId, lessonId } } });
    let completedNow = true;
    if (!existing) {
      await prisma.userLessonProgress.create({
        data: { id: randomUUID(), userId, lessonId, completed: true, completedAt: new Date() },
      });
    } else {
      completedNow = !existing.completed;
      await prisma.userLessonProgress.update({
        where: { userId_lessonId: { userId, lessonId } },
        data: { completed: completedNow, completedAt: completedNow ? new Date() : null },
      });
    }

    // Ensure enrollment exists and startedAt set
    const existingEnroll = await prisma.userCourse.findUnique({ where: { userId_courseId: { userId, courseId: lesson.Module.courseId } } });
    if (!existingEnroll) {
      await prisma.userCourse.create({ data: { id: randomUUID(), userId, courseId: lesson.Module.courseId, startedAt: new Date() } });
    } else if (!existingEnroll.startedAt) {
      await prisma.userCourse.update({ where: { userId_courseId: { userId, courseId: lesson.Module.courseId } }, data: { startedAt: new Date() } });
    }

    const result = await recalcCourseProgress(userId, lesson.Module.courseId);

    return NextResponse.json({ success: true, data: { toggled: true, completed: completedNow, ...result } });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}


