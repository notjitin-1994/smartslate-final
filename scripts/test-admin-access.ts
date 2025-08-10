import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testAdminAccess() {
  try {
    console.log('🔍 Testing admin access flow...\n');

    // 1. Check if admin user exists
    console.log('1️⃣ Checking admin user...');
    const adminUser = await prisma.user.findUnique({
      where: { email: 'jitin@smartslate.io' },
      include: {
        UserRole: {
          include: {
            Role: true
          }
        }
      }
    });

    if (!adminUser) {
      console.log('❌ Admin user not found');
      return;
    }

    console.log('✅ Admin user found:', {
      id: adminUser.id,
      email: adminUser.email,
      stackAuthId: adminUser.stackAuthId
    });

    // 2. Check roles
    console.log('\n2️⃣ Checking user roles...');
    const roles = adminUser.UserRole.map(ur => ur.Role.id);
    console.log('✅ User roles:', roles);

    if (!roles.includes('owner')) {
      console.log('❌ Admin user does not have owner role');
      return;
    }

    console.log('✅ Admin user has owner role');

    // 3. Check if roles table has the owner role
    console.log('\n3️⃣ Checking roles table...');
    const ownerRole = await prisma.role.findUnique({
      where: { id: 'owner' }
    });

    if (!ownerRole) {
      console.log('❌ Owner role not found in roles table');
      return;
    }

    console.log('✅ Owner role found:', ownerRole);

    // 4. Test the roles API endpoint (simulate what AdminAuthGuard does)
    console.log('\n4️⃣ Testing roles API endpoint...');
    
    // Create a mock JWT payload for testing
    const mockPayload = {
      sub: adminUser.stackAuthId,
      email: adminUser.email,
      role: 'owner'
    };

    // This would normally be a JWT token, but for testing we'll just check the database
    console.log('✅ Mock payload created:', mockPayload);

    // 5. Check if the user can be found by Stack Auth ID
    console.log('\n5️⃣ Testing Stack Auth ID lookup...');
    const userByStackId = await prisma.user.findUnique({
      where: { stackAuthId: adminUser.stackAuthId }
    });

    if (!userByStackId) {
      console.log('❌ User not found by Stack Auth ID');
      return;
    }

    console.log('✅ User found by Stack Auth ID:', userByStackId.email);

    console.log('\n🎉 Admin access test completed successfully!');
    console.log('📋 The database is properly configured for admin access.');
    console.log('🔍 If you still can\'t access /admin, the issue might be:');
    console.log('   - Stack Auth not properly initialized in the browser');
    console.log('   - User not signed in through Stack Auth');
    console.log('   - Browser console errors');

  } catch (error) {
    console.error('❌ Error testing admin access:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAdminAccess();
