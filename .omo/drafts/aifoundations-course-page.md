# Draft: aifoundations-course-page

## Meta
- **intent**: CLEAR
- **review_required**: false
- **classify**: Standard (1 new page + 1 page edit, clear feature, established patterns)
- **created**: 2026-07-25

## Request
Revamp `/courses` to show only the "AI Foundations: Concept2Application" card, and create a new
`/courses/aifoundations-concept2application` detail page based on the AIFoundations project data.

## Data source (resolved)
- The "aifoundations code and folder" = `/home/jitin/AIFoundations/` (sibling Next.js project, the
  actual learning platform). NOT inside smartslate-final.
- Authoritative content: `/home/jitin/AIFoundations/AI-Foundations-Concept2Application-Blueprint.md`
  (632-line design doc). Also present: `AIFoundations_reference/`, `AIFoundations-Video/`.
- Course = "AI Foundations: Concept to Application". 15-16 hrs, 8 modules (0-7), non-technical adult
  learners, no-code, custom web app + xAPI. Running project spine (12 templates / 4 pillars). Pedagogy:
  Bloom's + Spiral (Bruner) + ADDIE. Capstone rubric (4 dims). Build status: Modules 0-1 shipped, 2-7 not.

## Grounding facts (cited)
- Current courses page: `src/app/courses/page.tsx` — ALREADY renders ONE card (id `ai-foundations`)
  with "Coming Soon" badge and NO link. Card data is a PLACEHOLDER and technically inaccurate
  (mentions Python/TensorFlow/PyTorch, NLP/CV — the real course is explicitly no-code/non-technical).
- Sibling detail-page pattern: `src/app/ignite/page.tsx` (1043 LOC), `src/app/strategic-skills-architecture/page.tsx`
  (1295+ LOC) — single-file, 'use client', framer-motion + MUI styled components, sections: Hero
  (SectionChip + GradientHeadline) → Problem → Solution/Pillars → UseCases/Programs → Process →
  Advantages → CTA. Hardcoded data arrays. Accessibility (tabIndex/role/aria-label/focus-visible,
  prefers-reduced-motion). CTA buttons → `/contact` via next/link.
- Reusable hero: `src/components/ui/StandardHero.tsx` (Tailwind, used by /about,/contact,...) — different
  stack from the course/product detail pages (MUI). Detail pages use custom MUI hero.
- WaitlistButton (`src/components/ui/WaitlistButton.tsx`): Tailwind Link to `/contact`; `courseName`/
  `source` props currently unused. Waitlist API exists: `src/app/api/leads/waitlist/route.ts`.
- Header (`src/components/layout/Header.tsx:166`): navItems = Products/Pricing/Vision. `/courses` NOT in nav.
- No tests in `src/`. QA = tsc type-check + next build + visual.

## Topology (components ledger)
- **C1 — courses landing card**: update `src/app/courses/page.tsx` card data to match real blueprint;
  make card clickable → `/courses/aifoundations-concept2application`; keep/refresh "Coming Soon" badge.
- **C2 — course detail page**: new `src/app/courses/aifoundations-concept2application/page.tsx`,
  multi-section MUI marketing page mirroring /ignite & /strategic-skills-architecture, populated from
  the blueprint (8 modules, 4 pillars/12 projects, pedagogy, assessment, CTA).

## Decisions adopted (defaults)
- D1 Hero/stack: custom MUI styled components (match sibling course pages /ignite & /ssa), NOT StandardHero.
- D2 Content depth: comprehensive multi-section marketing page (match established pattern), not minimal.
- D3 Card data fix: update placeholder features to reflect the real no-code, non-technical course.
- D4 Scope OUT: do NOT modify the AIFoundations learning app; do NOT change Header nav (tight scope).
- D5 Visuals: smartslate design system + existing `public/images/courses/*`; optionally reference
  `AIFoundations/public/neural_network_nodes.jpg` only if copying into smartslate `public/`.
- D6 Test strategy: none (repo has no tests); agent QA = `npm run type-check` + `npm run build` + visual.

## Open forks — RESOLVED by user (2026-07-25)
- F1 CTA framing → **"Get Started / Enroll"** (launch-style, links to /contact, matching /ignite & /ssa).
- F2 Card badge → **Remove "Coming Soon" badge**; card reads as a live course.

## Gate
- **status**: APPROVED 2026-07-25
- **pending action**: write `.omo/plans/aifoundations-course-page.md` + run Metis, then present summary.
- **approach**: C1 edit + C2 new file, MUI multi-section page from blueprint; launch CTAs; no badge.

## Metis review receipt (ses_065ec7083ffereZAzTn765sj8i, 2m43s)
- VERDICT: needs rework (intent sound; acceptance + constraints must be pinned).
- 2 BLOCKERS folded in: B1 acceptance must be agent-executable; B2 clickability pinned (component={Link},
  drop role=article, focus-visible, Enter-to-activate).
- 7 MAJOR folded in: M1 Next15+MUIv7 Grid v2 size={{}}; M2 layout.tsx metadata; M3 IN/OUT content boundary;
  M4 icon-only (no images); M5 hardcoded no fs reads; M6 full-curriculum framing (pre-launch); M7 rewrite ALL card fields.
- 6 MINOR folded in: m1 per-file styled comps (SSA set); m2 slug literal href; m3 CTA "Get Started" not "Enroll";
  m4 typo; m5 single-file parity+TOC; m6 StandardHero confirmed exists, custom MUI correct.
- 11 acceptance gates embedded in todos + final wave.

## Status
- **status**: APPROVED FOR EXECUTION — user chose "Start work now".
- Plan: `.omo/plans/aifoundations-course-page.md` (2 parallel todos + final wave). Metis-hardened.
- Handoff: invoke `/start-work` against the plan to begin execution.
