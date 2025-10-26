# Unified Modal Submission System

This document describes the unified modal submission system implemented across the SmartSlate website.

## Overview

All modal forms now submit to a single, unified database table (`modal_submissions`) through a centralized API endpoint. This provides:

- **Centralized Data Management**: All form submissions in one place
- **Flexible Schema**: JSONB storage allows each modal type to have unique fields
- **Better Analytics**: Track all user interactions across different modals
- **Easier Maintenance**: Single API endpoint to maintain
- **Advanced Features**: Status tracking, priority assignment, UTM tracking

## Architecture

### Database Table: `modal_submissions`

```sql
CREATE TABLE modal_submissions (
  id UUID PRIMARY KEY,
  modal_type TEXT NOT NULL,           -- Type of modal (demo, consultation, etc.)
  name TEXT,                           -- User's name
  email TEXT,                          -- User's email
  phone TEXT,                          -- Phone number
  company TEXT,                        -- Company name
  role TEXT,                           -- Job role/title
  form_data JSONB,                     -- All modal-specific data (flexible)
  ip_address INET,                     -- User's IP address
  user_agent TEXT,                     -- Browser user agent
  referrer TEXT,                       -- HTTP referrer
  utm_source TEXT,                     -- UTM tracking
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new',           -- Pipeline status
  priority TEXT DEFAULT 'normal',      -- Follow-up priority
  assigned_to TEXT,                    -- Assigned team member
  assigned_at TIMESTAMP,
  internal_notes TEXT,                 -- Internal team notes
  follow_up_date TIMESTAMP,
  last_contacted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Supported Modal Types

1. `demo` - Demo request modal
2. `consultation` - Consultation request modal
3. `case-study` - Case study interest modal
4. `partner` - Partnership inquiry modal
5. `solara` - Solara product interest modal
6. `ssa` - SSA product interest modal
7. `waitlist` - Waitlist signup modal
8. `job-application` - Career application modal
9. `contact` - Contact form

## Usage

### Client-Side Implementation

#### Basic Example

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

async function handleSubmit(formData: any) {
  const result = await submitModalForm({
    modalType: 'contact',
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    formData: {
      subject: formData.subject,
      message: formData.message,
      inquiryType: formData.inquiryType,
      // Any other modal-specific fields
    },
  });

  if (result.success) {
    console.log('Submission successful!', result.id);
    // Show success message
  } else {
    console.error('Submission failed:', result.error);
    // Show error message
  }
}
```

#### Advanced Example with Validation

```typescript
import {
  submitModalForm,
  validateModalSubmission,
  extractCommonFields
} from '@/lib/api/modal-submission';

async function handleDemoRequest(formData: any) {
  // Validate before submission
  const validation = validateModalSubmission('demo', formData);

  if (!validation.valid) {
    setErrors(validation.errors);
    return;
  }

  // Extract common fields
  const commonFields = extractCommonFields(formData);

  // Submit with all data
  const result = await submitModalForm({
    modalType: 'demo',
    ...commonFields,
    formData: {
      demoType: formData.demoType,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      timezone: formData.timezone,
      productInterest: formData.productInterest,
      currentChallenges: formData.currentChallenges,
      teamSize: formData.teamSize,
      // ... all other demo-specific fields
    },
  });

  if (result.success) {
    onSuccess(result.id);
  } else {
    onError(result.error);
  }
}
```

### API Endpoint

**POST** `/api/modals/submit`

#### Request Body

```json
{
  "modalType": "demo",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "role": "Learning Director",
  "formData": {
    "demoType": "product",
    "preferredDate": "2025-01-15",
    "preferredTime": "14:00",
    "timezone": "America/New_York",
    "currentChallenges": "Need better learning analytics",
    "teamSize": "50-100"
  },
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "demo-campaign"
}
```

#### Response (Success)

```json
{
  "success": true,
  "message": "Submission received successfully",
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "createdAt": "2025-01-10T14:30:00Z"
}
```

