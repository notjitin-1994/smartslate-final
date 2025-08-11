import prisma from '@/lib/prisma';

export async function reorderModules(moduleIdsInOrder: string[]): Promise<void> {
  await prisma.$transaction(
    moduleIdsInOrder.map((id, index) => prisma.module.update({ where: { id }, data: { order: index + 1, updatedAt: new Date() } }))
  );
}

export async function reorderLessons(lessonIdsInOrder: string[]): Promise<void> {
  await prisma.$transaction(
    lessonIdsInOrder.map((id, index) => prisma.lesson.update({ where: { id }, data: { order: index + 1, updatedAt: new Date() } }))
  );
}



