import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function reseedEssentialData() {
  try {
    console.log('🌱 Starting to re-seed essential data...\n');

    // 1. Re-seed the roles
    console.log('🔑 Creating roles...');
    const roles = [
      { id: 'owner', description: 'Full access. Can manage users, roles, courses, settings, logs, API, and assume any role.' },
      { id: 'learner', description: 'Default role for all users. Can browse and read courses.' },
      { id: 'smartslateAdmin', description: 'Platform Admin (no user/role mgmt)' },
      { id: 'smartslateAnalytics', description: 'Analyst' },
      { id: 'smartslateSales', description: 'Sales Manager' },
      { id: 'smartslateCourse', description: 'Course Manager' },
      { id: 'smartslateSupport', description: 'Support Agent' }
    ];

    for (const role of roles) {
      await prisma.role.upsert({
        where: { id: role.id },
        create: { id: role.id, description: role.description },
        update: { description: role.description },
      });
      console.log(`✅ Role '${role.id}' created/updated`);
    }

    // 2. Create the admin user
    console.log('\n👤 Creating admin user...');
    const adminUser = await prisma.user.upsert({
      where: { email: 'jitin@smartslate.io' },
      create: {
        id: 'jitin-owner-user',
        email: 'jitin@smartslate.io',
        name: 'Jitin M Nair',
        stackAuthId: '5b6c0014-a81b-4ff6-9442-82ff156da2f6', // Keep the same Stack Auth ID
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        name: 'Jitin M Nair',
        updatedAt: new Date(),
      },
    });
    console.log('✅ Admin user created/updated:', adminUser.email);

    // 3. Assign owner role to admin user
    console.log('\n🔑 Assigning owner role to admin user...');
    await prisma.userRole.upsert({
      where: { 
        userId_roleId: { 
          userId: adminUser.id, 
          roleId: 'owner' 
        } 
      },
      create: { 
        userId: adminUser.id, 
        roleId: 'owner',
        assignedAt: new Date()
      },
      update: { 
        assignedAt: new Date()
      },
    });
    console.log('✅ Owner role assigned to admin user');

    // 4. Verify the setup
    console.log('\n🔍 Verifying the setup...');
    const userWithRoles = await prisma.user.findUnique({
      where: { email: 'jitin@smartslate.io' },
      include: {
        UserRole: {
          include: {
            Role: true
          }
        }
      }
    });

    if (userWithRoles) {
      console.log('✅ Verification successful:');
      console.log(`  User: ${userWithRoles.email}`);
      console.log(`  Roles: ${userWithRoles.UserRole.map(ur => ur.Role.id).join(', ')}`);
    } else {
      console.log('❌ Verification failed');
    }

    console.log('\n🎉 Essential data re-seeded successfully!');
    console.log('📋 You can now:');
    console.log('  1. Access the admin panel at /admin');
    console.log('  2. Add courses and other data');
    console.log('  3. Create additional users as needed');

  } catch (error) {
    console.error('❌ Error re-seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

reseedEssentialData();
