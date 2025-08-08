export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = cookies() as any;
    const anonymousId = cookieStore.get('anon_id')?.value as string | undefined;

    const created = await prisma.courseWaitlistLead.create({
      data: {
        anonymousId,
        courseSlug: body.courseSlug ?? null,
        courseName: body.courseName ?? null,
        name: body.name,
        email: body.email,
        phone: body.phone ?? null,
        company: body.company ?? null,
        role: body.role ?? null,
        teamSize: body.teamSize ?? null,
        learningGoals: body.learningGoals,
        preferredStartDate: body.preferredStartDate ?? null,
        learningFormat: body.learningFormat,
        experience: body.experience ?? null,
        referralSource: body.referralSource ?? null,
        additionalInfo: body.additionalInfo ?? null,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Failed to save' },
      { status: 500 }
    );
  }
}


