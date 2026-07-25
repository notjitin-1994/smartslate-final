# aifoundations-course-page - Work Plan

## TL;DR (For humans)

**What you'll get.** A revamped `/courses` page whose single card now accurately describes the real "AI Foundations: Concept to Application" course and links to a brand-new, comprehensive course detail page at `/courses/aifoundations-concept2application` — an 8-section MUI marketing page built from the AIFoundations blueprint, styled to match the existing `/ignite` and `/strategic-skills-architecture` pages.

**Why this approach.** The current card is a placeholder with factually wrong copy (it advertises Python/TensorFlow/PyTorch and "12 weeks" — the real course is no-code, 15–16 hours). The course's real content lives in the sibling `AIFoundations/` project's blueprint doc. Mirroring the two existing course/product detail pages keeps the design system consistent and ships in one pass.

**What it will NOT do.** It will not modify the AIFoundations learning platform itself, add `/courses` to the header nav, add Python/code-lab imagery, surface internal pedagogy theory (Bloom's/Spiral/ADDIE/xAPI/rubric scoring) on the marketing page, read the blueprint at runtime, or add new npm dependencies.

**Effort.** ~2 cohesive todos: (1) card revamp (1 file), (2) new detail page + metadata layout (2 files). Single developer pass.

**Risk.** Low–medium. Patterns are established and verified against source. Main risks are (a) keeping the marketing copy honest while the course is still partially built (handled by marketing the full target curriculum, standard pre-launch practice), and (b) getting the clickable-card accessibility right (pinned in the plan).

**Decisions (user-approved + best-practice defaults).** Launch-style CTAs ("Get Started" → `/contact`); remove the "Coming Soon" badge; custom MUI hero (matches siblings); icon-only visuals (no images, parity with siblings); Next.js 15 + MUI v7 Grid v2; route slug `aifoundations-concept2application` (user-mandated literal href); full-curriculum framing (pre-launch).

---

## Scope

### IN
- **`src/app/courses/page.tsx`** — rewrite the inline `course` object so every field matches the real course; make the card a clickable link to the new detail route with correct accessibility; remove the `ComingSoonBadge` (definition + usage).
- **`src/app/courses/aifoundations-concept2application/page.tsx`** (NEW) — a single-file `'use client'`, MUI v7 + framer-motion, 8-section marketing page populated from the blueprint, styled to match `/strategic-skills-architecture` and `/ignite`.
- **`src/app/courses/aifoundations-concept2application/layout.tsx`** (NEW) — a server component exporting Next.js `metadata` (title, description, openGraph) for SEO (a `'use client'` page cannot export metadata itself).
- Agent-executable verification (type-check, build, route 200, click-navigation via Playwright, content grep assertions, a11y smoke).

### OUT (must-not)
- Do NOT touch anything under `/home/jitin/AIFoundations/` (the learning platform is read-only reference).
- Do NOT add `/courses` to `src/components/layout/Header.tsx` nav (out of scope).
- Do NOT add images / `<img>` / `next/image` to either page (siblings are icon-driven; parity).
- Do NOT surface internal pedagogy on the marketing page: no Bloom's Taxonomy, Bruner spiral, ADDIE, xAPI architecture, assessment question bank, or capstone rubric scoring detail.
- Do NOT read the blueprint at runtime — no `fs`/`readFileSync`, no path outside `src/`. Adapt and hardcode all copy.
- Do NOT add npm dependencies (all required libs already present).
- Do NOT use MUI v5/v6 Grid syntax (`item`/`container`/`xs={}` props) — use v7 Grid v2 `size={{}}`.

---

## Verification strategy

No unit-test framework exists in the repo (`package.json` has no `test` script). QA is agent-executable, zero-human-intervention, combining static gates + behavioral checks:

1. **Static**: `npm run type-check` (tsc --noEmit) exit 0; `npm run build` (next build) exit 0; `npm run lint` exit 0.
2. **Route serves**: `curl` the new route → HTTP 200.
3. **Click-navigation** (Playwright, headless): load `/courses`, click the card anchor, assert URL + visible h1; screenshot to `reports/`.
4. **Content grep assertions**: wrong copy purged, correct facts present, scope-boundary respected, no external fs reads.
5. **Accessibility smoke**: Playwright axe pass on the new route → 0 critical/serious; keyboard-focusable card with Enter-to-activate.

(Full concrete commands in each todo's Acceptance + QA and in the Final verification wave.)

---

## Execution strategy

- **Wave 1 (parallel)** — Todo 1 (card revamp) and Todo 2 (new page + layout) edit disjoint files and have no shared mutable state; they run concurrently.
- **Wave 2** — Final verification wave (F1–F4) runs after both todos; all must APPROVE.
- **Data handling**: all course content is read from the blueprint *during implementation* and hardcoded into the page. The blueprint path (`/home/jitin/AIFoundations/AI-Foundations-Concept2Application-Blueprint.md`) is a reference, never an import.
- **Styling**: copy the styled-component set and section rhythm from `src/app/strategic-skills-architecture/page.tsx` (the structural model): `PageWrapper`, `HeroSection`, `SectionWrapper`, `GlassCard`, `PillarCard`, `FeatureCard`, `GradientHeadline`, `SectionChip`, `AccentText`. These are defined locally per-file (the repo norm — there is no shared `components/ui` module for them).
- **Single-file parity**: the new page is intentionally one ~800–1100 LOC file, matching the siblings (`ignite` ~1043 LOC, `strategic-skills-architecture` ~1300 LOC). A section TOC + divider comments at the top are required for navigability.
- **TDD**: N/A (no test framework). Acceptance is behavioral + static, as above.

---

## Todos

### Todo 1 — Revamp the /courses card (accurate data + clickable + no badge) — ✅ COMPLETE [x]
**File:** `src/app/courses/page.tsx` (edit only).

**What to change (exhaustive):**
1. **Rewrite the `course` object (lines ~395–413)** so EVERY field reflects the real course. Target values:
   - `id`: keep `'ai-foundations'` (unrelated to routing).
   - `title`: `'AI Foundations: Concept to Application'`.
   - `subtitle`: a no-code, non-technical positioning line, e.g. `'From AI awareness to confident application — no coding required.'`
   - `description`: 1–2 sentences on a 15–16 hour, no-code course for non-technical professionals that carries a single chosen project through 8 modules. Do NOT mention Python/TensorFlow/PyTorch/NLP/computer vision/deploying models.
   - `status`: REMOVE this field and all references (badge is gone).
   - `features`: replace all 5 strings with real differentiators — e.g. "8-module journey from what AI is to building multi-step AI workflows", "Metaphor-driven curriculum that makes technical ideas intuitive", "A running project you choose and evolve across every module (12 templates, 4 pillars)", "Built for non-technical professionals — no programming required", "Practical lab checkpoints and a capstone project".
   - `meta.duration`: `'15–16 hours'` (NOT `12 weeks`).
   - `meta.level`: `'Beginner-friendly · No coding required'` (NOT `Beginner to Intermediate`).
   - `meta.projects`: `'12 project templates'` (NOT `5+ hands-on projects`).
2. **Make the card a clickable link.** Render `CourseCard` with `component={Link}` and `href="/courses/aifoundations-concept2application"` (literal string — do NOT derive from `course.id`). Remove `role="article"` from the card (an anchor has an implicit link role). Add a descriptive `aria-label={course.title}` and a visible "View course" affordance (e.g. a `Button` or text + `ArrowForward` icon inside the card). Reconcile the existing `whileHover={{ scale: 1.01 }}` so it does not fight the new click target (keep the motion on the link itself).
3. **Remove the Coming Soon badge.** Delete the `ComingSoonBadge` styled-component definition (lines ~189–199) AND its usage (`<ComingSoonBadge ... />`).
4. **Add `:focus-visible`** ring styling to the card so keyboard users see the focus.
5. **Imports**: add `Link from 'next/link'` (and `ArrowForward` from `@mui/icons-material` if used). Remove now-unused imports.

**Acceptance (agent-executable):**
- `grep -c 'href="/courses/aifoundations-concept2application"' src/app/courses/page.tsx` → ≥ 1.
- `grep -cE 'Coming Soon|ComingSoonBadge' src/app/courses/page.tsx` → 0.
- `grep -cE 'Python|TensorFlow|PyTorch|NLP|computer vision|12 weeks|5\+ hands-on|deploy AI|neural networks' src/app/courses/page.tsx` → 0.
- `grep -cE '15.16 hours|15–16 hours' src/app/courses/page.tsx` → ≥ 1; `grep -c '12 project templates' src/app/courses/page.tsx` → ≥ 1.
- `grep -c "role=\"article\"" src/app/courses/page.tsx` → 0 (on the card; if any other `role="article"` remains it must not be the card).
- `npm run type-check` exit 0.

**Happy QA:** Playwright — load `/courses`; the card is an `<a href="/courses/aifoundations-concept2application">`; `await page.click(...)` navigates and `page.url()` ends with the route; screenshot `reports/courses-card.png`.
**Failure QA:** `grep -nE 'Python|TensorFlow|12 weeks|Coming Soon' src/app/courses/page.tsx` must print nothing (empty → pass). If the click target is not an anchor (e.g. a `div` with `onClick`), FAIL.

**Commit:** `revamp(courses): accurate AI Foundations card linking to detail page`

---

### Todo 2 — Create the course detail page + metadata layout — ✅ COMPLETE [x]
**Files (new, same route folder):**
- `src/app/courses/aifoundations-concept2application/page.tsx` (NEW)
- `src/app/courses/aifoundations-concept2application/layout.tsx` (NEW)

**Reference docs (read-only, during implementation):**
- `/home/jitin/AIFoundations/AI-Foundations-Concept2Application-Blueprint.md` (the content source — §3.1 course params, §3.2 module table, §3.3 project pillars, §1/§2 positioning & audience).

**Structural model (copy rhythm + styled comps from here):**
- `src/app/strategic-skills-architecture/page.tsx` (primary model — has Hero→Problem→Pillars→UseCases→Process→Advantages→CTA, `PillarCard`, `FeatureCard`, `GlassCard`, `GradientHeadline`, `SectionChip`, `AccentText`).
- `src/app/ignite/page.tsx` (secondary — `ProgramCard`, `StatsCard`, program-grid pattern).

**Page spec — `page.tsx`** (`'use client'`, single file, MUI v7 + framer-motion + `useInView`):
- **Top of file**: section TOC comment block + `// SECTION:` dividers between each section.
- **Section 1 — Hero**: `SectionChip` ("AI Foundations"), `GradientHeadline` ("Concept to Application"), subtitle (15–16 hrs, no-code, for non-technical professionals), two CTA buttons (`component={Link} href="/contact"`): primary "Get Started" + secondary "Explore the Curriculum".
- **Section 2 — Course at a glance**: a stats row (`StatsCard` pattern) — 8 modules, 15–16 hours, 12 project templates, 0 lines of code required.
- **Section 3 — The 8-module journey**: a grid/timeline of 8 `FeatureCard`s, one per module, each showing the metaphor name + one-line outcome (Orientation; The Intelligence Illusion; The Goldfish Problem; The Toolbelt; The Engine Room; The Assembly Line; The Local Sandbox; The Horizon). Icon-only via `@mui/icons-material`.
- **Section 4 — Choose your running project (4 pillars)**: 4 `PillarCard`s — Intelligent Web Interfaces, AI-Integrated Apps, Content Pipelines, The Writing Engine — each listing its 3 project templates as checkmark bullets.
- **Section 5 — How you learn (approach, NOT theory)**: 3 `GlassCard`s framing the *benefits* — metaphor-driven naming, the running project spine, no-code/low-code labs. Do NOT name Bloom's/Bruner/ADDIE/xAPI.
- **Section 6 — What you walk away with (outcomes)**: outcome bullets in an `OutcomesBox`-style band — confidently prompt, evaluate, and orchestrate AI tools; a completed capstone project; a personal AI resource strategy.
- **Section 7 — Who it's for**: 2–3 `GlassCard`s for the audience (non-technical professionals: marketing, ops, consulting, design, finance, HR, PM).
- **Section 8 — Final CTA**: headline + "Get Started" button → `/contact`.
- **Accessibility (mandatory parity with siblings)**: every interactive card `tabIndex={0}`, `role="article"`, descriptive `aria-label`; `:focus-visible` outline rings; `@media (prefers-reduced-motion: reduce)` blocks on every motion-styled component.
- **No images**: zero `<img>`/`next/image`. Icons from `@mui/icons-material` only.
- **Grid API**: MUI v7 Grid v2 — `<Grid size={{ xs: 12, md: 4 }}>` syntax only. Never `item`/`container`/`xs={}`.

**Layout spec — `layout.tsx`** (server component, NO `'use client'`):
```ts
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'AI Foundations: Concept to Application | Smartslate',
  description: 'A 15–16 hour, no-code course that takes non-technical professionals from AI awareness to confident application — across 8 modules with a running project you choose.',
  openGraph: { title: '...', description: '...', url: '.../courses/aifoundations-concept2application', siteName: 'Smartslate', type: 'website' },
  alternates: { canonical: '/courses/aifoundations-concept2application' },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
```

**Acceptance (agent-executable):**
- `npm run type-check` exit 0; `npm run build` exit 0.
- `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/courses/aifoundations-concept2application` → `200`.
- `grep -cE 'prefers-reduced-motion|focus-visible|aria-label|role="article"|href="/contact"' src/app/courses/aifoundations-concept2application/page.tsx` → each token ≥ 1.
- `grep -cE 'SectionChip|GradientHeadline|PillarCard|FeatureCard|GlassCard' src/app/courses/aifoundations-concept2application/page.tsx` → each ≥ 1.
- `grep -cE 'xAPI|Bloom|Bruner|ADDIE|rubric|Learning Record Store' src/app/courses/aifoundations-concept2application/page.tsx` → 0 (scope boundary).
- `grep -cE 'fs\b|readFileSync|/home/jitin/AIFoundations|next/image|<img' src/app/courses/aifoundations-concept2application/page.tsx` → 0.
- `grep -c 'export const metadata' src/app/courses/aifoundations-concept2application/layout.tsx` → ≥ 1.
- `grep -cE "size=\\{\\{" src/app/courses/aifoundations-concept2application/page.tsx` → ≥ 1 (MUI v7 Grid); `grep -cE '<Grid[^>]*(item|container)' ...` → 0 (no v5 syntax).

**Happy QA:** Playwright — GET the route → 200; `await expect(page.locator('h1')).toBeVisible()`; assert text contains "Concept to Application", "8" modules, "4" pillars; screenshot `reports/aif-detail.png`.
**Failure QA:** axe-core pass on the route → 0 critical/serious violations. `grep` for forbidden tokens (xAPI/Bloom/fs/`<img`) must be empty.

**Commit:** `feat(courses): add AI Foundations Concept2Application detail page`

---

## Final verification wave

Runs in parallel after Todos 1 & 2 complete. ALL must APPROVE; surface results and wait for the user's explicit okay before declaring complete.

- **F1 — Plan-compliance audit**: every acceptance grep/command in both todos ran green and is pasted with its actual output; no todo field left unaddressed; route slug matches the card `href` exactly (`aifoundations-concept2application`).
- **F2 — Code quality review**: MUI v7 Grid v2 syntax used throughout; no `<img>`; styled comps defined locally (no shared-module assumption); `prefers-reduced-motion` + `focus-visible` on every motion component; no dead imports; single-file has the section TOC.
- **F3 — Real manual QA (agent-run)**: `npm run build` then `npm run start`; Playwright script loads `/courses`, clicks the card, lands on the detail route (200, h1 visible), screenshots both pages into `reports/`; axe pass clean; keyboard `Tab` reaches the card and `Enter` navigates.
- **F4 — Scope fidelity**: confirm nothing under `/home/jitin/AIFoundations/` changed; `/courses` header nav unchanged; no new entries in `package.json`; no runtime file reads outside `src/`; no internal pedagogy (Bloom's/xAPI/rubric) leaked onto the marketing page.

---

## Commit strategy

Two atomic commits, one per todo (they touch disjoint files):
1. `revamp(courses): accurate AI Foundations card linking to detail page`
2. `feat(courses): add AI Foundations Concept2Application detail page`

(If executed in one branch, either order is fine since the files are disjoint. The card link and the route are created together within the same wave, so no 404 window in normal sequential review.)

---

## Success criteria

- `/courses` shows exactly one card whose copy is factually accurate to the real course (no Python/12-weeks/5+-projects), with no "Coming Soon" badge, and the card is a keyboard-accessible link.
- `/courses/aifoundations-concept2application` renders a polished, 8-section MUI marketing page visually consistent with `/ignite` and `/strategic-skills-architecture`, populated from the blueprint, with proper SEO metadata, full a11y parity, and zero runtime dependencies on the sibling project.
- `npm run type-check`, `npm run build`, and `npm run lint` all exit 0; the new route returns 200; clicking the card navigates to it; an axe pass reports no critical/serious issues.
