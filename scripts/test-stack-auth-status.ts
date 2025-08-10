import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testStackAuthStatus() {
  try {
    console.log('🔍 Testing Stack Auth status...\n');

    // Check if the user exists in the database
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
      console.log('❌ User jitin@smartslate.io not found in database');
      return;
    }

    console.log('✅ User found in database:');
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Stack Auth ID: ${user.stackAuthId}`);
    console.log(`  Roles: ${user.UserRole.map(ur => ur.Role.id).join(', ')}`);

    // Check if the user has the owner role
    const hasOwnerRole = user.UserRole.some(ur => ur.Role.id === 'owner');
    console.log(`\n🔑 Owner role assigned: ${hasOwnerRole ? 'Yes' : 'No'}`);

    if (hasOwnerRole) {
      console.log('✅ User has owner role - database permissions are correct');
    } else {
      console.log('❌ User missing owner role - this is the problem!');
      return;
    }

    // Check if the Stack Auth ID is set
    if (user.stackAuthId) {
      console.log('✅ Stack Auth ID is set in database');
    } else {
      console.log('❌ Stack Auth ID is missing - user needs to sign in through Stack Auth');
      return;
    }

    console.log('\n📋 Summary:');
    console.log('  - User exists in database: ✅');
    console.log('  - User has owner role: ✅');
    console.log('  - Stack Auth ID is set: ✅');
    console.log('\n🔍 The issue is likely that the user is not signed in through Stack Auth in the browser.');
    console.log('  - Try visiting /handler/sign-in to sign in');
    console.log('  - Or check if there are any JavaScript errors in the browser console');
    console.log('  - The AdminAuthGuard needs a valid Stack Auth token to work');

  } catch (error) {
    console.error('❌ Error testing Stack Auth status:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testStackAuthStatus();