#### Response (Error)

```json
{
  "success": false,
  "error": "Invalid email format",
  "details": "Email must be in valid format"
}
```

## Migration from Old System

### Before (Old API Routes)

```typescript
// Old approach - separate endpoints for each modal
await fetch('/api/leads/demo', { ... });
await fetch('/api/leads/consultation', { ... });
await fetch('/api/leads/case-study', { ... });
```

### After (Unified System)

```typescript
// New approach - single endpoint
import { submitModalForm } from '@/lib/api/modal-submission';

await submitModalForm({
  modalType: 'demo',
  // ... data
});
```

### Backward Compatibility

The old API routes (`/api/leads/*`) can still work alongside the new system during migration. Eventually, they should be updated to use the new unified endpoint internally.

## Database Setup

### Running Migrations

Execute the database setup to create the `modal_submissions` table:

```bash
npm run db:setup
```

Or manually run the SQL migration:

```sql
-- See: src/lib/database/modal-submissions-schema.sql
```

### Supabase Dashboard

You can also create the table directly in the Supabase dashboard:

1. Go to SQL Editor
2. Paste contents of `modal-submissions-schema.sql`
3. Click "Run"

## Features

### Status Tracking

Track the progress of each submission through your sales/support pipeline:

- `new` - Just submitted
- `contacted` - Initial contact made
- `qualified` - Qualified lead
- `converted` - Successfully converted
- `closed` - No longer pursuing
- `spam` - Marked as spam

### Priority Levels

Automatically assigned based on modal type, can be updated manually:

- `low` - Low priority follow-up
- `normal` - Standard follow-up
- `high` - High priority (demo, consultation, partner)
- `urgent` - Urgent (when user selects urgency level)

### UTM Tracking

Automatically captures UTM parameters from the URL:

- `utm_source` - Traffic source
- `utm_medium` - Marketing medium
- `utm_campaign` - Campaign name

### Advanced Queries

Query submissions by various criteria:

```typescript
// Get all demo requests from last 7 days
const { data } = await supabase
  .from('modal_submissions')
  .select('*')
  .eq('modal_type', 'demo')
  .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

// Get high-priority uncontacted submissions
const { data } = await supabase
  .from('modal_submissions')
  .select('*')
  .eq('status', 'new')
  .eq('priority', 'high')
  .is('last_contacted_at', null);

// Search form data using JSONB
const { data } = await supabase
  .from('modal_submissions')
  .select('*')
  .contains('form_data', { demoType: 'product' });
```

## Best Practices

1. **Always use `submitModalForm` helper** - Don't call the API directly
2. **Validate before submission** - Use `validateModalSubmission`
3. **Extract common fields** - Use `extractCommonFields` for consistency
4. **Include modal-specific data in `formData`** - Keep the schema flexible
5. **Handle errors gracefully** - Always check `result.success`
6. **Track conversions** - Update status as leads progress

## Testing

Test the submission system:

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

// Test demo submission
const testData = {
  modalType: 'demo' as const,
  name: 'Test User',
  email: 'test@example.com',
  company: 'Test Company',
  formData: {
    demoType: 'product',
    preferredDate: '2025-01-15',
    preferredTime: '14:00',
  },
};

const result = await submitModalForm(testData);
console.log(result); // Should show success: true
```

## Support

For questions or issues:

- Check the database schema: `src/lib/database/modal-submissions-schema.sql`
- Review the API route: `src/app/api/modals/submit/route.ts`
- See helper functions: `src/lib/api/modal-submission.ts`

## Changelog

### Version 1.0.0 (2025-01-10)

- Initial implementation of unified modal submission system
- Created `modal_submissions` table
- Implemented `/api/modals/submit` endpoint
- Created helper functions for client-side usage
- Added validation and error handling
- Implemented status and priority tracking
- Added UTM parameter capture
