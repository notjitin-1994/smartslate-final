# Demo Request Modal Database Migration & Implementation

This document explains the comprehensive Demo Request Modal implementation and database setup for scheduling demos across all SmartSlate products and services.

## Overview

The Demo Request Modal is a comprehensive 6-step form that collects detailed information for scheduling personalized demos of SmartSlate's products and services. It covers contact information, demo preferences, business context, product interest, current state, and additional requirements.

## SmartSlate Products & Services

The modal is designed to handle demos for all SmartSlate offerings:

1. **Ignite Series** - Pre-built courses for talent pipeline development
2. **Strategic Skills Architecture (SSA)** - Custom learning solutions
3. **Solara** - AI-powered learning platform
4. **Custom Solutions** - Tailored enterprise implementations
5. **Platform Overview** - General platform walkthrough

## Files

- `create_demo_requests.sql` - Database schema definition
- `migrate-demo-table.ts` - Migration script
- `src/app/api/leads/demo/route.ts` - API endpoint for form submissions
- `src/components/landing/DemoModal.tsx` - Comprehensive 6-step modal
- `src/hooks/useDemoModal.ts` - Zustand state management
- `src/components/ui/DemoButton.tsx` - Reusable demo button component
- `README-DEMO-MIGRATION.md` - This documentation

## Table Structure

The `app.demo_requests` table includes:

### Step 1: Contact & Professional Information
- `name`, `email`, `phone` - Contact details
- `company`, `role`, `department` - Professional context
- `industry`, `company_size`, `location` - Company information

### Step 2: Demo Preferences & Scheduling
- `demo_type` - Type of demo requested
- `preferred_date`, `preferred_time`, `timezone` - Scheduling details
- `demo_duration`, `attendees_count`, `attendee_roles` - Demo logistics

### Step 3: Business Context & Challenges
- `current_challenges` - Primary business challenges
- `team_size`, `budget_range`, `timeline` - Implementation context
- `decision_makers`, `implementation_scope` - Stakeholder information

### Step 4: Product Interest & Features
- `product_interest` - Array of products of interest
- `specific_features` - Array of desired features
- `use_case`, `integration_needs` - Technical requirements

### Step 5: Current State & Requirements
- `current_lms`, `current_tools` - Existing infrastructure
- `learning_goals`, `success_metrics` - Objectives and KPIs
- `compliance_needs` - Regulatory requirements

### Step 6: Additional Context
- `how_did_you_hear` - Attribution source
- `competitive_analysis` - Other solutions considered
- `additional_notes`, `urgency_level` - Context and priority

### Metadata & Tracking
- `created_at`, `updated_at` - Timestamps
- `ip_address`, `user_agent` - Request context
- `status`, `lead_type`, `source` - Lead tracking
- `priority`, `assigned_to` - Sales team management
- `demo_scheduled`, `demo_date`, `demo_notes` - Demo tracking

## Modal Features

### 6-Step Progressive Form
1. **Contact & Professional Information** - Basic contact and company details
2. **Demo Preferences & Scheduling** - Demo type, date, time, and logistics
3. **Business Context & Challenges** - Understanding business needs and challenges
4. **Product Interest & Features** - Specific products and features of interest
5. **Current State & Requirements** - Existing infrastructure and requirements
6. **Additional Context** - Attribution, competitive landscape, and notes

### Interactive Elements
- **Progress Indicator** - Visual step progression with completion status
- **Multi-select Options** - Checkbox groups for products, features, tools
- **Conditional Validation** - Required fields vary by step
- **Smooth Animations** - Framer Motion transitions between steps
- **Responsive Design** - Optimized for all device sizes
- **Smart Scheduling** - Date/time picker with business hours

### Data Collection Categories

#### Demo Types
- Platform Overview - General platform walkthrough
- Custom Demo - Tailored to specific needs
- Technical Deep Dive - Advanced features and integration
- ROI Workshop - Business case and ROI analysis

#### Product Interest
- Ignite Series - Pre-built courses
- Strategic Skills Architecture - Custom solutions
- Solara Platform - AI-powered learning
- Custom Solutions - Enterprise implementations

