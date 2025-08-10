export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { seedRoles, assignRoleToUser, ensureDefaultRolesForUser } from '@/lib/rbac-db';
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

    console.log('=== SIGNUP API START ===');
    console.log('Request body:', { email, firstName, lastName, company });
    console.log('Timestamp:', new Date().toISOString());

    if (!email || !isValidEmail(email)) {
      console.error('❌ SIGNUP FAILED - Invalid email:', email);
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const name = [firstName, lastName].filter(Boolean).join(' ').trim() || null;

    // Upsert User record in RBAC User table
    let user = await prisma.user.findUnique({ where: { email } });
    console.log('🔍 User lookup result:', user ? `Found existing user ${user.id}` : 'User not found');
    
    if (!user) {
      console.log('📝 Creating new user in database...');
      user = await prisma.user.create({
        data: {
          id: randomUUID(),
          email,
          name,
          company: company || null,
          updatedAt: new Date(),
        },
      });
      console.log('✅ User created successfully:', { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        company: user.company 
      });
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
        console.log('📝 Updating existing user with:', updateData);
        user = await prisma.user.update({ 
          where: { id: user.id }, 
          data: updateData 
        });
        console.log('✅ User updated successfully:', {
          id: user.id,
          email: user.email,
          name: user.name,
          company: user.company
        });
      } else {
        console.log('✅ No updates needed for existing user');
      }
    }

    // Ensure roles exist and assign appropriate role (owner for jitin@smartslate.io, learner for others)
    console.log('🔑 Ensuring default roles for user...');
    const roles = await ensureDefaultRolesForUser(user.id, email);
    console.log('✅ Roles assigned to user:', { userId: user.id, email, roles });

    // Try to create user in Neon Auth (Stack Auth) as well, if configured
    console.log('🌐 Creating user in Neon Auth...');
    const authResult = await createAuthUser({ email, name });
    console.log('📡 Neon Auth result:', {
      ok: authResult.ok,
      status: authResult.status,
      id: authResult.id,
      error: authResult.error
    });

    console.log('=== SIGNUP API SUCCESS ===');
    console.log('Final result:', { 
      userId: user.id, 
      email: user.email,
      neonAuthSuccess: authResult.ok 
    });

    return NextResponse.json({ 
      ok: true, 
      userId: user.id,
      external: { neonAuth: authResult.ok } 
    });
  } catch (error) {
    console.error('❌ SIGNUP API ERROR:', {
      error: error instanceof Error ? error.message : 'Unexpected error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unexpected error' 
    }, { status: 500 });
  }
};


