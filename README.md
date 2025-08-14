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
- **Data**: AWS-managed DB (to be integrated)

## Environment
Set the following in `.env.local` (or your host’s env). See `docs/ENVIRONMENT.md` for details.

```
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Stack (Neon Auth) client SDK
NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_stack_publishable_key
STACK_SECRET_SERVER_KEY=your_stack_server_secret

# Auth token verification (choose one)
# Use JWKS endpoint (recommended when using Neon Auth hosted):
NEON_AUTH_JWKS_URL=https://…/.well-known/jwks.json
# OR use an HMAC secret for local/testing:
# NEON_AUTH_JWT_SECRET=replace-with-strong-secret
# (You may also use JWT_SECRET as a fallback env var.)

# Optional: Neon Console Admin API (for programmatic user creation)
NEON_API_KEY=your_neon_console_api_key
NEON_PROJECT_ID=your_neon_project_id

# Optional: Generic Stack Admin endpoint fallback
# NEON_AUTH_CREATE_USER_URL=https://your-endpoint
# NEON_AUTH_API_KEY=your-bearer-token
```

Notes:
- Admin API usage and RBAC-protected routes expect a Bearer token. Verification uses `NEON_AUTH_JWKS_URL` or `NEON_AUTH_JWT_SECRET`.
- Programmatic user provisioning via Neon Console Admin API requires `NEON_API_KEY` and `NEON_PROJECT_ID`.

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
