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
  let user: any = null; // Declare user variable outside try block
  
  try {
    const { email, name, company, stackAuthId } = await req.json();

    console.log('=== VERIFY-USER API START ===');
    console.log('Request body:', { email, name, company, stackAuthId });
    console.log('Timestamp:', new Date().toISOString());

    if (!email) {
      console.error('❌ VERIFY-USER FAILED - No email provided');
      return NextResponse.json({ ok: false, error: 'Email is required' }, { status: 400 });
    }

    // Check if user already exists by email or stackAuthId
    user = await prisma.user.findUnique({ where: { email } });
    if (!user && stackAuthId) {
      user = await prisma.user.findUnique({ where: { stackAuthId } });
    }
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
          stackAuthId: stackAuthId || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      console.log(`✅ User created successfully:`, {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        stackAuthId: user.stackAuthId
      });
    } else if (stackAuthId && user.stackAuthId !== stackAuthId) {
      // Check if another user already has this stackAuthId
      const existingUserWithStackId = await prisma.user.findUnique({
        where: { stackAuthId }
      });
      
      if (existingUserWithStackId && existingUserWithStackId.id !== user.id) {
        console.log(`⚠️ Stack Auth ID ${stackAuthId} already assigned to user ${existingUserWithStackId.id}`);
        // Don't update, just continue with existing user
      } else {
        // Update existing user with Stack Auth ID if not already set
        console.log(`📝 Updating user ${user.id} with Stack Auth ID: ${stackAuthId}`);
        user = await prisma.user.update({
          where: { id: user.id },
          data: { stackAuthId, updatedAt: new Date() }
        });
        console.log(`✅ User updated with Stack Auth ID:`, {
          id: user.id,
          email: user.email,
          stackAuthId: user.stackAuthId
        });
      }
    } else {
      console.log(`✅ User ${email} already exists in database - no creation needed`);
    }

    // Assign default role
    console.log('🔑 Assigning default roles...');
    const roles = await ensureDefaultRolesForUser(user.id, email);
    console.log(`✅ Roles assigned:`, { userId: user.id, email, roles });
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

  if (!user) {
    console.error('❌ VERIFY-USER FAILED - User not created/updated');
    return NextResponse.json({ ok: false, error: 'Failed to create/update user' }, { status: 500 });
  }

  console.log('=== VERIFY-USER API SUCCESS ===');
  console.log('Final result:', {
    userId: user.id,
    email: user.email,
    name: user.name,
    stackAuthId: user.stackAuthId,
    isNew: false
  });

  return NextResponse.json({ 
    ok: true, 
    userId: user.id,
    email: user.email,
    name: user.name,
    stackAuthId: user.stackAuthId,
    isNew: false
  });
};
