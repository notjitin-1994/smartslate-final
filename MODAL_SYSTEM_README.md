# Unified Modal Submission System - Quick Start

> **Status:** ✅ Implemented & Ready for Migration
>
> All website modals now submit to a single database table through a unified API.

## 🎯 What Was Built

A complete, production-ready system that:
- **Unifies** all 9 modal types into one database table
- **Tracks** every user interaction (demo requests, consultations, applications, etc.)
- **Manages** lead status, priority, and follow-up
- **Captures** marketing attribution (UTM parameters)
- **Provides** type-safe TypeScript API

## 📊 Database Overview

**Table:** `modal_submissions`

Stores all submissions from:
1. Demo Modal
2. Consultation Modal
3. Case Study Modal
4. Partner Modal
5. Solara Interest Modal
6. SSA Interest Modal
7. Waitlist Modal
8. Job Application Modal
9. Contact Form ✅ (Already migrated)

## 🚀 Quick Start

### 1. Run Database Migration

**Supabase Dashboard Method:**
1. Open Supabase SQL Editor
2. Copy SQL from: `src/lib/database/modal-submissions-schema.sql`
3. Click "Run"
4. Verify table created: `SELECT * FROM modal_submissions LIMIT 1;`

### 2. Test the System

The contact form is already migrated. Test it at `/contact`

### 3. Migrate Other Modals

Follow instructions in `docs/MODAL_MIGRATION_GUIDE.md` for each modal.

**Example:**
```typescript
// Replace old fetch call
const response = await fetch('/api/leads/demo', {...});

// With new unified submission
import { submitModalForm } from '@/lib/api/modal-submission';

const result = await submitModalForm({
  modalType: 'demo',
  name: formData.name,
  email: formData.email,
  company: formData.company,
  formData: { ...allOtherFields },
});
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/lib/database/modal-submissions-schema.sql` | Database schema (run this first!) |
| `src/app/api/modals/submit/route.ts` | Unified API endpoint |
| `src/lib/api/modal-submission.ts` | Helper functions for client-side |
| `src/app/contact/page.tsx` | Example migrated modal |
| `docs/MODAL_SUBMISSION_SYSTEM.md` | Complete documentation |
| `docs/MODAL_MIGRATION_GUIDE.md` | Step-by-step migration guide |
| `docs/IMPLEMENTATION_SUMMARY.md` | Detailed implementation info |

## 📝 To-Do List

### Immediate (Required)

- [ ] **Run database migration** (see Quick Start #1)
- [ ] **Test contact form** to verify system works
- [ ] **Verify data** appears in `modal_submissions` table

### Phase 1: High Priority Modals

- [ ] Migrate Demo Modal (`src/components/landing/DemoModal.tsx`)
- [ ] Migrate Consultation Modal (`src/components/landing/ConsultationModal.tsx`)

### Phase 2: Product Modals

- [ ] Migrate Solara Interest Modal (`src/components/products/SolaraInterestModal.tsx`)
- [ ] Migrate SSA Interest Modal (`src/components/products/SSAInterestModal.tsx`)
- [ ] Migrate Waitlist Modal (`src/components/ui/WaitlistModal.tsx`)

### Phase 3: Remaining Modals

- [ ] Migrate Case Study Modal (`src/components/landing/CaseStudyModal.tsx`)
- [ ] Migrate Partner Modal (`src/components/landing/PartnerModal.tsx`)
- [ ] Migrate Job Application Modal (`src/components/careers/JobApplicationModal.tsx`)

## 🔍 Verification Queries

After migration, verify submissions are being saved:

```sql
-- Check recent submissions
SELECT modal_type, name, email, created_at
FROM modal_submissions
ORDER BY created_at DESC
LIMIT 10;

-- Count by modal type
SELECT modal_type, COUNT(*) as count
FROM modal_submissions
GROUP BY modal_type;

-- View form data for demos
SELECT
  name,
  email,
  form_data->>'preferredDate' as date,
  form_data->>'demoType' as type
FROM modal_submissions
WHERE modal_type = 'demo';
```

## 💡 Usage Example

```typescript
import { submitModalForm } from '@/lib/api/modal-submission';

async function handleFormSubmit(formData: any) {
  const result = await submitModalForm({
    modalType: 'demo', // or 'consultation', 'contact', etc.
    name: formData.name,
    email: formData.email,
    company: formData.company,
    formData: {
      // All modal-specific fields go here
      preferredDate: formData.preferredDate,
      timezone: formData.timezone,
      // ... etc
    },
  });

  if (result.success) {
    console.log('✅ Saved! ID:', result.id);
    showSuccessMessage();
  } else {
    console.error('❌ Error:', result.error);
    showErrorMessage();
  }
}
```

## 🎨 Benefits

✅ **Centralized** - One table for all modal submissions
✅ **Flexible** - JSONB field stores any modal-specific data
✅ **Tracked** - Status, priority, UTM parameters captured
✅ **Type-Safe** - Full TypeScript support
✅ **Maintainable** - Single API endpoint to manage
✅ **Scalable** - Easy to add new modal types
✅ **Analytics-Ready** - Built-in reporting views

## 📚 Documentation

- **Full System Docs:** [docs/MODAL_SUBMISSION_SYSTEM.md](./docs/MODAL_SUBMISSION_SYSTEM.md)
- **Migration Guide:** [docs/MODAL_MIGRATION_GUIDE.md](./docs/MODAL_MIGRATION_GUIDE.md)
- **Implementation Details:** [docs/IMPLEMENTATION_SUMMARY.md](./docs/IMPLEMENTATION_SUMMARY.md)

## 🆘 Need Help?

1. Check the comprehensive docs in the `/docs` folder
2. Review the example migration in `src/app/contact/page.tsx`
3. Examine the helper functions in `src/lib/api/modal-submission.ts`
4. Look at the database schema in `src/lib/database/modal-submissions-schema.sql`

---

**Ready to get started?** Run the database migration and test the contact form! 🚀
