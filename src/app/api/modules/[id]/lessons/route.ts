import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CreateLessonSchema } from '@/lib/validators/lessons';
import { getAuthContextFromRequest, hasPermission } from '@/lib/auth';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(req);
  if (!hasPermission(ctx, 'course:update')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const json = await req.json();
    const input = CreateLessonSchema.parse({ ...json, moduleId: params.id });

    const currentMax = await prisma.lesson.aggregate({ where: { moduleId: input.moduleId }, _max: { order: true } });
    const nextOrder = (currentMax._max.order ?? 0) + 1;

    const lesson = await prisma.lesson.create({
      data: {
        id: randomUUID(),
        moduleId: input.moduleId,
        title: input.title,
        type: input.type,
        order: nextOrder,
        metadata: input.metadata ?? undefined,
        textContent: input.textContent ?? null,
        videoUrl: input.videoUrl ?? null,
        fileUrl: input.fileUrl ?? null,
        quizSpec: input.quizSpec ?? null,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, data: lesson });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}


