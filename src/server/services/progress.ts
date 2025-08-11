import prisma from '@/lib/prisma';

export async function recalcCourseProgress(userId: string, courseId: string): Promise<{ progressPct: number; totalLessons: number; completedLessons: number }> {
  const modules = await prisma.module.findMany({ where: { courseId }, select: { id: true } });
  const moduleIds = modules.map((m) => m.id);
  if (moduleIds.length === 0) {
    await prisma.userCourse.update({
      where: { userId_courseId: { userId, courseId } },
      data: { progress: 0, progressPct: 0 },
    }).catch(() => undefined);
    return { progressPct: 0, totalLessons: 0, completedLessons: 0 };
  }

  const totalLessons = await prisma.lesson.count({ where: { moduleId: { in: moduleIds } } });
  if (totalLessons === 0) {
    await prisma.userCourse.update({
      where: { userId_courseId: { userId, courseId } },
      data: { progress: 0, progressPct: 0 },
    }).catch(() => undefined);
    return { progressPct: 0, totalLessons: 0, completedLessons: 0 };
  }

  const completedLessons = await prisma.userLessonProgress.count({
    where: { userId, completed: true, Lesson: { moduleId: { in: moduleIds } } },
  });

  const pct = Math.round((completedLessons / totalLessons) * 100);

  await prisma.userCourse.update({
    where: { userId_courseId: { userId, courseId } },
    data: {
      progress: completedLessons / totalLessons,
      progressPct: pct,
      completedAt: pct === 100 ? new Date() : null,
    },
  }).catch(() => undefined);

  return { progressPct: pct, totalLessons, completedLessons };
}



