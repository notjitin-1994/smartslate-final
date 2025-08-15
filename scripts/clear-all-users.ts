import { getDb } from '../src/lib/db';

async function clearAllUsers() {
  try {
    const db = getDb();
    console.log('🗑️  Starting to clear all user data...\n');

    // Delete in order of dependencies (reverse of foreign key constraints)
    
    // 1. Delete UserRole associations
    const { rowCount: deletedUserRoles } = await db.query('DELETE FROM app.user_roles');
    console.log(`✓ Deleted ${deletedUserRoles || 0} user-role associations`);

    // 2. Delete UserCourse associations
    const { rowCount: deletedUserCourses } = await db.query('DELETE FROM app.user_courses');
    console.log(`✓ Deleted ${deletedUserCourses || 0} user-course enrollments`);

    // 3. Delete Sessions
    const { rowCount: deletedSessions } = await db.query('DELETE FROM app.sessions');
    console.log(`✓ Deleted ${deletedSessions || 0} sessions`);

    // 4. Delete Accounts (OAuth accounts)
    const { rowCount: deletedAccounts } = await db.query('DELETE FROM app.accounts');
    console.log(`✓ Deleted ${deletedAccounts || 0} OAuth accounts`);

    // 5. Delete Users (main User table)
    const { rowCount: deletedUsers } = await db.query('DELETE FROM app.users');
    console.log(`✓ Deleted ${deletedUsers || 0} users from users table`);

    // 6. Delete users from legacy table if it exists
    // Legacy users table not present in Supabase schema; skip

    // 7. Clear anonymous user activity
    const { rowCount: deletedAnonymousActivity } = await db.query('DELETE FROM app.anonymous_user_activity');
    console.log(`✓ Deleted ${deletedAnonymousActivity || 0} anonymous user activity records`);

    // 8. Optional: Clear all leads data if you want a complete fresh start
    console.log('\n📋 Lead data summary (not deleted):');
    const [{ rows: c1 }, { rows: c2 }, { rows: c3 }, { rows: c4 }, { rows: c5 }] = await Promise.all([
      db.query('SELECT COUNT(*)::int AS count FROM app.course_waitlist_leads'),
      db.query('SELECT COUNT(*)::int AS count FROM app.solara_waitlist_leads'),
      db.query('SELECT COUNT(*)::int AS count FROM app.ssa_inquiries'),
      db.query('SELECT COUNT(*)::int AS count FROM app.case_study_requests'),
      db.query('SELECT COUNT(*)::int AS count FROM app.partner_inquiries'),
    ]);
    
    console.log(`  - Course waitlist leads: ${c1?.[0]?.count || 0}`);
    console.log(`  - Solara waitlist leads: ${c2?.[0]?.count || 0}`);
    console.log(`  - SSA inquiries: ${c3?.[0]?.count || 0}`);
    console.log(`  - Case study requests: ${c4?.[0]?.count || 0}`);
    console.log(`  - Partner inquiries: ${c5?.[0]?.count || 0}`);

    console.log('\n✅ All user data has been cleared successfully!');
    console.log('You can now start testing from scratch.');
    
  } catch (error) {
    console.error('❌ Error clearing user data:', error);
  } finally {
    process.exit(0);
  }
}

// Add command line option to also clear leads
const clearLeads = process.argv.includes('--clear-leads');

if (clearLeads) {
  console.log('⚠️  WARNING: --clear-leads flag detected. This will also delete all lead data!');
  console.log('Press Ctrl+C within 5 seconds to cancel...\n');
  
  setTimeout(async () => {
    await clearAllUsers();
    
    console.log('\n🗑️  Clearing all lead data...');
    
    const db = getDb();
    const r1 = await db.query('DELETE FROM app.course_waitlist_leads');
    console.log(`✓ Deleted ${r1.rowCount || 0} course waitlist leads`);
    const r2 = await db.query('DELETE FROM app.solara_waitlist_leads');
    console.log(`✓ Deleted ${r2.rowCount || 0} Solara waitlist leads`);
    const r3 = await db.query('DELETE FROM app.ssa_inquiries');
    console.log(`✓ Deleted ${r3.rowCount || 0} SSA inquiries`);
    const r4 = await db.query('DELETE FROM app.case_study_requests');
    console.log(`✓ Deleted ${r4.rowCount || 0} case study requests`);
    const r5 = await db.query('DELETE FROM app.partner_inquiries');
    console.log(`✓ Deleted ${r5.rowCount || 0} partner inquiries`);
    process.exit(0);
  }, 5000);
} else {
  clearAllUsers();
}
