import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import prisma from '../../../../lib/prisma';

const COOKIE_NAME = 'anon_id';
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST(req: NextRequest) {
  const cookieStore = cookies() as any;
  let anonId = cookieStore.get(COOKIE_NAME)?.value as string | undefined;

  const body = await req.json().catch(() => ({} as any));
  const type = body?.type as string | undefined;
  const data = body?.data as any;

  if (!anonId) {
    anonId = randomUUID();
    await prisma.anonymousUserActivity.upsert({
      where: { anonymousId: anonId },
      create: {
        id: randomUUID(),
        anonymousId: anonId,
        pageViews: [],
        interactions: [],
        courseViews: [],
        updatedAt: new Date(),
      },
      update: { updatedAt: new Date() },
    });
  }

  const record = await prisma.anonymousUserActivity.findUnique({
    where: { anonymousId: anonId },
    select: { pageViews: true, interactions: true },
  });

  const nowIso = new Date().toISOString();

  if (type === 'pageview') {
    const pageViews = Array.isArray(record?.pageViews) ? (record?.pageViews as any[]) : [];
    pageViews.push({ ...data, ts: nowIso });

    await prisma.anonymousUserActivity.update({
      where: { anonymousId: anonId },
      data: {
        pageViews,
        updatedAt: new Date(),
      },
    });
  } else if (type === 'interaction') {
    const interactions = Array.isArray(record?.interactions) ? (record?.interactions as any[]) : [];
    interactions.push({ ...data, ts: nowIso });

    await prisma.anonymousUserActivity.update({
      where: { anonymousId: anonId },
      data: {
        interactions,
        updatedAt: new Date(),
      },
    });
  } else {
    return NextResponse.json({ ok: false, error: 'Invalid type' }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true, anonymousId: anonId });
  res.cookies.set({
    name: COOKIE_NAME,
    value: anonId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: ONE_YEAR,
  });

  return res;
}
