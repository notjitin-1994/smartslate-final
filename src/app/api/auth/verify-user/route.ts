export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ensureDefaultRolesForUser } from '@/lib/rbac-db';
import { randomUUID } from 'crypto';

/**
 * Verifies if a user exists in the database and creates them if they don't.
 * This is used to sync Stack Auth users with our database.
 */
export const POST = async (req: NextRequest) => {
  try {
    const { email, name, company } = await req.json();

    if (!email) {
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      // Create new user
      console.log(`Creating new user for ${email} in database...`);
      user = await prisma.user.create({
        data: {
          id: randomUUID(),
          email,
          name: name || null,
          company: company || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log(`User created with ID: ${user.id}`);

      // Assign default role
      const roles = await ensureDefaultRolesForUser(user.id, email);
      console.log(`Roles assigned: ${roles.join(', ')}`);
    } else {
      console.log(`User ${email} already exists in database`);
    }

    return NextResponse.json({ 
      ok: true, 
      userId: user.id,
      email: user.email,
      name: user.name,
      isNew: !user
    });
  } catch (error) {
    console.error('Error in verify-user:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
};