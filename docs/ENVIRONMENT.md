Environment Configuration

Overview
This repository is a Next.js app with RBAC-protected admin APIs, Prisma, and tracking. It now uses Supabase for Postgres.

Environment variables
- DATABASE_URL — runtime connection (use Supabase pooled URL via pgBouncer)
- DIRECT_URL — migrations connection (use direct Postgres URL)
- SUPABASE_URL — Supabase project URL (e.g., https://YOUR_REF.supabase.co)
- SUPABASE_ANON_KEY — public anon key used by server-side client
- NEXT_PUBLIC_SUPABASE_URL — public URL used by browser client
- NEXT_PUBLIC_SUPABASE_ANON_KEY — public anon key used by browser client
- SUPABASE_SERVICE_ROLE_KEY — Optional for server-side service actions (required for profile avatar uploads and name mirroring)
- SUPABASE_JWKS_URL — Optional override; otherwise auto-discovers `${SUPABASE_URL}/auth/v1/keys`
- JWT_SECRET — Optional fallback HMAC secret for local dev

Storage
- Avatar uploads use the `avatars` storage bucket (public). The bucket is auto-created by the server upload route if missing.

Local development
1) Install dependencies: `npm install`
2) Configure `.env.local` with Supabase variables above
3) Run DB setup scripts if needed: `npm run migrate:user-profiles` (creates `app.user_profiles`)
4) Start the dev server: `npm run dev` and open `http://localhost:3000`

Production guidance
- Configure DATABASE_URL (pooled) and DIRECT_URL (direct) from Supabase
- Apply SQL migrations (e.g., `scripts/create_user_profiles.sql`) during deploy

