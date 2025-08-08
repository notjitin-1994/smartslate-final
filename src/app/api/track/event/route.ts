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
  }

  const now = new Date();
  const nowIso = now.toISOString();

  const record = await prisma.anonymousUserActivity.findUnique({
    where: { anonymousId: anonId },
    select: { pageViews: true, interactions: true },
  });

  if (type === 'pageview') {
    if (record) {
      const pageViews = Array.isArray(record.pageViews) ? (record.pageViews as any[]) : [];
      pageViews.push({ ...data, ts: nowIso });
      await prisma.anonymousUserActivity.update({
        where: { anonymousId: anonId },
        data: { pageViews, updatedAt: now },
      });
    } else {
      await prisma.anonymousUserActivity.create({
        data: {
          id: randomUUID(),
          anonymousId: anonId,
          pageViews: [{ ...data, ts: nowIso }],
          interactions: [],
          courseViews: [],
          updatedAt: now,
        },
      });
    }
  } else if (type === 'interaction') {
    if (record) {
      const interactions = Array.isArray(record.interactions) ? (record.interactions as any[]) : [];
      interactions.push({ ...data, ts: nowIso });
      await prisma.anonymousUserActivity.update({
        where: { anonymousId: anonId },
        data: { interactions, updatedAt: now },
      });
    } else {
      await prisma.anonymousUserActivity.create({
        data: {
          id: randomUUID(),
          anonymousId: anonId,
          pageViews: [],
          interactions: [{ ...data, ts: nowIso }],
          courseViews: [],
          updatedAt: now,
        },
      });
    }
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
