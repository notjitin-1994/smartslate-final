import { getDb } from '../src/lib/db';

async function checkUserRoles() {
  try {
    console.log('🔍 Checking user data and roles...\n');

    const db = getDb();
    // Check if jitin@smartslate.io exists
    const userRes = await db.query(
      `SELECT id, email, full_name as name FROM app.users WHERE email = $1 LIMIT 1`,
      ['jitin@smartslate.io']
    );
    const user = userRes.rows[0] || null;

    if (!user) {
      console.log('❌ User jitin@smartslate.io not found in database');
      return;
    }

    console.log('✅ User found:');
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Name: ${user.name}`);

    console.log('\n🔑 User Roles:');
    const rolesRes = await db.query(
      `SELECT ur.role_id as id, r.description, ur.assigned_at
       FROM app.user_roles ur
       JOIN app.roles r ON r.id = ur.role_id
       WHERE ur.user_id = $1`,
      [user.id]
    );
    const userRoles = rolesRes.rows as Array<{ id: string; description: string; assigned_at: string }>;
    if (userRoles.length === 0) {
      console.log('  ❌ No roles assigned');
    } else {
      userRoles.forEach((userRole) => {
        console.log(`  ✅ ${userRole.id} (assigned: ${userRole.assigned_at})`);
      });
    }

    // Check all available roles
    console.log('\n📋 Available Roles:');
    const allRoles = await db.query(`SELECT id, description FROM app.roles ORDER BY id`);
    allRoles.rows.forEach((role: any) => {
      console.log(`  - ${role.id}: ${role.description}`);
    });

    // Check if owner role exists
    const ownerRole = (await db.query(`SELECT id FROM app.roles WHERE id = 'owner' LIMIT 1`)).rows[0] || null;

    if (!ownerRole) {
      console.log('\n⚠️  Owner role does not exist - this is the problem!');
    } else {
      console.log('\n✅ Owner role exists');
    }

  } catch (error) {
    console.error('❌ Error checking user roles:', error);
  } finally {
    process.exit(0);
  }
}

checkUserRoles();
