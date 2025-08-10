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

    console.log('=== VERIFY-USER API START ===');
    console.log('Request body:', { email, name, company });
    console.log('Timestamp:', new Date().toISOString());

    if (!email) {
      console.error('❌ VERIFY-USER FAILED - No email provided');
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });
    console.log('🔍 User lookup result:', user ? `Found user ${user.id}` : 'User not found');
    
    if (!user) {
      // Create new user
      console.log(`📝 Creating new user for ${email} in database...`);
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
      console.log(`✅ User created successfully:`, {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company
      });

      // Assign default role
      console.log('🔑 Assigning default roles...');
      const roles = await ensureDefaultRolesForUser(user.id, email);
      console.log(`✅ Roles assigned:`, { userId: user.id, email, roles });
    } else {
      console.log(`✅ User ${email} already exists in database - no creation needed`);
    }

    console.log('=== VERIFY-USER API SUCCESS ===');
    console.log('Final result:', {
      userId: user.id,
      email: user.email,
      name: user.name,
      isNew: !user
    });

    return NextResponse.json({ 
      ok: true, 
      userId: user.id,
      email: user.email,
      name: user.name,
      isNew: !user
    });
  } catch (error) {
    console.error('❌ VERIFY-USER API ERROR:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
};
