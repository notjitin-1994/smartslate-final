import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';
import prisma from '../../../../lib/prisma';

const COOKIE_NAME = 'anon_id';
const ONE_YEAR = 60 * 60 * 24 * 365;

export async function POST() {
  const cookieStore = cookies() as any;
  let anonId = cookieStore.get(COOKIE_NAME)?.value as string | undefined;

  if (!anonId) {
    anonId = randomUUID();
  }

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
    update: {
      updatedAt: new Date(),
    },
  });

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
