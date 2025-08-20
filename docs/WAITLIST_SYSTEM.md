# Waitlist System Documentation

## Overview

The Waitlist System is a comprehensive solution for collecting user interest across all products, courses, and features on the Smartslate website. It provides a unified way to capture leads with detailed information about user needs and preferences.

## Features

- **Universal Application**: Can be used for any product, course, or feature
- **Source Tracking**: Every submission includes a source field for analytics
- **Course/Product Context**: Optional course name for better context
- **Comprehensive Form**: Collects detailed information about users
- **Email Notifications**: Automatic email alerts for new leads
- **Database Storage**: All submissions stored in Supabase for admin review
- **Responsive Design**: Works on all devices with consistent styling
- **Customizable Buttons**: Multiple variants and sizes for different use cases

## Components

### 1. WaitlistModal

The main modal component that displays the waitlist form.

**Location**: `src/components/ui/WaitlistModal.tsx`

**Features**:
- Multi-section form with organized fields
- Form validation with error handling
- Success state with confirmation message
- Responsive design for all screen sizes
- Accessible with proper ARIA labels

**Form Sections**:
- Contact Information (Name, Email, Phone, Company)
- Professional Context (Role, Industry, Company Size, Location)
- Your Interest (Interest Level, Learning Goals, Start Date, Format, Experience)
- Business Context (Team Size, Budget, Timeline, Referral Source)
- Additional Information (How did you hear, Additional notes)

### 2. WaitlistButton

A reusable button component that triggers the waitlist modal.

**Location**: `src/components/ui/WaitlistButton.tsx`

**Props**:
- `source` (required): The source identifier for tracking
- `courseName` (optional): The specific course or product name
- `variant`: Button style - "primary", "secondary", or "outline"
- `size`: Button size - "sm", "md", or "lg"
- `className`: Additional CSS classes
- `children`: Custom button text (optional)

**Variants**:
- **Primary**: Gradient background with primary accent colors
- **Secondary**: Gradient background with secondary accent colors
- **Outline**: Border with primary accent color

**Sizes**:
- **Small**: Compact button for inline use
- **Medium**: Standard button size
- **Large**: Prominent button for CTAs

### 3. useWaitlistModal Hook

A custom hook for managing the waitlist modal state.

**Location**: `src/hooks/useWaitlistModal.ts`

**State**:
- `isOpen`: Whether the modal is currently open
- `source`: The current source identifier
- `courseName`: The current course/product name

**Actions**:
- `openModal(source, courseName?)`: Opens the modal with specified source and optional course name
- `closeModal()`: Closes the modal and resets state

## API Endpoint

### POST `/api/leads/waitlist`

**Location**: `src/app/api/leads/waitlist/route.ts`

**Required Fields**:
- `name`: User's full name
- `email`: User's email address
- `source`: Source identifier for tracking

**Optional Fields**:
- `phone`: User's phone number
- `company`: User's company name
- `role`: User's job role
- `industry`: User's industry
- `companySize`: Company size range
- `location`: User's location
- `courseName`: Specific course or product name
- `interestLevel`: User's interest level
- `learningGoals`: User's learning objectives
- `preferredStartDate`: Preferred start date
- `learningFormat`: Preferred learning format
- `experienceLevel`: User's experience level
- `teamSize`: Size of user's team
- `budgetRange`: Budget range for the solution
- `timeline`: Expected timeline for implementation
- `referralSource`: How the user heard about Smartslate
- `additionalInfo`: Any additional information

## Database Schema

### Table: `waitlist_leads`

The waitlist submissions are stored in the `waitlist_leads` table in Supabase.

**Fields**:
```sql
CREATE TABLE waitlist_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  role TEXT,
  industry TEXT,
  company_size TEXT,
  location TEXT,
  source TEXT NOT NULL,
  course_name TEXT,
  interest_level TEXT DEFAULT 'high',
  learning_goals TEXT,
  preferred_start_date DATE,
  learning_format TEXT,
  experience_level TEXT,
  team_size TEXT,
  budget_range TEXT,
  timeline TEXT,
  referral_source TEXT,
  additional_info TEXT,
  how_did_you_hear TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Usage Examples

### Basic Waitlist Button

```tsx
import WaitlistButton from '@/components/ui/WaitlistButton';

<WaitlistButton 
  source="homepage-hero" 
  variant="primary" 
  size="lg"
>
  Join Waitlist
</WaitlistButton>
```

### Course-Specific Waitlist

```tsx
<WaitlistButton 
  source="ai-foundations-course" 
  courseName="AI Foundations"
  variant="outline"
