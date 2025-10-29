# Smartslate Email Marketing Template

This document explains how to use the Ignite and Polaris marketing email template that has been integrated into the Smartslate platform.

## Overview

The marketing email template is designed to promote both:
- **Polaris**: AI-powered learning platform module (LIVE at polaris.smartslate.io)
- **Ignite Series**: Industry certification programs for career transformation

## Features

### Email Template Features
- **Responsive Design**: Landscape layout on desktop, portrait on mobile
- **Brand Compliance**: Uses Smartslate brand colors (teal accent #a7dadb, blue background #020C1B)
- **Interactive Elements**: Hover effects, transitions, and modern glassmorphism design
- **Direct Links**: Integrated links to `/ignite` and `polaris.smartslate.io`
- **Personalization**: Supports custom user names for personalized greetings

### Technical Features
- HTML5 semantic structure
- CSS Grid and Flexbox for responsive layouts
- Backdrop filters and modern CSS effects
- Email client compatible CSS
- Component-based architecture

## Usage

### 1. Testing the Template

Visit `/email-test` on your local development server:
```
http://localhost:3001/email-test
```

This page provides:
- Live preview of the email template
- Copy HTML functionality
- Test form with email and name inputs
- API integration testing

### 2. Using the Email Service

#### Programmatic Usage

```javascript
import { sendMarketingEmail, createMarketingEmailTemplate } from '@/lib/email';

// Send marketing email
await sendMarketingEmail('user@example.com', 'John Doe');

// Generate HTML template only
const htmlTemplate = createMarketingEmailTemplate('Jane Smith');
```

#### API Usage

Send a POST request to `/api/email-test`:

```json
{
  "to": "user@example.com",
  "userName": "John Doe",
  "testMode": false
}
```

For testing (returns HTML without sending):
```json
{
  "to": "test@example.com",
  "userName": "Test User",
  "testMode": true
}
```

### 3. Customization

#### Template Customization
The template can be customized by modifying:
- **Hero Section**: Update statistics, headlines, and descriptions
- **Product Cards**: Modify features, descriptions, and CTAs
- **Colors**: Adjust brand colors in the CSS variables
- **Typography**: Update fonts and text styling

#### Brand Colors
- Primary Accent: `#a7dadb` (Teal)
- Background Dark: `#020C1B`
- Background Paper: `#0d1b2a`
- Background Surface: `#142433`
- Text Primary: `#e0e0e0`
- Text Secondary: `#b0c5c6`

## File Structure

```
src/
├── app/
│   ├── email-test/page.tsx          # Test and preview page
│   └── api/email-test/route.ts      # API endpoint for testing
├── lib/
│   └── email.ts                     # Email service functions
```

## Integration with Email Services

The template is designed to work with:
- **Resend**: Primary email service (configured)
- **SendGrid**: Compatible (requires integration)
- **Mailgun**: Compatible (requires integration)
- **AWS SES**: Compatible (requires integration)

## Mobile Responsiveness

The template includes:
- Mobile-first responsive design
- Touch-friendly buttons and links
- Optimized layouts for small screens
- Flexible typography scaling

## Testing

### Browser Testing
1. Visit `/email-test` in different browsers
2. Test responsive design using browser dev tools
3. Verify all links work correctly

### Email Client Testing
1. Use the "Generate Test Template" feature
2. Send test emails to popular clients:
   - Gmail
   - Outlook
   - Apple Mail
   - Mobile email clients

### API Testing
```bash
curl -X POST http://localhost:3001/api/email-test \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "userName": "Test User",
    "testMode": true
  }'
```

## Analytics and Tracking

To add tracking:
1. Add UTM parameters to links
2. Include tracking pixels
3. Configure email service analytics

Example UTM parameters:
```
https://www.smartslate.io/ignite?utm_source=email&utm_medium=marketing&utm_campaign=ignite_polaris
```

## Best Practices

1. **Personalization**: Always use recipient names when available
2. **Testing**: Test across multiple email clients
3. **Deliverability**: Follow email marketing best practices
4. **Compliance**: Include unsubscribe links and company information
5. **Performance**: Optimize images and loading times

## Support

For issues or questions:
1. Check the console for error messages
2. Verify email service configuration
3. Test API endpoints independently
4. Review browser compatibility

## Next Steps

Potential enhancements:
1. A/B testing capabilities
2. Dynamic content insertion
3. Advanced personalization
4. Automated campaign scheduling
5. Analytics dashboard integration