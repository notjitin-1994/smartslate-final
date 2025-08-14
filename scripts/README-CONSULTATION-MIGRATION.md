# Consultation Request Modal Database Migration & Implementation

This document explains the comprehensive Consultation Request Modal implementation and database setup for scheduling consultations across all SmartSlate services.

## Overview

The Consultation Request Modal is a comprehensive 6-step form that collects detailed information for scheduling personalized consultations across all SmartSlate products and services. It covers contact information, consultation preferences, business context, service interest, current state, and additional requirements.

## SmartSlate Consultation Services

The modal is designed to handle consultations for all SmartSlate offerings:

1. **Strategic Assessment** - Comprehensive evaluation of learning strategy and needs
2. **SSA Consultation** - Strategic Skills Architecture planning and design
3. **Solara Platform Exploration** - AI-powered learning platform consultation
4. **Implementation Planning** - Roadmap for successful learning solution deployment
5. **ROI & Business Case Analysis** - Financial impact and business justification
6. **Custom Solution Design** - Tailored learning solution architecture

## Files

- `create_consultation_requests.sql` - Database schema definition
- `migrate-consultation-table.ts` - Migration script
- `src/app/api/leads/consultation/route.ts` - API endpoint for form submissions
- `src/components/landing/ConsultationModal.tsx` - Comprehensive 6-step modal
- `src/hooks/useConsultationModal.ts` - Zustand state management
- `src/components/difference/CTASection.tsx` - Updated to use consultation modal
- `README-CONSULTATION-MIGRATION.md` - This documentation

## Table Structure

The `app.consultation_requests` table includes:

### Step 1: Contact & Professional Information
- `name`, `email`, `phone` - Contact details
- `company`, `role`, `department` - Professional context
- `industry`, `company_size`, `location` - Company information

### Step 2: Consultation Preferences & Scheduling
- `consultation_type` - Type of consultation requested
- `preferred_date`, `preferred_time`, `timezone` - Scheduling details
- `consultation_duration`, `attendees_count`, `attendee_roles` - Consultation logistics
- `urgency_level` - Priority level for scheduling

### Step 3: Business Context & Challenges
- `primary_challenge` - Main business challenge
- `secondary_challenges` - Array of additional challenges
- `team_size`, `budget_range`, `timeline` - Implementation context
- `decision_makers`, `implementation_scope` - Stakeholder information

### Step 4: Service Interest & Requirements
- `service_interest` - Array of services of interest
- `specific_requirements` - Array of desired requirements
- `use_case`, `integration_needs` - Technical requirements
- `compliance_needs` - Regulatory requirements

### Step 5: Current State & Goals
- `current_lms`, `current_tools` - Existing infrastructure
- `learning_goals`, `success_metrics` - Objectives and KPIs
- `pain_points`, `desired_outcomes` - Current issues and goals

### Step 6: Additional Context
- `how_did_you_hear` - Attribution source
- `competitive_analysis` - Other solutions considered
- `additional_notes`, `referral_source` - Context and referrals

### Metadata & Tracking
- `created_at`, `updated_at` - Timestamps
- `ip_address`, `user_agent` - Request context
- `status`, `lead_type`, `source` - Lead tracking
- `priority`, `assigned_to` - Sales team management
- `consultation_scheduled`, `consultation_date`, `consultation_notes` - Consultation tracking
- `follow_up_required`, `follow_up_date` - Follow-up management

## Modal Features

### 6-Step Progressive Form
1. **Contact & Professional Information** - Basic contact and company details
2. **Consultation Type & Scheduling** - Consultation type, date, time, and logistics
3. **Business Challenges** - Understanding business needs and challenges
4. **Service Interest** - Specific services and requirements of interest
5. **Current State** - Existing infrastructure and goals
6. **Additional Context** - Attribution and additional notes

### Interactive Elements
- **Progress Indicator** - Visual step progression with completion status
- **Multi-select Options** - Checkbox groups for services and requirements
- **Conditional Validation** - Required fields vary by step
- **Smooth Animations** - Framer Motion transitions between steps
- **Responsive Design** - Optimized for all device sizes
- **Smart Scheduling** - Date/time picker with business hours

### Data Collection Categories

