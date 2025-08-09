-- Verify all user-related tables are empty

SELECT 'User' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'UserRole', COUNT(*) FROM "UserRole"
UNION ALL
SELECT 'UserCourse', COUNT(*) FROM "UserCourse"
UNION ALL
SELECT 'Session', COUNT(*) FROM "Session"
UNION ALL
SELECT 'Account', COUNT(*) FROM "Account"
UNION ALL
SELECT 'users (legacy)', COUNT(*) FROM "users"
UNION ALL
SELECT 'AnonymousUserActivity', COUNT(*) FROM "AnonymousUserActivity"
ORDER BY table_name;
