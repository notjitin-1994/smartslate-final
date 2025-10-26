# Modal Migration Guide

This guide shows how to migrate existing modals to use the new unified submission system.

## Quick Reference

### Before vs After

**Before (Old System):**
```typescript
const response = await fetch('/api/leads/demo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

**After (New System):**
```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

const result = await submitModalForm({
  modalType: 'demo',
  name: formData.name,
  email: formData.email,
  company: formData.company,
  formData: { ...allOtherFields },
});
```

## Migration Steps by Modal

### 1. Contact Form ✅ (COMPLETED)

**File:** `src/app/contact/page.tsx`

**Changes Made:**
1. Added import: `import { submitModalForm } from '@/lib/api/modal-submission';`
2. Replaced fetch call with `submitModalForm`
3. Updated modal type to `'contact'`

**Before:**
```typescript
const response = await fetch('/api/leads/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

**After:**
```typescript
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
  },
});
```

---

### 2. Demo Modal (TODO)

**File:** `src/components/landing/DemoModal.tsx`

**Current Endpoint:** `/api/leads/demo`

**Migration Steps:**

```typescript
// 1. Add import
import { submitModalForm } from '@/lib/api/modal-submission';

// 2. Find the submit function (around line 300-400)
const handleSubmit = async () => {
  // 3. Replace the fetch call
  const result = await submitModalForm({
    modalType: 'demo',
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    role: formData.role,
    formData: {
      // All demo-specific fields
      demoType: formData.demoType,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      timezone: formData.timezone,
      demoDuration: formData.demoDuration,
      attendeesCount: formData.attendeesCount,
      attendeeRoles: formData.attendeeRoles,
      currentChallenges: formData.currentChallenges,
      teamSize: formData.teamSize,
      budgetRange: formData.budgetRange,
      timeline: formData.timeline,
      decisionMakers: formData.decisionMakers,
      implementationScope: formData.implementationScope,
      specificFeatures: formData.specificFeatures,
      useCase: formData.useCase,
      integrationNeeds: formData.integrationNeeds,
      currentLMS: formData.currentLMS,
      currentTools: formData.currentTools,
      learningGoals: formData.learningGoals,
      successMetrics: formData.successMetrics,
      howDidYouHear: formData.howDidYouHear,
      competitiveAnalysis: formData.competitiveAnalysis,
      additionalNotes: formData.additionalNotes,
      urgencyLevel: formData.urgencyLevel,
    },
  });

  // 4. Handle response
  if (result.success) {
    // Success handling
  } else {
    // Error handling
  }
};
```

---

### 3. Consultation Modal (TODO)

**File:** `src/components/landing/ConsultationModal.tsx`

**Current Endpoint:** `/api/leads/consultation`

**Migration:**

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

const result = await submitModalForm({
  modalType: 'consultation',
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company: formData.company,
  role: formData.role,
  formData: {
    consultationType: formData.consultationType,
    preferredDate: formData.preferredDate,
    preferredTime: formData.preferredTime,
    timezone: formData.timezone,
    consultationDuration: formData.consultationDuration,
    attendeesCount: formData.attendeesCount,
    attendeeRoles: formData.attendeeRoles,
    urgencyLevel: formData.urgencyLevel,
    primaryChallenge: formData.primaryChallenge,
    secondaryChallenges: formData.secondaryChallenges,
    teamSize: formData.teamSize,
    budgetRange: formData.budgetRange,
    timeline: formData.timeline,
    serviceInterest: formData.serviceInterest,
    specificRequirements: formData.specificRequirements,
    useCase: formData.useCase,
    integrationNeeds: formData.integrationNeeds,
    complianceNeeds: formData.complianceNeeds,
    currentLMS: formData.currentLMS,
    currentTools: formData.currentTools,
    learningGoals: formData.learningGoals,
    successMetrics: formData.successMetrics,
    painPoints: formData.painPoints,
    desiredOutcomes: formData.desiredOutcomes,
    howDidYouHear: formData.howDidYouHear,
    competitiveAnalysis: formData.competitiveAnalysis,
    additionalNotes: formData.additionalNotes,
    referralSource: formData.referralSource,
  },
});
```

---

### 4. Case Study Modal (TODO)

**File:** `src/components/landing/CaseStudyModal.tsx`

**Current Endpoint:** `/api/leads/case-study`

**Migration:**

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

const result = await submitModalForm({
  modalType: 'case-study',
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company: formData.company,
  role: formData.role,
  formData: {
    industry: formData.industry,
    caseStudyType: formData.caseStudyType,
    specificInterests: formData.specificInterests,
    currentChallenges: formData.currentChallenges,
    followUp: formData.followUp,
  },
});
```

---

### 5. Partner Modal (TODO)

**File:** `src/components/landing/PartnerModal.tsx`

**Current Endpoint:** `/api/leads/partner`

**Migration:**

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

const result = await submitModalForm({
  modalType: 'partner',
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company: formData.company,
  role: formData.role,
  formData: {
    industry: formData.industry,
    partnerType: formData.partnerType, // institution, business, technology, etc.
    organizationSize: formData.organizationSize,
    timeline: formData.timeline,
    currentInitiatives: formData.currentInitiatives,
    partnershipGoals: formData.partnershipGoals,
    budget: formData.budget,
    preferredContact: formData.preferredContact,
    followUp: formData.followUp,
    specificNeeds: formData.specificNeeds,
  },
});
```

---

### 6. Solara Interest Modal (TODO)

**File:** `src/components/products/SolaraInterestModal.tsx`

**Current Endpoint:** `/api/leads/solara`

**Migration:**

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

const result = await submitModalForm({
  modalType: 'solara',
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company: formData.company,
  role: formData.role,
  formData: {
    department: formData.department,
    companySize: formData.companySize,
    industry: formData.industry,
    location: formData.location,
    currentLMS: formData.currentLMS,
    currentTools: formData.currentTools,
    learningChallenges: formData.learningChallenges,
    contentCreationProcess: formData.contentCreationProcess,
    learnerCount: formData.learnerCount,
    contentVolume: formData.contentVolume,
    primaryUseCase: formData.primaryUseCase,
    solaraComponents: formData.solaraComponents,
    specificFeatures: formData.specificFeatures,
    integrationNeeds: formData.integrationNeeds,
    aiRequirements: formData.aiRequirements,
    timeline: formData.timeline,
    budgetRange: formData.budgetRange,
    teamSize: formData.teamSize,
    decisionMakers: formData.decisionMakers,
    implementationScope: formData.implementationScope,
    currentPainPoints: formData.currentPainPoints,
    successMetrics: formData.successMetrics,
    competitiveAnalysis: formData.competitiveAnalysis,
    howDidYouHear: formData.howDidYouHear,
    additionalNotes: formData.additionalNotes,
    privacyConsent: formData.privacyConsent,
  },
});
```

---

### 7. SSA Interest Modal (TODO)

**File:** `src/components/products/SSAInterestModal.tsx`

**Current Endpoint:** `/api/leads/ssa`

**Migration:**

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

const result = await submitModalForm({
  modalType: 'ssa',
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company: formData.company,
  role: formData.role,
  formData: {
    department: formData.department,
    companySize: formData.companySize,
    industry: formData.industry,
    location: formData.location,
    currentChallenges: formData.currentChallenges,
    skillGaps: formData.skillGaps,
    existingLMS: formData.existingLMS,
    currentTrainingBudget: formData.currentTrainingBudget,
    employeeCount: formData.employeeCount,
    targetAudience: formData.targetAudience,
    primaryGoals: formData.primaryGoals,
    timeline: formData.timeline,
    budget: formData.budget,
    specificOutcomes: formData.specificOutcomes,
    technicalRequirements: formData.technicalRequirements,
    integrationNeeds: formData.integrationNeeds,
    decisionMakers: formData.decisionMakers,
    competingPriorities: formData.competingPriorities,
    successMetrics: formData.successMetrics,
    howDidYouHear: formData.howDidYouHear,
    additionalNotes: formData.additionalNotes,
    privacyConsent: formData.privacyConsent,
  },
});
```

---

### 8. Waitlist Modal (TODO)

**File:** `src/components/ui/WaitlistModal.tsx`

**Current Endpoint:** `/api/leads/waitlist`

**Migration:**

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

const result = await submitModalForm({
  modalType: 'waitlist',
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  company: formData.company,
  role: formData.role,
  formData: {
    industry: formData.industry,
    companySize: formData.companySize,
    location: formData.location,
    interestLevel: formData.interestLevel,
    learningGoals: formData.learningGoals,
    preferredStartDate: formData.preferredStartDate,
    learningFormat: formData.learningFormat,
    experienceLevel: formData.experienceLevel,
    teamSize: formData.teamSize,
    budgetRange: formData.budgetRange,
    timeline: formData.timeline,
    referralSource: formData.referralSource,
    howDidYouHear: formData.howDidYouHear,
    additionalInfo: formData.additionalInfo,
    source: source, // Special context parameter
    courseName: courseName, // Special context parameter
  },
});
```

---

### 9. Job Application Modal (TODO)

**File:** `src/components/careers/JobApplicationModal.tsx`

**Current Endpoint:** `/api/careers/apply`

**Note:** This modal uses FormData for file uploads, which requires special handling.

**Migration (Special Case):**

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

// For job applications with file uploads, we need a hybrid approach
// 1. First upload the resume to storage
// 2. Then submit the application data with resume URL

const result = await submitModalForm({
  modalType: 'job-application',
  name: `${formData.firstName} ${formData.lastName}`,
  email: formData.email,
  phone: formData.phone,
  formData: {
    firstName: formData.firstName,
    lastName: formData.lastName,
    location: formData.location,
    linkedinProfile: formData.linkedinProfile,
    portfolio: formData.portfolio,
    currentCompany: formData.currentCompany,
    currentRole: formData.currentRole,
    experience: formData.experience,
    education: formData.education,
    resumeUrl: uploadedResumeUrl, // From file upload
    whyInterested: formData.whyInterested,
    coverLetter: formData.coverLetter,
    salaryExpectation: formData.salaryExpectation,
    startDate: formData.startDate,
    workAuthorization: formData.workAuthorization,
    howDidYouHear: formData.howDidYouHear,
    additionalInfo: formData.additionalInfo,
    agreeToTerms: formData.agreeToTerms,
    jobTitle: jobTitle, // Context from modal
  },
});
```

---

## Testing Checklist

For each migrated modal:

- [ ] Import `submitModalForm` added
- [ ] `modalType` correctly set
- [ ] Common fields (name, email, phone, company, role) extracted
- [ ] All modal-specific fields in `formData` object
- [ ] Success response handled (`result.success`)
- [ ] Error response handled (`result.error`)
- [ ] Form resets on success
- [ ] User feedback (snackbar/toast) implemented
- [ ] Console errors logged for debugging
- [ ] Test submission works in development
- [ ] Verify data appears in `modal_submissions` table

## Database Verification

After migration, verify data is being saved:

```sql
-- Check recent submissions
SELECT * FROM modal_submissions ORDER BY created_at DESC LIMIT 10;

-- Check by modal type
SELECT modal_type, COUNT(*) FROM modal_submissions GROUP BY modal_type;

-- View specific submission
SELECT * FROM modal_submissions WHERE email = 'test@example.com';

-- Check form_data JSONB content
SELECT id, modal_type, form_data->>'demoType' as demo_type FROM modal_submissions WHERE modal_type = 'demo';
```

## Rollback Plan

If issues arise, the old API endpoints still exist and can be used:

1. Remove `import { submitModalForm }` line
2. Restore old fetch call
3. Report issue with details

## Support

Questions about migration? Check:

- Main documentation: `docs/MODAL_SUBMISSION_SYSTEM.md`
- Database schema: `src/lib/database/modal-submissions-schema.sql`
- API route: `src/app/api/modals/submit/route.ts`
- Helper functions: `src/lib/api/modal-submission.ts`
- Example: `src/app/contact/page.tsx` (already migrated)
