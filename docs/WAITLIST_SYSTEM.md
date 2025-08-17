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

A Zustand-based hook for managing the waitlist modal state.

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
- `budgetRange`: Budget range
- `timeline`: Implementation timeline
- `referralSource`: How user found the platform
- `howDidYouHear`: Additional referral information
- `additionalInfo`: Any additional notes

**Response**:
```json
{
  "success": true,
  "message": "Waitlist submission successful",
  "leadId": "uuid",
  "createdAt": "timestamp"
}
```

## Database Schema

The system expects a `waitlist_leads` table in Supabase with the following structure:

```sql
CREATE TABLE waitlist_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  
  -- Professional Context
  role TEXT,
  industry TEXT,
  company_size TEXT,
  location TEXT,
  
  -- Waitlist Details
  source TEXT NOT NULL,
  course_name TEXT,
  interest_level TEXT DEFAULT 'high',
  learning_goals TEXT,
  preferred_start_date TEXT,
  learning_format TEXT,
  experience_level TEXT,
  
  -- Business Context
  team_size TEXT,
  budget_range TEXT,
  timeline TEXT,
  referral_source TEXT,
  
  -- Additional Information
  additional_info TEXT,
  how_did_you_hear TEXT,
  
  -- Analytics
  ip_address INET,
  user_agent TEXT
);
```

## Usage Examples

### Basic Button Usage

```tsx
import WaitlistButton from '@/components/ui/WaitlistButton';

// Simple waitlist button
<WaitlistButton 
  source="General Interest"
  variant="primary"
  size="md"
/>

// Course-specific waitlist button
<WaitlistButton 
  source="AI Course"
  courseName="AI Foundations: Concept to Application"
  variant="secondary"
  size="lg"
>
  Join AI Course Waitlist
</WaitlistButton>
```

### Using the Hook Directly

```tsx
import { useWaitlistModal } from '@/hooks/useWaitlistModal';

function MyComponent() {
  const { openModal } = useWaitlistModal();

  const handleWaitlistClick = () => {
    openModal('Product Launch', 'Smartslate Platform');
  };

  return (
    <button onClick={handleWaitlistClick}>
      Get Early Access
    </button>
  );
}
```

### Custom Integration

```tsx
import { useWaitlistModal } from '@/hooks/useWaitlistModal';

function CourseCard({ course }) {
  const { openModal } = useWaitlistModal();

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button 
        onClick={() => openModal('Course Page', course.title)}
        className="waitlist-btn"
      >
        Join Waitlist
      </button>
    </div>
  );
}
```

## Styling and Theming

The waitlist system uses the existing design system with:

- **Colors**: Primary and secondary accent colors from the theme
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standard spacing scale (4, 6, 8, etc.)
- **Animations**: Framer Motion for smooth transitions
- **Responsiveness**: Mobile-first design with breakpoint-based layouts

## Email Notifications

When a user submits the waitlist form:

1. **Lead Data**: Stored in the database
2. **Email Sent**: Notification sent to the team (configured via `LEADS_EMAIL_TO` env var)
3. **Email Content**: Includes all form data organized in sections
4. **Subject Line**: Format: "Waitlist Lead: {source} - {name}"

## Admin Features

### Viewing Waitlist Leads

All waitlist submissions are stored in the `waitlist_leads` table and can be viewed through:

- Supabase dashboard
- Admin API endpoints (if implemented)
- Database queries

### Analytics

The system tracks:
- **Source attribution**: Where each lead came from
- **Course/product interest**: What users are interested in
- **Geographic data**: User locations
- **Company information**: Business context
- **Timing**: When users want to start

## Configuration

### Environment Variables

```bash
# Required for email notifications
LEADS_EMAIL_TO=hello@smartslate.io

# Supabase configuration (already configured)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Database Setup

1. Create the `waitlist_leads` table in your Supabase database
2. Ensure the service role has insert permissions
3. Set up any necessary RLS policies

## Best Practices

### Source Naming

Use descriptive, consistent source names:
- `"Homepage Hero"`
- `"Course Page - AI Foundations"`
- `"Product Page - Solara"`
- `"Blog Post - AI Skills"`

### Course/Product Names

Use the exact, user-facing names:
- `"AI Foundations: Concept to Application"`
- `"Advanced DevOps & Cloud Engineering"`
- `"Solara Learning Platform"`

### Button Placement

- **Primary CTAs**: Use large, primary variant buttons
- **Secondary CTAs**: Use medium, secondary variant buttons
- **Inline CTAs**: Use small, outline variant buttons

## Troubleshooting

### Common Issues

1. **Modal not opening**: Check that `WaitlistModal` is included in the layout
2. **Form submission fails**: Verify the API endpoint is accessible and database is configured
3. **Styling issues**: Ensure Tailwind CSS is properly configured
4. **Email not sending**: Check `LEADS_EMAIL_TO` environment variable

### Debug Mode

Enable debug logging by checking browser console and server logs for:
- Form validation errors
- API request/response details
- Database connection issues

## Future Enhancements

Potential improvements for the waitlist system:

1. **A/B Testing**: Different form layouts and questions
2. **Progressive Profiling**: Multi-step form with conditional questions
3. **Integration**: CRM integration, marketing automation
4. **Analytics**: Conversion tracking, funnel analysis
5. **Personalization**: Dynamic content based on source/course
6. **Follow-up**: Automated email sequences for waitlist members

## Support

For questions or issues with the waitlist system:

1. Check this documentation
2. Review the example page at `/waitlist-example`
3. Examine the component source code
4. Check browser console and server logs
5. Contact the development team


