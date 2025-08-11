import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UpdateLessonSchema } from '@/lib/validators/lessons';
import { getAuthContextFromRequest, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(req);
  if (!hasPermission(ctx, 'course:update')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const json = await req.json();
    const input = UpdateLessonSchema.parse(json);
    const lesson = await prisma.lesson.update({
      where: { id: params.id },
      data: { ...input, updatedAt: new Date() },
    });
    return NextResponse.json({ success: true, data: lesson });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(req);
  if (!hasPermission(ctx, 'course:delete')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    await prisma.lesson.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}



