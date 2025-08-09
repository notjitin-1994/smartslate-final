import prisma from '../src/lib/prisma';

async function clearAllUsers() {
  try {
    console.log('🗑️  Starting to clear all user data...\n');

    // Delete in order of dependencies (reverse of foreign key constraints)
    
    // 1. Delete UserRole associations
    const deletedUserRoles = await prisma.userRole.deleteMany({});
    console.log(`✓ Deleted ${deletedUserRoles.count} user-role associations`);

    // 2. Delete UserCourse associations
    const deletedUserCourses = await prisma.userCourse.deleteMany({});
    console.log(`✓ Deleted ${deletedUserCourses.count} user-course enrollments`);

    // 3. Delete Sessions
    const deletedSessions = await prisma.session.deleteMany({});
    console.log(`✓ Deleted ${deletedSessions.count} sessions`);

    // 4. Delete Accounts (OAuth accounts)
    const deletedAccounts = await prisma.account.deleteMany({});
    console.log(`✓ Deleted ${deletedAccounts.count} OAuth accounts`);

    // 5. Delete Users (main User table)
    const deletedUsers = await prisma.user.deleteMany({});
    console.log(`✓ Deleted ${deletedUsers.count} users from User table`);

    // 6. Delete users from legacy table if it exists
    try {
      const deletedLegacyUsers = await prisma.users.deleteMany({});
      console.log(`✓ Deleted ${deletedLegacyUsers.count} users from legacy users table`);
    } catch (error) {
      console.log('ℹ️  No legacy users table found or already empty');
    }

    // 7. Clear anonymous user activity
    const deletedAnonymousActivity = await prisma.anonymousUserActivity.deleteMany({});
    console.log(`✓ Deleted ${deletedAnonymousActivity.count} anonymous user activity records`);

    // 8. Optional: Clear all leads data if you want a complete fresh start
    console.log('\n📋 Lead data summary (not deleted):');
    const courseWaitlistCount = await prisma.courseWaitlistLead.count();
    const solaraWaitlistCount = await prisma.solaraWaitlistLead.count();
    const ssaInquiryCount = await prisma.sSAInquiry.count();
    const caseStudyCount = await prisma.caseStudyRequest.count();
    const partnerInquiryCount = await prisma.partnerInquiry.count();
    
    console.log(`  - Course waitlist leads: ${courseWaitlistCount}`);
    console.log(`  - Solara waitlist leads: ${solaraWaitlistCount}`);
    console.log(`  - SSA inquiries: ${ssaInquiryCount}`);
    console.log(`  - Case study requests: ${caseStudyCount}`);
    console.log(`  - Partner inquiries: ${partnerInquiryCount}`);

    console.log('\n✅ All user data has been cleared successfully!');
    console.log('You can now start testing from scratch.');
    
  } catch (error) {
    console.error('❌ Error clearing user data:', error);
  } finally {
    await prisma.$disconnect();
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
    
    const deletedCourseWaitlist = await prisma.courseWaitlistLead.deleteMany({});
    console.log(`✓ Deleted ${deletedCourseWaitlist.count} course waitlist leads`);
    
    const deletedSolaraWaitlist = await prisma.solaraWaitlistLead.deleteMany({});
    console.log(`✓ Deleted ${deletedSolaraWaitlist.count} Solara waitlist leads`);
    
    const deletedSSA = await prisma.sSAInquiry.deleteMany({});
    console.log(`✓ Deleted ${deletedSSA.count} SSA inquiries`);
    
    const deletedCaseStudy = await prisma.caseStudyRequest.deleteMany({});
    console.log(`✓ Deleted ${deletedCaseStudy.count} case study requests`);
    
    const deletedPartner = await prisma.partnerInquiry.deleteMany({});
    console.log(`✓ Deleted ${deletedPartner.count} partner inquiries`);
    
    await prisma.$disconnect();
  }, 5000);
} else {
  clearAllUsers();
}
