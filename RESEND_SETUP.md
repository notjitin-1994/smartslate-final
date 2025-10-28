# Resend Email Integration Setup Guide

This guide will help you set up Resend email integration for the contact form.

## Prerequisites

- A Resend account (sign up at [resend.com](https://resend.com))
- Access to your domain's DNS settings (for production)

## Step 1: Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and sign up or log in
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Give it a name (e.g., "Smartslate Production")
5. Select the appropriate permissions (you need "Send emails" permission)
6. Copy the API key (it starts with `re_`)

## Step 2: Configure Environment Variables

Add your Resend API key to `.env.local`:

```bash
# Resend Email Configuration
RESEND_API_KEY=re_your_actual_api_key_here

# Email Configuration
CONTACT_EMAIL=jitin@smartslate.io
```

**Important:**
- Never commit `.env.local` to git (it's already in .gitignore)
- Use different API keys for development and production
- Keep your API keys secure

## Step 3: Verify Your Domain (Production Only)

For production, you need to verify your domain with Resend:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `smartslate.io`)
4. Add the provided DNS records to your domain:
   - SPF record
   - DKIM records
   - DMARC record (optional but recommended)

### Example DNS Records:

```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: resend._domainkey
Value: [Your DKIM key from Resend]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:jitin@smartslate.io
```

5. Wait for DNS propagation (can take up to 48 hours, usually much faster)
6. Click **Verify** in Resend dashboard

## Step 4: Update Email Sender

Once your domain is verified, update the sender email in `src/lib/email.ts`:

```typescript
from: 'noreply@smartslate.io',  // Change this to your verified domain
```

## Step 5: Set Up Database (Optional)

If you want to store contact submissions in Supabase:

1. Go to your Supabase project
2. Open the SQL Editor
3. Run the migration script: `database/migrations/create_contact_submissions_table.sql`

This creates:
- `contact_submissions` table
- Appropriate indexes
- Row Level Security policies

## Step 6: Test the Integration

### Option 1: Use the test script

```bash
# Make sure your dev server is running
npm run dev

# In another terminal, run:
bash test-contact-form.sh
```

### Option 2: Test manually in the browser

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3000/contact`
3. Fill out and submit the form
4. Check your email at jitin@smartslate.io

### Option 3: Test the API directly

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message",
    "inquiryType": "general"
  }'
```

## Email Features

The contact form integration includes:

1. **Email to Admin** (jitin@smartslate.io)
   - Beautiful HTML template
   - All form data formatted nicely
   - Inquiry type badge
   - Timestamp in IST timezone

2. **Auto-reply to User**
   - Thank you message
   - Confirmation of submission
   - Excerpt of their message
   - Expected response time

3. **Database Storage** (if configured)
   - All submissions saved
   - IP address and user agent for spam prevention
   - Indexed for fast searching

4. **Error Handling**
   - Graceful fallback if email fails
   - Database errors don't break the flow
   - Detailed error logging

## Troubleshooting

### Emails not sending

1. **Check API Key**
   ```bash
   # Verify your .env.local has the correct key
   cat .env.local | grep RESEND_API_KEY
   ```

2. **Check Resend Dashboard**
   - Go to [resend.com/logs](https://resend.com/logs)
   - Check for failed attempts and error messages

3. **Check Server Logs**
   ```bash
   # In your terminal where dev server is running
   # Look for email-related errors
   ```

4. **Verify Domain** (Production)
   - Make sure your domain is verified in Resend
   - Check DNS records are properly configured

### Database errors

1. **Check Supabase connection**
   ```bash
   # Make sure these are set in .env.local
   cat .env.local | grep SUPABASE
   ```

2. **Run migration script**
   - Make sure `contact_submissions` table exists
   - Check Row Level Security policies

### Rate Limits

Resend free tier limits:
- 100 emails per day
- 3,000 emails per month

For production, consider upgrading to a paid plan.

## Production Deployment

For production (Vercel/Netlify/etc.):

1. Add environment variables in your hosting platform:
   ```
   RESEND_API_KEY=re_your_production_key
   CONTACT_EMAIL=jitin@smartslate.io
   ```

2. Verify your domain in Resend

3. Update the `from` email to use your verified domain

4. Test thoroughly before going live

## Security Best Practices

1. **Never expose API keys** in client-side code
2. **Use environment variables** for all sensitive data
3. **Enable rate limiting** if needed
4. **Validate all inputs** on the server side (already implemented)
5. **Monitor for spam** using the stored IP addresses
6. **Consider adding CAPTCHA** for production

## Support

If you encounter issues:

1. Check [Resend Documentation](https://resend.com/docs)
2. Check [Resend Status](https://status.resend.com)
3. Contact Resend support if needed

## Next Steps

- [ ] Get Resend API key
- [ ] Add to .env.local
- [ ] Test locally
- [ ] Verify domain for production
- [ ] Run database migration
- [ ] Deploy to production
- [ ] Monitor email delivery

---

**Last Updated:** October 2025
**Maintained by:** Smartslate Development Team
