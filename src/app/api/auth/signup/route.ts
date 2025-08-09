export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { seedRoles, assignRoleToUser } from '@/lib/rbac-db';
import { createAuthUser } from '@/lib/stack-auth';
import { randomUUID } from 'crypto';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST = async (req: NextRequest) => {
  try {
    const { email, firstName, lastName, company } = (await req.json()) as {
      email?: string;
      password?: string;
      confirmPassword?: string;
      firstName?: string;
      lastName?: string;
      company?: string;
    };

    console.log('Signup API called with:', { email, firstName, lastName, company });

    if (!email || !isValidEmail(email)) {
      console.error('Invalid email provided:', email);
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const name = [firstName, lastName].filter(Boolean).join(' ').trim() || null;

    // Upsert User record in RBAC User table
    let user = await prisma.user.findUnique({ where: { email } });
    console.log('Existing user found:', !!user);
    
    if (!user) {
      console.log('Creating new user in database...');
      user = await prisma.user.create({
        data: {
          id: randomUUID(),
          email,
          name,
          company: company || null,
          updatedAt: new Date(),
        },
      });
      console.log('User created with ID:', user.id, 'name:', name, 'company:', company);
    } else {
      // Update user data if new information is provided
      const updateData: any = { updatedAt: new Date() };
      let shouldUpdate = false;

      if (name && (!user.name || user.name !== name)) {
        updateData.name = name;
        shouldUpdate = true;
        console.log('Will update name to:', name);
      }

      if (company && (!user.company || user.company !== company)) {
        updateData.company = company;
        shouldUpdate = true;
        console.log('Will update company to:', company);
      }

      if (shouldUpdate) {
        console.log('Updating existing user with:', updateData);
        user = await prisma.user.update({ 
          where: { id: user.id }, 
          data: updateData 
        });
        console.log('User updated successfully');
      }
    }

    // Ensure roles exist and assign default learner role
    console.log('Seeding roles and assigning learner role...');
    await seedRoles();
    await assignRoleToUser(user.id, 'learner');
    console.log('Learner role assigned to user:', user.id);

    // Try to create user in Neon Auth (Stack Auth) as well, if configured
    const authResult = await createAuthUser({ email, name });
    console.log('Neon Auth result:', authResult);

    return NextResponse.json({ 
      ok: true, 
      userId: user.id,
      external: { neonAuth: authResult.ok } 
    });
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unexpected error' 
    }, { status: 500 });
  }
};


