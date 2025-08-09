Environment Configuration

Overview
This repository is a Next.js app with optional integrations.

Environment variables
- DATABASE_URL=postgres connection string (Prisma)
- Neon Auth (Next.js) per docs: https://neon.com/docs/neon-auth/quick-start/nextjs
  - NEXT_PUBLIC_STACK_PROJECT_ID
  - NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
  - STACK_SECRET_SERVER_KEY
  - (Optional) NEON_AUTH_JWKS_URL if you use JWT verify elsewhere

Local development
1) Install dependencies: `npm install`
2) Start the dev server: `npm run dev`
3) Open `http://localhost:3000`

Production guidance
- Configure your hosting provider per Next.js docs.
- If you later introduce a backend, document variables in a new file.

Notes
- `docs/env.example` is kept minimal as no variables are needed.

