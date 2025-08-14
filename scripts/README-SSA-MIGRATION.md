# SSA Interest Modal Database Migration

This document explains how to set up the database table for the SSA (Strategic Skills Architecture) Interest Modal.

## Overview

The SSA Interest Modal collects comprehensive data from enterprise prospects interested in custom learning solutions. This migration creates the necessary database table to store this information.

## Files

- `create_ssa_interest_modal.sql` - Database schema definition
- `migrate-ssa-table.ts` - Migration script
- `README-SSA-MIGRATION.md` - This documentation

## Table Structure

The `app.ssa_interest_modal` table includes:

### Contact & Company Information
- `name`, `email`, `phone` - Contact details
- `company`, `role`, `department` - Professional context
- `company_size`, `industry`, `location` - Company information

### Current State & Challenges
- `current_challenges` - Primary talent challenges
- `skill_gaps` - Array of identified skill gaps
- `existing_lms`, `current_training_budget` - Current state
- `employee_count`, `target_audience` - Scope information

### SSA Requirements & Goals
- `primary_goals` - Array of business objectives
- `timeline`, `budget` - Project parameters
- `specific_outcomes` - Desired results
- `technical_requirements`, `integration_needs` - Technical context

### Additional Context
- `decision_makers`, `competing_priorities` - Stakeholder information
- `success_metrics`, `how_did_you_hear` - Context and attribution
- `additional_notes` - Free-form additional information

### Metadata
- `created_at`, `updated_at` - Timestamps
- `ip_address`, `user_agent` - Request context
- `status`, `lead_type`, `source` - Lead tracking

## Running the Migration

### Prerequisites

1. Ensure your database connection is configured in `.env`
2. Make sure you have the required environment variables:
   ```
   DATABASE_URL=your_database_connection_string
   ```

### Execute Migration

Run the migration using the npm script:

```bash
npm run migrate:ssa
```

Or directly with tsx:

```bash
npx tsx scripts/migrate-ssa-table.ts
```

### Verification

After running the migration, you should see:

1. ✅ Success message confirming table creation
2. 📋 Table structure listing all columns
3. 🔗 Confirmation that the table is ready to receive submissions

## API Integration

The SSA API endpoint (`/api/leads/ssa`) will automatically:

1. Validate incoming data
2. Store submissions in the `app.ssa_interest_modal` table
3. Send notification emails to the sales team
4. Return success response with lead ID

## Security

- Row Level Security (RLS) is enabled
- Only service role can access the table
- Email validation is enforced
- IP address and user agent are captured for context

## Monitoring

You can monitor SSA submissions by querying:

```sql
SELECT 
  id, name, company, industry, created_at, status
FROM app.ssa_interest_modal 
ORDER BY created_at DESC;
```

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check your `DATABASE_URL` environment variable
   - Ensure database is accessible

2. **Table already exists**
   - The migration uses `CREATE TABLE IF NOT EXISTS`
   - Safe to run multiple times

3. **Permission denied**
   - Ensure your database user has CREATE TABLE permissions
   - Check if you're using the correct database role

### Rollback

To remove the table (if needed):

```sql
DROP TABLE IF EXISTS app.ssa_interest_modal;
```

## Next Steps

After successful migration:

1. Test the SSA modal form submission
2. Verify email notifications are working
3. Set up lead tracking in your CRM
4. Configure any additional integrations

## Support

For issues with the migration, check:
- Database connection logs
- Environment variable configuration
- Database user permissions
