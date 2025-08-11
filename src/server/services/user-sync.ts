import prisma from '@/lib/prisma';
import { listAuthUsers, createAuthUser } from '@/lib/stack-auth';

export interface SyncSummary {
  createdInDb: number;
  updatedInDb: number;
  createdInAuth: number;
  updatedInAuth: number;
  errors: string[];
}

export async function syncUsersBothWays(): Promise<SyncSummary> {
  const errors: string[] = [];
  const summary: SyncSummary = { createdInDb: 0, updatedInDb: 0, createdInAuth: 0, updatedInAuth: 0, errors };

  // 1) Fetch auth provider users
  const authList = await listAuthUsers();
  const authUsers = authList.ok ? authList.users : [];

  // 2) Build maps for quick lookup
  const authByEmail = new Map<string, string>(); // email -> authId
  for (const u of authUsers) {
    if (u.email) authByEmail.set(u.email.toLowerCase(), u.id);
  }

  // 3) Sync DB from Auth
  for (const u of authUsers) {
    const email = u.email?.toLowerCase();
    if (!email) continue;
    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (!existing) {
        await prisma.user.create({
          data: {
            id: u.id,
            email,
            name: u.name ?? null,
            stackAuthId: u.id,
            updatedAt: new Date(),
          },
        });
        summary.createdInDb += 1;
      } else {
        const updates: any = {};
        if (!existing.stackAuthId) updates.stackAuthId = u.id;
        if (!existing.name && u.name) updates.name = u.name;
        if (Object.keys(updates).length > 0) {
          updates.updatedAt = new Date();
          await prisma.user.update({ where: { id: existing.id }, data: updates });
          summary.updatedInDb += 1;
        }
      }
    } catch (e: any) {
      errors.push(`DB sync from auth failed for ${email}: ${e.message}`);
    }
  }

  // 4) Sync Auth from DB
  const dbUsers = await prisma.user.findMany({ select: { id: true, email: true, name: true, stackAuthId: true } });
  for (const u of dbUsers) {
    if (!u.email) continue;
    const email = u.email.toLowerCase();
    const authId = authByEmail.get(email);
    if (!authId) {
      // create in auth
      try {
        const res = await createAuthUser({ email, name: u.name ?? undefined });
        if (res.ok && res.id) {
          await prisma.user.update({ where: { id: u.id }, data: { stackAuthId: res.id, updatedAt: new Date() } });
          summary.createdInAuth += 1;
        } else {
          errors.push(`Auth create failed for ${email}: ${res.error || 'unknown'}`);
        }
      } catch (e: any) {
        errors.push(`Auth create failed for ${email}: ${e.message}`);
      }
    } else if (!u.stackAuthId) {
      // update db to link auth id
      await prisma.user.update({ where: { id: u.id }, data: { stackAuthId: authId, updatedAt: new Date() } });
      summary.updatedInDb += 1;
    }
  }

  return summary;
}