#### Consultation Types
- Strategic Assessment - Comprehensive evaluation of learning strategy
- SSA Consultation - Strategic Skills Architecture planning
- Solara Platform Exploration - AI-powered learning platform consultation
- Implementation Planning - Roadmap for successful deployment
- ROI & Business Case Analysis - Financial impact and business justification
- Custom Solution Design - Tailored learning solution architecture

#### Service Interest
- Ignite Series - Pre-built courses for talent pipeline
- Strategic Skills Architecture - Custom learning solutions
- Solara Platform - AI-powered learning platform
- Custom Development - Tailored learning solutions
- Integration Services - LMS and system integration
- Training Services - Implementation and change management

#### Business Context
- Team size and budget range assessment
- Timeline for implementation planning
- Decision maker identification
- Implementation scope definition
- Primary and secondary challenge identification

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
npm run migrate:consultation
```

Or directly with tsx:

```bash
npx tsx scripts/migrate-consultation-table.ts
```

### Verification

After running the migration, you should see:

1. ✅ Success message confirming table creation
2. 📋 Table structure listing all columns
3. 🔗 Confirmation that the table is ready to receive submissions

## API Integration

The Consultation API endpoint (`/api/leads/consultation`) will automatically:

1. Validate incoming data (name, email, company, consultationType, preferredDate, preferredTime, primaryChallenge, serviceInterest required)
2. Validate email format and preferred date is in the future
3. Store submissions in the `app.consultation_requests` table
4. Send comprehensive notification emails to the consultation team
5. Return success response with request ID and timestamp

### Email Notifications

The system sends detailed HTML emails including:
- All form data organized by sections
- Request ID and submission timestamp
- Source attribution (Consultation Request Modal)
- Formatted for easy reading and action by consultation team

## Security

- Row Level Security (RLS) is enabled
- Only service role can access the table
- Email validation is enforced
- Date validation ensures future dates only
- IP address and user agent are captured for context
- Priority field for lead scoring

## Monitoring

You can monitor consultation requests by querying:

```sql
SELECT 
  id, name, company, consultation_type, service_interest, preferred_date, status, priority
FROM app.consultation_requests 
ORDER BY created_at DESC;
```

### Key Metrics to Track
- Consultation request volume by type
- Most requested services and requirements
- Scheduling preferences and availability patterns
- Budget range distribution
- Industry and company size patterns
- Conversion rates from consultation requests to scheduled consultations

## Consultation Team Workflow

### Lead Management
- **Priority Scoring** - Based on company size, budget, timeline, urgency
- **Assignment** - Route to appropriate consultation team member
- **Follow-up** - Track consultation scheduling and outcomes
- **Notes** - Add consultation notes and outcomes

### Consultation Scheduling
- **Calendar Integration** - Sync with consultation team calendars
- **Confirmation Emails** - Automated consultation confirmations
- **Reminder System** - Pre-consultation reminders and preparation
- **Post-consultation Tracking** - Outcomes and next steps

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
DROP TABLE IF EXISTS app.consultation_requests;
```

## Next Steps

After successful migration:

1. Test the consultation modal form submission
2. Verify email notifications are working
3. Set up lead scoring based on priority field
4. Configure CRM integration for consultation team
5. Set up calendar integration for consultation scheduling
6. Create automated follow-up sequences

## Business Intelligence

The comprehensive data collection enables:

### Sales Intelligence
- Lead qualification based on responses
- Priority scoring for follow-up
- Service interest patterns
- Budget and timeline analysis
- Competitive landscape insights

### Product Development
- Most requested consultation types and services
- Industry-specific needs and requirements
- Implementation timeline preferences
- Integration requirements patterns

### Marketing Insights
- Attribution source effectiveness
- Consultation type preferences
- Industry and company size patterns
- Service interest by segment

## Support

For issues with the migration, check:
- Database connection logs
- Environment variable configuration
- Database user permissions
- Email service configuration

## Future Enhancements

Potential improvements:
- Calendar integration for real-time availability
- Automated consultation scheduling
- Video conferencing integration
- Pre-consultation questionnaire
- Post-consultation feedback collection
- Advanced analytics dashboard
- A/B testing for form optimization
- Multi-language support
- Mobile app integration
- Integration with CRM systems
- Automated follow-up sequences
- Consultation outcome tracking
