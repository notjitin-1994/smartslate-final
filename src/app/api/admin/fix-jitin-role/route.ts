export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { seedRoles, assignRoleToUser, getUserByEmail } from '@/lib/rbac-db';

export async function GET(req: NextRequest) {
  try {
    // Ensure roles are seeded
    await seedRoles();
    
    // Find jitin@smartslate.io user
    const user = await getUserByEmail('jitin@smartslate.io');
    
    if (!user) {
      return NextResponse.json({ 
        ok: false, 
        error: 'User jitin@smartslate.io not found in database. Please sign up first.' 
      }, { status: 404 });
    }
    
    // Assign owner role
    await assignRoleToUser(user.id, 'owner');
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Owner role successfully assigned to jitin@smartslate.io',
      userId: user.id 
    });
    
  } catch (error) {
    console.error('Error fixing Jitin role:', error);
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
