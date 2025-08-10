import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearAllData() {
  try {
    console.log('🗑️  Starting database cleanup...\n');

    // Clear data from all tables in the correct order (respecting foreign key constraints)
    
    console.log('📊 Clearing UserRole table...');
    await prisma.userRole.deleteMany({});
    console.log('✅ UserRole table cleared');

    console.log('👥 Clearing User table...');
    await prisma.user.deleteMany({});
    console.log('✅ User table cleared');

    console.log('🔑 Clearing Role table...');
    await prisma.role.deleteMany({});
    console.log('✅ Role table cleared');

    console.log('📚 Clearing UserCourse table...');
    await prisma.userCourse.deleteMany({});
    console.log('✅ UserCourse table cleared');

    console.log('📖 Clearing Module table...');
    await prisma.module.deleteMany({});
    console.log('✅ Module table cleared');

    console.log('🎓 Clearing Course table...');
    await prisma.course.deleteMany({});
    console.log('✅ Course table cleared');

    console.log('🔐 Clearing Session table...');
    await prisma.session.deleteMany({});
    console.log('✅ Session table cleared');

    console.log('👤 Clearing Account table...');
    await prisma.account.deleteMany({});
    console.log('✅ Account table cleared');

    console.log('📝 Clearing VerificationToken table...');
    await prisma.verificationToken.deleteMany({});
    console.log('✅ VerificationToken table cleared');

    console.log('👥 Clearing users table (legacy)...');
    await prisma.users.deleteMany({});
    console.log('✅ users table cleared');

    console.log('📋 Clearing CourseWaitlistLead table...');
    await prisma.courseWaitlistLead.deleteMany({});
    console.log('✅ CourseWaitlistLead table cleared');

    console.log('🌞 Clearing SolaraWaitlistLead table...');
    await prisma.solaraWaitlistLead.deleteMany({});
    console.log('✅ SolaraWaitlistLead table cleared');

    console.log('🎯 Clearing SSAInquiry table...');
    await prisma.sSAInquiry.deleteMany({});
    console.log('✅ SSAInquiry table cleared');

    console.log('📊 Clearing CaseStudyRequest table...');
    await prisma.caseStudyRequest.deleteMany({});
    console.log('✅ CaseStudyRequest table cleared');

    console.log('🤝 Clearing PartnerInquiry table...');
    await prisma.partnerInquiry.deleteMany({});
    console.log('✅ PartnerInquiry table cleared');

    console.log('📊 Clearing AnonymousUserActivity table...');
    await prisma.anonymousUserActivity.deleteMany({});
    console.log('✅ AnonymousUserActivity table cleared');

    console.log('\n🎉 All data has been cleared successfully!');
    console.log('📋 Tables and schema remain intact.');
    console.log('\n⚠️  Note: You will need to:');
    console.log('  1. Re-seed the roles (owner, learner, etc.)');
    console.log('  2. Re-create your admin user account');
    console.log('  3. Re-add any courses or other data');

  } catch (error) {
    console.error('❌ Error clearing data:', error);
    
    if (error instanceof Error && error.message.includes('foreign key constraint')) {
      console.log('\n💡 Tip: If you get foreign key constraint errors,');
      console.log('   try running this script multiple times or check the order of deletion.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

clearAllData();
