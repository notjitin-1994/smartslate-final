import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UpdateModuleSchema } from '@/lib/validators/modules';
import { getAuthContextFromRequest, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(req);
  if (!hasPermission(ctx, 'course:update')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const json = await req.json();
    const input = UpdateModuleSchema.parse(json);
    const module = await prisma.module.update({ where: { id: params.id }, data: { ...input, updatedAt: new Date() } });
    return NextResponse.json({ success: true, data: module });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const ctx = await getAuthContextFromRequest(_req);
  if (!hasPermission(ctx, 'course:delete')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    await prisma.module.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}



