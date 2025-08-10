export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { withPermission } from '@/middleware/rbac';

// Create or update a course (requires course:create)
export const POST = withPermission('course:create', async (req: NextRequest) => {
  const body = await req.json();

  const course = await prisma.course.upsert({
    where: { slug: body.slug },
    create: {
      id: body.id,
      title: body.title,
      description: body.description,
      slug: body.slug,
      imageUrl: body.imageUrl ?? null,
      price: body.price ?? null,
      duration: body.duration ?? null,
      level: body.level ?? null,
      category: body.category ?? null,
      published: false,
      updatedAt: new Date(),
    },
    update: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl ?? null,
      price: body.price ?? null,
      duration: body.duration ?? null,
      level: body.level ?? null,
      category: body.category ?? null,
      updatedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true, course });
});

// Publish/unpublish (requires course:publish)
export const PATCH = withPermission('course:publish', async (req: NextRequest) => {
  const body = await req.json();
  const course = await prisma.course.update({
    where: { slug: body.slug },
    data: { published: body.published }
  });
  return NextResponse.json({ ok: true, course });
});

// Delete course (requires course:delete)
export const DELETE = withPermission('course:delete', async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }

  await prisma.course.delete({
    where: { slug }
  });
  
  return NextResponse.json({ ok: true, message: 'Course deleted successfully' });
});


