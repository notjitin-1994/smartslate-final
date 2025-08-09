Environment Configuration

Overview
This repository is a Next.js app with optional Neon Auth integration, RBAC-protected admin APIs, Prisma, and tracking.

Environment variables
- DATABASE_URL — PostgreSQL connection string for Prisma
- Stack (Neon Auth) client SDK per docs: https://neon.com/docs/neon-auth/quick-start/nextjs
  - NEXT_PUBLIC_STACK_PROJECT_ID
  - NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
  - STACK_SECRET_SERVER_KEY
- Token verification for RBAC-protected routes (choose one)
  - NEON_AUTH_JWKS_URL — JWKS endpoint used to verify Bearer JWTs
  - NEON_AUTH_JWT_SECRET — HMAC secret for HS256 verification (fallback)
  - JWT_SECRET — optional fallback env var
- Optional: Neon Console Admin API (for programmatic user creation)
  - NEON_API_KEY
  - NEON_PROJECT_ID
- Optional: Generic Stack Admin endpoint fallback
  - NEON_AUTH_CREATE_USER_URL
  - NEON_AUTH_API_KEY

Local development
1) Install dependencies: `npm install`
2) Configure `.env.local` with the variables above
3) Apply database schema: `npx prisma migrate dev`
4) Start the dev server: `npm run dev` and open `http://localhost:3000`

Production guidance
- Configure env vars and database on your hosting provider
- Apply migrations on deploy: `npx prisma migrate deploy`

