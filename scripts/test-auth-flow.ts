import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testAuthFlow() {
  try {
    console.log('🔍 Testing authentication flow...\n');

    // Get the user
    const user = await prisma.user.findUnique({
      where: { email: 'jitin@smartslate.io' },
      include: {
        UserRole: {
          include: {
            Role: true
          }
        }
      }
    });

    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found with roles:', user.UserRole.map(ur => ur.Role.id));

    // Test the auth context extraction logic
    console.log('\n🔑 Testing auth context logic...');
    
    // Simulate the token payload that would come from Stack Auth
    const mockTokenPayload = {
      sub: user.stackAuthId, // This should match the stackAuthId in the database
      email: user.email,
      role: 'owner' // This should be in the token
    };

    console.log('Mock token payload:', mockTokenPayload);
    console.log('User stackAuthId:', user.stackAuthId);
    console.log('Token sub matches stackAuthId:', mockTokenPayload.sub === user.stackAuthId);

    // Test the role assignment logic
    console.log('\n📋 Testing role assignment logic...');
    
    if (user.email === 'jitin@smartslate.io') {
      console.log('✅ Email matches jitin@smartslate.io');
      
      // Check if owner role is assigned
      const hasOwnerRole = user.UserRole.some(ur => ur.Role.id === 'owner');
      console.log('Has owner role:', hasOwnerRole);
      
      if (hasOwnerRole) {
        console.log('✅ Owner role is properly assigned');
      } else {
        console.log('❌ Owner role is missing - this is the problem!');
      }
    }

    // Test the getUserByStackAuthId function
    console.log('\n🔍 Testing getUserByStackAuthId function...');
    try {
      const dbUser = await prisma.user.findUnique({
        where: { stackAuthId: user.stackAuthId }
      });
      
      if (dbUser) {
        console.log('✅ getUserByStackAuthId found user:', dbUser.email);
      } else {
        console.log('❌ getUserByStackAuthId failed to find user');
      }
    } catch (error) {
      console.log('❌ Error in getUserByStackAuthId:', error);
    }

  } catch (error) {
    console.error('❌ Error testing auth flow:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuthFlow();
