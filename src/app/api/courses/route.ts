export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Public endpoint to get all published courses (no auth required)
export async function GET(req: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
