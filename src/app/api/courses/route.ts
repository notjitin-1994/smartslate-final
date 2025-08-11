import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { CreateCourseSchema } from '@/lib/validators/courses';
import { getAuthContextFromRequest, hasPermission } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Create a course (Admin/Instructor)
export async function POST(req: NextRequest) {
  const ctx = await getAuthContextFromRequest(req);
  if (!hasPermission(ctx, 'course:create')) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
  }
  try {
    const json = await req.json();
    const input = CreateCourseSchema.parse(json);
    const course = await prisma.course.create({
      data: {
        id: input.slug,
        slug: input.slug,
        title: input.title,
        description: input.description ?? '',
        published: input.published ?? false,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, data: course });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message ?? 'Invalid request' }, { status: 400 });
  }
}

// List courses (public)
export async function GET(_req: NextRequest) {
  try {
    const courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json({ success: true, data: courses });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message ?? 'Failed to fetch courses' }, { status: 500 });
  }
}
