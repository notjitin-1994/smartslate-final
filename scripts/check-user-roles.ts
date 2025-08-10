import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUserRoles() {
  try {
    console.log('🔍 Checking user data and roles...\n');

    // Check if jitin@smartslate.io exists
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

    console.log('✅ User found:');
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Stack Auth ID: ${user.stackAuthId}`);
    console.log(`  Created: ${user.createdAt}`);
    console.log(`  Updated: ${user.updatedAt}`);

    console.log('\n🔑 User Roles:');
    if (user.UserRole.length === 0) {
      console.log('  ❌ No roles assigned');
    } else {
      user.UserRole.forEach(userRole => {
        console.log(`  ✅ ${userRole.Role.id} (assigned: ${userRole.assignedAt})`);
      });
    }

    // Check all available roles
    console.log('\n📋 Available Roles:');
    const roles = await prisma.role.findMany();
    roles.forEach(role => {
      console.log(`  - ${role.id}: ${role.description}`);
    });

    // Check if owner role exists
    const ownerRole = await prisma.role.findUnique({
      where: { id: 'owner' }
    });

    if (!ownerRole) {
      console.log('\n⚠️  Owner role does not exist - this is the problem!');
    } else {
      console.log('\n✅ Owner role exists');
    }

  } catch (error) {
    console.error('❌ Error checking user roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserRoles();
