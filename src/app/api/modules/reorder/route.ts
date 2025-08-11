import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ReorderModulesSchema } from '@/lib/validators/modules';
import { getAuthContextFromRequest, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ctx = await getAuthContextFromRequest(req);
  if (!hasPermission(ctx, 'course:update')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const body = await req.json();
    const { moduleIdsInOrder } = ReorderModulesSchema.parse(body);
    await prisma.$transaction(
      moduleIdsInOrder.map((id, idx) =>
        prisma.module.update({ where: { id }, data: { order: idx + 1, updatedAt: new Date() } })
      )
    );
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}



