-- Clear all data from database tables while preserving schema
-- Run this script in your database to clear all data

-- Clear data in order to respect foreign key constraints
DELETE FROM "UserRole";
DELETE FROM "User";
DELETE FROM "Role";
DELETE FROM "UserCourse";
DELETE FROM "Module";
DELETE FROM "Course";
DELETE FROM "Session";
DELETE FROM "Account";
DELETE FROM "VerificationToken";
DELETE FROM "users";
DELETE FROM "CourseWaitlistLead";
DELETE FROM "SolaraWaitlistLead";
DELETE FROM "SSAInquiry";
DELETE FROM "CaseStudyRequest";
DELETE FROM "PartnerInquiry";
DELETE FROM "AnonymousUserActivity";

-- Reset sequences if they exist (for auto-incrementing IDs)
-- Note: This is PostgreSQL specific
-- ALTER SEQUENCE "User_id_seq" RESTART WITH 1;
-- ALTER SEQUENCE "Course_id_seq" RESTART WITH 1;

-- Verify tables are empty
SELECT 'UserRole' as table_name, COUNT(*) as record_count FROM "UserRole"
UNION ALL
SELECT 'User', COUNT(*) FROM "User"
UNION ALL
SELECT 'Role', COUNT(*) FROM "Role"
UNION ALL
SELECT 'Course', COUNT(*) FROM "Course"
UNION ALL
SELECT 'Module', COUNT(*) FROM "Module"
UNION ALL
SELECT 'UserCourse', COUNT(*) FROM "UserCourse"
UNION ALL
SELECT 'Account', COUNT(*) FROM "Account"
UNION ALL
SELECT 'Session', COUNT(*) FROM "Session"
UNION ALL
SELECT 'VerificationToken', COUNT(*) FROM "VerificationToken"
UNION ALL
SELECT 'users (legacy)', COUNT(*) FROM "users"
UNION ALL
SELECT 'CourseWaitlistLead', COUNT(*) FROM "CourseWaitlistLead"
UNION ALL
SELECT 'SolaraWaitlistLead', COUNT(*) FROM "SolaraWaitlistLead"
UNION ALL
SELECT 'SSAInquiry', COUNT(*) FROM "SSAInquiry"
UNION ALL
SELECT 'CaseStudyRequest', COUNT(*) FROM "CaseStudyRequest"
UNION ALL
SELECT 'PartnerInquiry', COUNT(*) FROM "PartnerInquiry"
UNION ALL
SELECT 'AnonymousUserActivity', COUNT(*) FROM "AnonymousUserActivity";
