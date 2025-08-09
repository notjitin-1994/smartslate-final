# User Data Fix Testing

## Changes Made:

1. **Added `company` field to User model** in Prisma schema
2. **Updated signup API** to handle:
   - `firstName` + `lastName` → combined into `name` field
   - `company` → stored in new `company` field
   - Proper updates for existing users

3. **Enhanced StackAuthSync** to pass name parts correctly
4. **Updated verification API** to return company data

## Testing Steps:

### 1. Test New User Registration
```bash
# Sign up with a new user via the form with:
# - First Name: "John"
# - Last Name: "Doe" 
# - Company: "Test Corp"
# - Email: "john.doe@test.com"
```

### 2. Verify User Data
```bash
# Check the created user data:
GET /api/auth/verify-user?email=john.doe@test.com

# Expected response:
{
  "exists": true,
  "user": {
    "id": "...",
    "email": "john.doe@test.com",
    "name": "John Doe",           // ✓ First + Last name combined
    "company": "Test Corp",       // ✓ Company field populated
    "createdAt": "...",
    "updatedAt": "..."
  },
  "roles": [
    {
      "id": "learner",
      "description": "Standard learner access"
    }
  ],
  "hasLearnerRole": true          // ✓ Learner role assigned
}
```

### 3. Test Existing User Update
```bash
# Sign in with existing user who has missing name/company
# The API should update their data if new info is provided
```

## What's Fixed:

✅ **Names**: `firstName` + `lastName` properly combined into `name` field
✅ **Company**: Now stored in dedicated `company` field in database  
✅ **Updates**: Existing users get updated with new name/company data
✅ **Roles**: Learner role still assigned correctly
✅ **Logging**: Detailed console logs to track data flow

## Console Logs to Watch:
- "Signup API called with: {email, firstName, lastName, company}"
- "User created with ID: ... name: ... company: ..."
- "Will update name to: ..." / "Will update company to: ..."
- "Learner role assigned to user: ..."
