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

## Environment
Set the following in `.env.local` (or your host’s env). See `docs/ENVIRONMENT.md` for details.

```
# Supabase
SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
# Optional explicit JWKS URL (otherwise auto-discovered):
# SUPABASE_JWKS_URL="https://YOUR_PROJECT_REF.supabase.co/auth/v1/keys"

# Prisma (Supabase Postgres)
# Pooled (runtime):
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
# Direct (migrations):
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"

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
2) Configure `.env.local` (see above) and ensure PostgreSQL is reachable
3) Apply database schema
```
npx prisma migrate dev
# or, to apply existing migrations only
npx prisma migrate deploy
```
4) Start the dev server
```
npm run dev
# http://localhost:3000
```

Prisma client is generated automatically during `npm run build`, but during development you may run:
```
npx prisma generate
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
- Build: `npm run build` (runs `prisma generate` then Next.js build)
- Start: `npm start`
- Ensure env vars and database are configured in your host. Run `npx prisma migrate deploy` on first deploy.

## Documentation
- `docs/ENVIRONMENT.md` for env details
- `docs/COMPONENT_LIBRARY.md` UI patterns
- `docs/GET_STARTED_MODAL.md` auth modal behavior
- `docs/STYLING_GUIDE.md` design system

## Security
- Do not commit secrets. Use environment variables managed by your hosting provider.
