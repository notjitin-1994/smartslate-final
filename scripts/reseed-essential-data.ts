import { getDb } from '../src/lib/db';

async function reseedEssentialData() {
  try {
    console.log('🌱 Starting to re-seed essential data...\n');
    const db = getDb();

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
      await db.query(
        `INSERT INTO app.roles (id, description) VALUES ($1, $2)
         ON CONFLICT (id) DO UPDATE SET description = EXCLUDED.description`,
        [role.id, role.description]
      );
      console.log(`✅ Role '${role.id}' created/updated`);
    }

    // 2. Create the admin user
    console.log('\n👤 Creating admin user...');
    const { rows: adminRows } = await db.query(
      `INSERT INTO app.users (id, email, full_name, created_at, updated_at)
       VALUES ($1, $2, $3, now(), now())
       ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name, updated_at = now()
       RETURNING id, email`,
      ['jitin-owner-user', 'jitin@smartslate.io', 'Jitin M Nair']
    );
    const adminUser = adminRows[0];
    console.log('✅ Admin user created/updated:', adminUser.email);

    // 3. Assign owner role to admin user
    console.log('\n🔑 Assigning owner role to admin user...');
    await db.query(
      `INSERT INTO app.user_roles (user_id, role_id, assigned_at)
       VALUES ($1, $2, now())
       ON CONFLICT (user_id, role_id) DO UPDATE SET assigned_at = now()`,
      [adminUser.id, 'owner']
    );
    console.log('✅ Owner role assigned to admin user');

    // 4. Verify the setup
    console.log('\n🔍 Verifying the setup...');
    const verifyUser = await db.query(`SELECT email FROM app.users WHERE email = $1`, ['jitin@smartslate.io']);
    const verifyRoles = await db.query(
      `SELECT role_id FROM app.user_roles WHERE user_id = $1`,
      [adminUser.id]
    );
    if (verifyUser.rows[0]) {
      console.log('✅ Verification successful:');
      console.log(`  User: ${verifyUser.rows[0].email}`);
      console.log(`  Roles: ${verifyRoles.rows.map((r: any) => r.role_id).join(', ')}`);
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
    process.exit(0);
  }
}

reseedEssentialData();
