## LMS Phase 1

- Backend removed (prepping for AWS). Prisma models and REST endpoints have been removed.

Setup
- Create `.env` for AWS Cognito and AWS database when ready. No local backend steps required yet.

# SmartSlate

Modern Next.js application with full-stack capabilities: authentication, RBAC, lead capture, analytics tracking, and admin APIs.

### Features
- Next.js 15 (App Router), React 19, Tailwind 4, MUI 7, Zustand
- Prepared for AWS (Cognito/Auth and AWS-managed DB). Old Prisma/Neon removed.
- Role-based access control (RBAC) with config-driven permissions
- Lead capture APIs (Course waitlist, Solara, SSA, Case studies, Partner)
- Anonymous analytics tracking (identify + pageview/interaction events)
- Admin APIs for courses, leads, metrics, and system role seeding

### Tech stack
- **Framework**: Next.js 15 (app directory)
- **UI**: Tailwind CSS 4, Material UI 7, Framer Motion
- **State**: Zustand
- **Data**: Supabase Postgres + Prisma
 
## Status
This repo has migrated from a local Prisma/Neon backend to Supabase-managed Postgres and Supabase Auth. Some Prisma packages remain in dev dependencies but schema migrations are now performed via SQL scripts under `scripts/` and lightweight `pg` connections in `src/lib/db.ts`.

## Environment
Set the following in `.env.local` (or your host’s env). See `docs/ENVIRONMENT.md` for details.

```
# Supabase
SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
# Optional explicit JWKS URL (otherwise auto-discovered):
# SUPABASE_JWKS_URL="https://YOUR_PROJECT_REF.supabase.co/auth/v1/keys"

# Database (Supabase Postgres)
# Pooled (runtime):
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"

# Optional HMAC secret for local dev
# JWT_SECRET=replace-with-strong-secret
```

Notes:
- Admin API usage and RBAC-protected routes expect a Bearer token. Verification uses Supabase JWKS (auto) or `SUPABASE_JWT_SECRET`/`JWT_SECRET` fallback.

## Local development
1) Install deps
```
npm install
```
2) Configure `.env.local` (see above) and ensure Supabase Postgres is reachable
3) Apply database schema (run SQL migrations)
```
# Example: create core tables (run individual scripts as needed)
npx tsx scripts/migrate-user-profiles-table.ts
npx tsx scripts/migrate-ssa-table.ts
npx tsx scripts/migrate-solara-table.ts
npx tsx scripts/migrate-demo-table.ts
npx tsx scripts/migrate-consultation-table.ts
```
4) Start the dev server
```
npm run dev
# http://localhost:3000
```
Optional utilities:
```
# Diagnose JWKS config
npm run diag:jwks
```

## API overview
**Auth**
- POST `/api/auth/signup` → Upserts user in local DB; optionally provisions in Neon Auth if configured

**RBAC and guards**
- `src/config/rbac.ts` defines roles/permissions
- Protected handlers use `withPermission`/`withAuth` from `src/middleware/rbac.ts`
- Bearer JWT is verified in `src/lib/auth.ts`

**Admin APIs** (Bearer token required; permissions indicated)
- POST `/api/admin/courses` → create/update course (`course:create`)
- PATCH `/api/admin/courses` → publish/unpublish (`course:publish`)
- DELETE `/api/admin/courses?slug=…` → delete (`course:delete`)
- GET `/api/admin/leads` → latest leads (`lead:read`)
- GET `/api/admin/metrics` → counts (`metrics:read`)
- POST `/api/admin/system` → seed/sync roles (`settings:write`)

**Leads** (public endpoints)
- POST `/api/leads/course-waitlist`
- POST `/api/leads/solara`
- POST `/api/leads/ssa`
- POST `/api/leads/case-study`
- POST `/api/leads/partner`

**Tracking** (anonymous)
- POST `/api/track/identify` → ensures anon cookie and record
- POST `/api/track/event` → `type: 'pageview' | 'interaction'` with payload

### Example: calling an admin route
Provide a Bearer token that your verifier accepts (JWKS or HMAC secret), e.g.:

```bash
curl -X POST \
  -H "Authorization: Bearer <your-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"slug":"ai-foundations","title":"AI Foundations","description":"…"}' \
  http://localhost:3000/api/admin/courses
```

## Deployment
- Build: `npm run build`
- Start: `npm start`
- Ensure env vars and database are configured in your host. Run the SQL migration scripts on first deploy.

## Documentation
- `docs/ENVIRONMENT.md` for env details
- `docs/COMPONENT_LIBRARY.md` UI patterns
- `docs/GET_STARTED_MODAL.md` auth modal behavior
- `docs/STYLING_GUIDE.md` design system
- `docs/api.http` manual API request examples
- `docs/API.md` overview of API endpoints and payloads (generated/maintained)

## Documentation Automation
Typed API + code documentation can be generated with [TypeDoc].

Scripts:
```
# Generate API docs to docs/api/
npm run docs:build

# Preview generated docs locally (optional)
npm run docs:serve
```

CI (optional): A GitHub Actions workflow in `.github/workflows/docs.yml` builds and publishes docs to GitHub Pages on pushes to `main`. Configure Pages in your repo settings.

## Security
- Do not commit secrets. Use environment variables managed by your hosting provider.
