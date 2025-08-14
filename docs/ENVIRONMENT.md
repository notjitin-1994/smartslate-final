Environment Configuration

Overview
This repository is a Next.js app with RBAC-protected admin APIs, Prisma, and tracking. It now uses Supabase for Postgres.

Environment variables
- DATABASE_URL — Prisma runtime connection (use Supabase pooled URL via pgBouncer)
- DIRECT_URL — Prisma migrations connection (use direct Postgres URL)
- SUPABASE_URL — Supabase project URL (e.g., https://YOUR_REF.supabase.co)
- SUPABASE_SERVICE_ROLE_KEY — Optional for server-side service actions
- SUPABASE_JWKS_URL — Optional override; otherwise auto-discovers `${SUPABASE_URL}/auth/v1/keys`
- JWT_SECRET — Optional fallback HMAC secret for local dev

Local development
1) Install dependencies: `npm install`
2) Configure `.env.local` with Supabase variables above
3) Generate/apply schema: `npx prisma migrate dev` (uses DIRECT_URL)
4) Start the dev server: `npm run dev` and open `http://localhost:3000`

Production guidance
- Configure DATABASE_URL (pooled) and DIRECT_URL (direct) from Supabase
- Apply migrations on deploy: `npx prisma migrate deploy`