#### Specific Features
- AI & ML Courses - Advanced AI literacy and technical skills
- Cloud & DevOps - AWS, Azure, and DevOps practices
- Leadership Development - Executive and management training
- Custom Learning Paths - Tailored curriculum design
- Learning Analytics - Progress tracking and insights
- System Integration - HRIS and LMS integration

#### Integration Needs
- LMS Integration - Connect with existing learning management systems
- HR Systems - Integrate with HRIS and talent management
- Single Sign-On (SSO) - Seamless authentication
- API Access - Custom integrations and data exchange
- Data Warehouse - Connect with analytics platforms
- Video Platforms - Integrate with video hosting services
- Communication Tools - Slack, Teams, etc.
- Other Systems - Custom enterprise systems

#### Compliance Needs
- Industry-specific compliance (finance, healthcare, etc.)
- Data privacy and security requirements
- Audit trail and reporting needs
- Certification and accreditation requirements

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
npm run migrate:demo
```

Or directly with tsx:

```bash
npx tsx scripts/migrate-demo-table.ts
```

### Verification

After running the migration, you should see:

1. ✅ Success message confirming table creation
2. 📋 Table structure listing all columns
3. 🔗 Confirmation that the table is ready to receive submissions

## API Integration

The Demo API endpoint (`/api/leads/demo`) will automatically:

1. Validate incoming data (name, email, company, demoType, preferredDate, preferredTime, productInterest required)
2. Validate email format and preferred date is in the future
3. Store submissions in the `app.demo_requests` table
4. Send comprehensive notification emails to the sales team
5. Return success response with request ID and timestamp

### Email Notifications

The system sends detailed HTML emails including:
- All form data organized by sections
- Request ID and submission timestamp
- Source attribution (Demo Request Modal)
- Formatted for easy reading and action by sales team

## Security

- Row Level Security (RLS) is enabled
- Only service role can access the table
- Email validation is enforced
- Date validation ensures future dates only
- IP address and user agent are captured for context
- Priority field for lead scoring

## Monitoring

You can monitor demo requests by querying:

```sql
SELECT 
  id, name, company, demo_type, product_interest, preferred_date, status, priority
FROM app.demo_requests 
ORDER BY created_at DESC;
```

### Key Metrics to Track
- Demo request volume by product interest
- Most requested demo types and features
- Scheduling preferences and availability patterns
- Budget range distribution
- Industry and company size patterns
- Conversion rates from demo requests to scheduled demos

## Sales Team Workflow

### Lead Management
- **Priority Scoring** - Based on company size, budget, timeline, urgency
- **Assignment** - Route to appropriate sales team member
- **Follow-up** - Track demo scheduling and outcomes
- **Notes** - Add demo notes and outcomes

### Demo Scheduling
- **Calendar Integration** - Sync with sales team calendars
- **Confirmation Emails** - Automated demo confirmations
- **Reminder System** - Pre-demo reminders and preparation
- **Post-demo Tracking** - Outcomes and next steps

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
DROP TABLE IF EXISTS app.demo_requests;
```

## Next Steps

After successful migration:

1. Test the demo modal form submission
2. Verify email notifications are working
3. Set up lead scoring based on priority field
4. Configure CRM integration for sales team
5. Set up calendar integration for demo scheduling
6. Create automated follow-up sequences

## Business Intelligence

The comprehensive data collection enables:

### Sales Intelligence
- Lead qualification based on responses
- Priority scoring for follow-up
- Product interest patterns
- Budget and timeline analysis
- Competitive landscape insights

### Product Development
- Most requested features and integrations
- Industry-specific needs and requirements
- Implementation timeline preferences
- Integration requirements patterns

### Marketing Insights
- Attribution source effectiveness
- Demo type preferences
- Industry and company size patterns
- Feature interest by segment

## Support

For issues with the migration, check:
- Database connection logs
- Environment variable configuration
- Database user permissions
- Email service configuration

## Future Enhancements

Potential improvements:
- Calendar integration for real-time availability
- Automated demo scheduling
- Video conferencing integration
- Pre-demo questionnaire
- Post-demo feedback collection
- Advanced analytics dashboard
- A/B testing for form optimization
- Multi-language support
- Mobile app integration
