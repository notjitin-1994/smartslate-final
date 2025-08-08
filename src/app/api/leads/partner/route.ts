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

    const title: string = body.title || 'Partner Inquiry';
    const data: Record<string, any> = body.data || {};

    const inquiry = await prisma.partnerInquiry.create({
      data: {
        anonymousId,
        title,
        data,
        contactEmail: (data.email as string) || null,
        contactName: (data.name as string) || null,
      },
    });

    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error?.message || 'Failed to save' },
      { status: 500 }
    );
  }
}


