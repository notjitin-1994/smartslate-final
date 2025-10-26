# API Documentation

This document provides comprehensive information about the SmartSlate API endpoints, their usage, and data structures.

## Overview

The SmartSlate API provides endpoints for lead capture, database management, and system operations. All endpoints are RESTful and return JSON responses.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://app.smartslate.io`

## Authentication

Currently, the API endpoints are public and do not require authentication. Future versions may implement authentication for admin endpoints.

## Lead Capture APIs

### Waitlist Submission

**Endpoint**: `POST /api/leads/waitlist`

**Description**: Submit a course waitlist interest form

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "source": "course-name",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "role": "Developer",
  "industry": "Technology",
  "companySize": "50-100",
  "location": "New York",
  "courseName": "AI Foundations",
  "interestLevel": "high",
  "learningGoals": "Learn AI basics",
  "preferredStartDate": "2024-03-01",
  "learningFormat": "online",
  "experienceLevel": "beginner",
  "teamSize": "5-10",
  "budgetRange": "$1000-5000",
  "timeline": "3 months",
  "referralSource": "Google",
  "additionalInfo": "Additional context"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Waitlist submission successful",
  "leadId": "uuid",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Solara Interest

**Endpoint**: `POST /api/leads/solara`

**Description**: Submit interest in Solara product

**Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "role": "Manager",
  "department": "Learning",
  "industry": "Education",
  "companySize": "100-500",
  "location": "San Francisco",
  "primaryUseCase": "Employee Training",
  "secondaryUseCases": ["Compliance", "Onboarding"],
  "currentChallenges": "Manual process",
  "teamSize": "10-20",
  "budgetRange": "$5000-10000",
  "timeline": "6 months",
  "decisionMakers": "CTO, HR Director",
  "implementationScope": "Enterprise-wide",
  "serviceInterest": ["Solara Polaris", "Solara Nova"],
  "specificRequirements": ["SSO", "API Integration"],
  "useCase": "Corporate training platform",
  "integrationNeeds": ["HRIS", "LMS"],
  "complianceNeeds": ["GDPR", "SOC2"],
  "currentLms": "Moodle",
  "currentTools": ["Zoom", "Slack"],
  "learningGoals": "Improve employee skills",
  "successMetrics": "Completion rates",
  "painPoints": "Low engagement",
  "desiredOutcomes": "Higher retention",
  "howDidYouHear": "Conference",
  "competitiveAnalysis": "Better than competitors",
  "additionalNotes": "Looking for modern solution",
  "referralSource": "Industry colleague"
}
```

### SSA Interest

**Endpoint**: `POST /api/leads/ssa`

**Description**: Submit interest in SSA product

**Request Body**: Similar to Solara with SSA-specific fields

### Case Study Request

**Endpoint**: `POST /api/leads/case-study`

**Description**: Request a case study consultation

**Request Body**:
```json
{
  "name": "Bob Johnson",
  "email": "bob@example.com",
  "phone": "+1234567890",
  "company": "Enterprise Inc",
  "role": "Director",
  "industry": "Manufacturing",
  "caseStudyType": "Digital Transformation",
  "specificInterests": ["AI Implementation", "Process Automation"],
  "currentChallenges": "Legacy systems",
  "followUp": "Phone call preferred"
}
```

### Consultation Request

**Endpoint**: `POST /api/leads/consultation`

**Description**: Book a consultation session

**Request Body**:
```json
{
  "name": "Alice Brown",
  "email": "alice@example.com",
  "phone": "+1234567890",
  "company": "Startup Co",
  "role": "Founder",
  "department": "Operations",
  "industry": "SaaS",
  "companySize": "10-50",
  "location": "Austin",
  "consultationType": "Strategy Session",
  "preferredDate": "2024-02-15",
  "preferredTime": "2:00 PM",
  "timezone": "America/Chicago",
  "consultationDuration": "60 minutes",
  "attendeesCount": 3,
  "attendeeRoles": ["Founder", "CTO", "HR Manager"],
  "urgencyLevel": "high",
  "primaryChallenge": "Scaling team",
  "secondaryChallenges": ["Process optimization", "Culture building"],
  "teamSize": "25",
  "budgetRange": "$10000-25000",
  "timeline": "3 months",
  "decisionMakers": "Board of Directors",
  "implementationScope": "Full company",
  "serviceInterest": ["Solara Platform", "Custom Development"],
  "specificRequirements": ["Multi-tenant", "Mobile app"],
  "useCase": "Employee development platform",
  "integrationNeeds": ["Slack", "Notion"],
  "complianceNeeds": ["GDPR", "HIPAA"],
  "currentLms": "None",
  "currentTools": ["Slack", "Notion", "Zoom"],
  "learningGoals": "Build learning culture",
  "successMetrics": "Employee satisfaction",
  "painPoints": "No structured learning",
  "desiredOutcomes": "Improved retention",
  "howDidYouHear": "LinkedIn",
  "competitiveAnalysis": "Better UX than competitors",
  "additionalNotes": "Need quick implementation",
  "referralSource": "Industry event"
}
```

### Demo Request

**Endpoint**: `POST /api/leads/demo`

**Description**: Schedule a product demonstration

**Request Body**: Similar to consultation with demo-specific fields

### Partnership Inquiry

**Endpoint**: `POST /api/leads/partner`

**Description**: Submit a partnership proposal

**Request Body**:
```json
{
  "name": "Carol Wilson",
  "email": "carol@example.com",
  "phone": "+1234567890",
  "company": "Partner Corp",
  "role": "Partnership Manager",
  "industry": "Technology",
  "partnershipType": "Reseller",
  "companyDescription": "Leading tech solutions provider",
  "targetMarket": "Enterprise",
  "currentOfferings": ["Software", "Services"],
  "partnershipGoals": "Expand market reach",
  "expectedTimeline": "3 months",
  "additionalNotes": "Looking for strategic partnership"
}
```

## Database Management APIs

### Setup Database

**Endpoint**: `POST /api/setup-database`

**Description**: Initialize database tables and schema

**Request**: No body required

**Response**:
```json
{
  "success": true,
  "message": "Database setup complete"
}
```

### Check Database

**Endpoint**: `GET /api/check-database`

**Description**: Verify database connection and table status

**Response**:
```json
{
  "status": "connected",
  "tables": {
    "waitlist_leads": "exists",
    "solara_interest_modal": "exists",
    "ssa_interest_modal": "exists",
    "case_study_requests": "exists",
    "consultation_requests": "exists",
    "demo_requests": "exists",
    "partner_inquiries": "exists"
  }
}
```

## Error Handling

All API endpoints return appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error

**Error Response Format**:
```json
{
  "error": "Error description",
  "details": "Additional error information"
}
```

## Rate Limiting

Currently, no rate limiting is implemented. Future versions may include rate limiting for production use.

## Data Validation

All endpoints include input validation:

- Required field validation
- Email format validation
- Data type validation
- Business logic validation

## Email Notifications

Successful lead submissions trigger email notifications to the team:

- **Recipient**: Configured via `LEADS_EMAIL_TO` environment variable
- **Format**: HTML email with lead details
- **Delivery**: Asynchronous (fire-and-forget)

## Future Enhancements

Planned API improvements:

- Authentication and authorization
- Rate limiting
- Webhook support
- Bulk operations
- Analytics endpoints
- Admin dashboard APIs
