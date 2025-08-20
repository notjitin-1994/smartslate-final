# Environment Configuration

## Overview

This repository is a Next.js application with Supabase integration for database and authentication. It provides lead capture capabilities and product showcase functionality.

## Environment Variables

### Required Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://oyjslszrygcajdpwgxbe.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### Optional Variables

```bash
# Email Configuration
LEADS_EMAIL_TO="hello@smartslate.io"

# Database URLs (if using direct connections)
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"
```

## Supabase Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Get your project credentials** from the project settings
3. **Set up your environment variables** in `.env.local`

## Database Tables

The application automatically creates the following tables when you run the setup script:

- `waitlist_leads` - Course waitlist submissions
- `solara_interest_modal` - Solara product interest
- `ssa_interest_modal` - SSA product interest
- `case_study_requests` - Case study inquiries
- `consultation_requests` - Consultation bookings
- `demo_requests` - Demo scheduling
- `partner_inquiries` - Partnership requests

## Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials

3. **Set up database**
   ```bash
   npm run setup:database
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Production Deployment

1. **Set environment variables** in your hosting platform
2. **Ensure Supabase project** is accessible from your production domain
3. **Run database setup** on first deployment
4. **Configure CORS** if needed in Supabase settings

## Security Considerations

- **Never commit** `.env.local` to version control
- **Use environment variables** in production hosting
- **Restrict Supabase access** to your production domains
- **Monitor API usage** through Supabase dashboard

## Troubleshooting

### Database Connection Issues

- Verify your Supabase project is active
- Check your database credentials
- Ensure your IP is not blocked by Supabase

### Environment Variable Issues

- Verify all required variables are set
- Check for typos in variable names
- Ensure `.env.local` is in the project root

### Supabase Service Role Key

- This key has elevated permissions
- Use only for server-side operations
- Never expose in client-side code

