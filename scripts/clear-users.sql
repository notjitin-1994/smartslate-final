-- Clear all user-related data in the correct order to respect foreign key constraints

-- 1. Delete user-role associations
DELETE FROM "UserRole";

-- 2. Delete user-course enrollments
DELETE FROM "UserCourse";

-- 3. Delete sessions
DELETE FROM "Session";

-- 4. Delete OAuth accounts
DELETE FROM "Account";

-- 5. Delete all users from main User table
DELETE FROM "User";

-- 6. Delete from legacy users table if exists
DELETE FROM "users" WHERE 1=1;

-- 7. Delete anonymous user activity
DELETE FROM "AnonymousUserActivity";

-- Return counts
SELECT 'All user data has been cleared successfully!' as message;