>
  Get Early Access
</WaitlistButton>
```

### Custom Waitlist Modal

```tsx
import { useWaitlistModal } from '@/hooks/useWaitlistModal';

const MyComponent = () => {
  const { openModal } = useWaitlistModal();
  
  const handleWaitlistClick = () => {
    openModal('custom-source', 'Custom Course');
  };
  
  return (
    <button onClick={handleWaitlistClick}>
      Join Custom Waitlist
    </button>
  );
};
```

## Email Notifications

### Automatic Notifications

When a waitlist submission is received:

1. **Lead is stored** in the database
2. **Email notification** is sent to the team
3. **Confirmation** is shown to the user

### Email Template

The email includes:
- Lead ID and submission timestamp
- All form field data
- Source and course context
- Business context information
- IP address and user agent for tracking

### Email Configuration

Set the recipient email via environment variable:
```bash
LEADS_EMAIL_TO=hello@smartslate.io
```

## Form Validation

### Client-Side Validation

- **Required fields**: Name, email, and source are mandatory
- **Email format**: Validates email address format
- **Field types**: Ensures proper data types for each field

### Server-Side Validation

- **Input sanitization**: All inputs are sanitized
- **Database constraints**: Database-level validation
- **Error handling**: Comprehensive error responses

## Styling and Design

### Design System Integration

The waitlist system follows the Smartslate design system:

- **Glass morphism**: Consistent with overall design
- **Color palette**: Uses brand colors and accents
- **Typography**: Follows established font hierarchy
- **Spacing**: Consistent with design system spacing

### Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Breakpoint adaptation**: Responsive across all screen sizes
- **Touch-friendly**: Optimized for touch interactions

## Testing

### Test Page

A dedicated test page is available at `/waitlist-example` for testing:

- Form functionality
- Validation behavior
- Modal interactions
- Responsive design

### Testing Checklist

When testing the waitlist system:

- [ ] Form submission works correctly
- [ ] Validation errors display properly
- [ ] Success state shows confirmation
- [ ] Email notifications are sent
- [ ] Database records are created
- [ ] Responsive design works on all devices
- [ ] Accessibility features function correctly

## Troubleshooting

### Common Issues

1. **Form not submitting**
   - Check browser console for errors
   - Verify all required fields are filled
   - Ensure network connectivity

2. **Email not received**
   - Check `LEADS_EMAIL_TO` environment variable
   - Verify email service configuration
   - Check spam/junk folders

3. **Database errors**
   - Run `npm run setup:database` to ensure tables exist
   - Check Supabase connection
   - Verify environment variables

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

## Future Enhancements

### Planned Features

- **A/B Testing**: Test different form layouts and copy
- **Progressive Profiling**: Collect additional information over time
- **Integration**: Connect with CRM and marketing tools
- **Analytics**: Advanced lead tracking and conversion metrics
- **Personalization**: Dynamic forms based on user behavior

### Technical Improvements

- **Performance**: Optimize form loading and submission
- **Caching**: Implement smart caching strategies
- **Security**: Add rate limiting and bot protection
- **Accessibility**: Enhance screen reader support

## Security Considerations

### Data Protection

- **Input sanitization**: All user inputs are sanitized
- **SQL injection protection**: Uses parameterized queries
- **XSS prevention**: Next.js built-in protection
- **Data encryption**: Supabase provides encryption at rest

### Privacy Compliance

- **GDPR compliance**: Data handling follows privacy regulations
- **Data retention**: Configurable data retention policies
- **User consent**: Clear consent for data collection
- **Right to deletion**: Users can request data removal

## Performance Optimization

### Loading Optimization

- **Lazy loading**: Modal loads only when needed
- **Code splitting**: Components are code-split automatically
- **Bundle optimization**: Minimal bundle impact

### Database Performance

- **Indexed queries**: Database queries are optimized
- **Connection pooling**: Efficient database connections
- **Query optimization**: Minimal database load

## Monitoring and Analytics

### Key Metrics

Track these metrics for the waitlist system:

- **Conversion rate**: Form completion percentage
- **Drop-off points**: Where users abandon the form
- **Submission volume**: Daily/weekly submission counts
- **Source effectiveness**: Which sources generate most leads

### Monitoring Tools

- **Supabase Dashboard**: Database performance and usage
- **Email delivery**: Email service monitoring
- **Error tracking**: Form submission errors
- **Performance metrics**: Page load and form performance

---

This documentation is maintained by the development team and should be updated as the system evolves.


