### Smartslate Technical SEO & CWV Audit

Brand: Smartslate
Site URL: https://smartslate.io
Stack detected: Next.js 15 (App Router, /src/app), TypeScript, MUI, Tailwind, Prisma
Hosting: Likely Vercel (Next.js defaults). Repo includes `middleware.ts` and App Router conventions.

## Framework + Hosting Summary
- Next.js App Router (`src/app`), Metadata API used in `src/app/layout.tsx`.
- Middleware present at `src/middleware.ts` for auth route rewrites.
- No sitemap/robots automation yet.

## Problems Found
- Titles/Meta: Default title is "Smartslate"; homepage title does not begin with “Smartslate — …”.
- Canonical: No `<link rel="canonical">` present. No host normalization (http→https, www→non-www).
- Robots/Sitemap: No `robots.txt` or `sitemap.xml` emitted.
- JSON-LD: None. Organization/WebSite schema missing.
- OG/Twitter: Present but image path `/og-image.png` not in repo; needs stable 1200×630 asset.
- Internal linking: Logo links to `/` but no brand-text anchor. H1 does not include “Smartslate”.
- Duplicates: No 301 normalization between http/https or www/non-www. Trailing slash policy not enforced.
- Images: Mixed usage; header logo uses `next/image` with `priority`. Ensure explicit sizes everywhere; verify partners/hero images for responsive attributes.
- CWV risks:
  - LCP: Hero is text-only (good). Verify any large imagery/video added later has `priority` and proper sizing.
  - CLS: Motion/animated gradients could cause shifts; ensure all media have fixed dimensions.
  - INP: Client-heavy libraries (MUI, framer-motion, Zustand) — ensure code-splitting and defer non-critical JS.
- Cache/Compression: No explicit cache headers for static assets; compression defaults OK but can be explicit.
- 404/Redirects: Standard Next behavior; host canonicalization missing.
- i18n/hreflang: Not present; not required.

## Prioritized Fixes (with acceptance criteria)
1) Brand metadata and H1
   - Set homepage title to begin with “Smartslate — <value prop>”.
   - Ensure H1 includes “Smartslate”.
   - Acceptance: View source shows `<title>` beginning with “Smartslate — …”; H1 contains “Smartslate”.

2) Sitemap + robots
   - Add `next-sitemap` and generate `sitemap.xml` and `robots.txt` at build.
   - Robots must reference `https://smartslate.io/sitemap.xml`.
   - Acceptance: `GET /sitemap.xml` and `GET /robots.txt` return valid content.

3) Canonicalization
   - Enforce https and non-www via 301 in middleware.
   - Enforce trailing-slash policy (no trailing slash except root).
   - Add canonical tag on the homepage.
   - Acceptance: Visiting `http://`, `www.`, and trailing `/` variants 301 to `https://smartslate.io` without trailing slash; `<link rel="canonical">` present on homepage.

4) OG/Twitter defaults
   - Set site-wide OG/Twitter defaults with stable OG image URL.
   - TODO: Provide 1200×630 branded OG image at `/og-image.png` (placeholder uses `/logo.png`).
   - Acceptance: Social preview renders correct title/description/image.

5) Structured Data
   - Add Organization and WebSite JSON-LD on homepage.
   - Acceptance: Valid in Google Rich Results Test.

6) Core Web Vitals
   - LCP: Keep hero text-first; prioritize any hero media; use responsive `next/image` sizes.
   - CLS: Ensure dimensions for images, avoid layout shifts, reserve space.
   - INP: Defer non-critical JS, lazy-load heavy sections, verify code-splitting.
   - Acceptance: Mobile CWV passing on homepage (LCP < 2.5s, CLS < 0.1, INP < 200ms) in PSI.

7) Tooling
   - Add Lighthouse script to produce HTML report to `./reports/lh.html`.
   - Optional CI: simple `seo:ci` task placeholder.
   - Acceptance: `npm run seo:report` produces report file.

## Evidence / Notes
- Metadata defaults located in `src/app/layout.tsx`.
- Homepage at `src/app/page.tsx` renders hero via `src/components/landing/Hero.tsx` -> `StandardHero` H1.
- No `next-sitemap` config present; no generated robots/sitemap in `public/`.
- Middleware at `src/middleware.ts` only handles auth path rewrites; will be extended for host normalization.

## TODOs / Content Gaps
- Provide a proper OG image at 1200×630 (add to `public/og-image.png`).
- Review all major pages for page-level canonical tags as needed (home first).
- Validate image alt text coverage and responsive sizes in marketing sections (e.g., `Partners`).


