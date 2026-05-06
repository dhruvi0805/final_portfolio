---
name: Starry night UI theme
overview: "Replace the current light impasto + brush-trail aesthetic with the reference “starry night” design system: dark palette, Google fonts via `next/font`, full-page animated star canvas, dot-and-ring custom cursor (desktop only), glassmorphism cards, and section layouts aligned with the mock—while keeping Dhruvi’s copy from `site.ts` and projects from `projects.ts`, and updating inner pages for visual consistency."
todos:
  - id: tokens-fonts
    content: Add night CSS variables + dark glass utilities in globals.css; extend tailwind.config colors/fonts; swap next/font to Cormorant, DM Mono, Playfair in layout.tsx
    status: completed
  - id: starry-cursor
    content: Implement StarryBackground + CustomCursor; remove BrushCursor from layout; accessibility guards (pointer + reduced-motion)
    status: completed
  - id: nav-hero
    content: Restyle GlassNav (Motion/About anchors + Lenis); rebuild Hero with swirls, CTAs, stats card from site.ts
    status: in_progress
  - id: sections
    content: Restyle WorkGrid (featured first), AnimationShowcase (motion-card shell), new AboutSection + SiteFooter; update page.tsx order
    status: pending
  - id: data-site
    content: Extend site.ts (hero stats, about copy, skills, recognition list) with Dhruvi-specific placeholder content
    status: completed
  - id: inner-pages
    content: Align work/[id]/page.tsx and not-found.tsx with dark theme + glass cards
    status: pending
isProject: false
---

# Implement reference starry-night design system

## Current state

- Stack: [Next.js 15](package.json), Tailwind, Framer Motion, Lenis ([`src/components/providers/AppProviders.tsx`](src/components/providers/AppProviders.tsx)).
- Global look: light canvas, green-tinted glass utilities in [`src/app/globals.css`](src/app/globals.css), fonts Plus Jakarta + Instrument Serif in [`src/app/layout.tsx`](src/app/layout.tsx).
- Effects: [`BrushCursor.tsx`](src/components/BrushCursor.tsx) paints a **brush trail** on a canvas; hero uses [`ImpastoStrokes.tsx`](src/components/ImpastoStrokes.tsx).
- Home: [`Hero`](src/components/Hero.tsx), [`WorkGrid`](src/components/WorkGrid.tsx) (`#work`), [`AnimationShowcase`](src/components/AnimationShowcase.tsx) (`#motion`), [`ContactSection`](src/components/ContactSection.tsx) (`#contact`) — **no About or site footer** today.
- Case studies: [`src/app/work/[id]/page.tsx`](src/app/work/[id]/page.tsx) still uses `bg-impasto-vibrant` and light `glass-surface*` classes.

## Target (from your HTML)

- **Tokens**: `--night-black`, navy/cobalt/cerulean/gold/cream, `--glass-bg`, `--glass-border` (replace the current light `:root` glass vars or repurpose names so one theme is coherent sitewide).
- **Typography**: Cormorant Garamond (body), DM Mono (labels / nav / buttons), Playfair Display (display headings) — load with `next/font/google` in [`layout.tsx`](src/app/layout.tsx) and map Tailwind `fontFamily` in [`tailwind.config.ts`](tailwind.config.ts) (e.g. `sans` → Cormorant, `mono` → DM Mono, `display` → Playfair).
- **Background**: Fixed full-document-height **star canvas** (gradient + moon + twinkling stars + subtle ellipse “swirls”) — port the reference `<script>` logic into a client component with `resize` + `ResizeObserver` on `document.documentElement` / body height so Lenis scrolling still gets correct canvas height.
- **Cursor**: **Remove** brush trail; add **dot + lagging ring** and `ring.hovering` on interactive elements. Apply `cursor: none` only under `@media (pointer: fine)` and **disable** custom cursor when `prefers-reduced-motion: reduce` (keep system cursor for accessibility).
- **Chrome**: Fixed top nav with blur + bottom border; logo treatment (surname in gold); mono nav links with animated underline; extend scroll helpers in [`GlassNav.tsx`](src/components/GlassNav.tsx) for `#motion` and `#about` (same Lenis pattern as work/contact).
- **Sections** (content stays yours; structure follows the mock):
  - **Hero**: Label + stacked Playfair name with italic accent line + role + tagline; primary/ghost CTAs; optional **glass stats card** (values driven from new fields in [`site.ts`](src/data/site.ts) e.g. `heroStats: { value, label }[]` and `availabilityLine`). Replace `ImpastoStrokes` with lightweight **inline SVG swirls** (extract paths from the reference) in hero (and optionally contact).
  - **Work**: [`WorkGrid`](src/components/WorkGrid.tsx) — dark glass cards, `2px` grid gap aesthetic, **first project** full-width featured row with mock/visual column (simple abstract “mock lines” divs like the reference); remaining cards in two columns; reuse `project.outcome` / `project.timeline` / `project.role` for meta row where available.
  - **Motion**: Keep real [`ReelVideo`](src/components/AnimationShowcase.tsx) behavior, but wrap each item in the reference **motion-card** shell: gradient backdrop, optional decorative rings, hover **play** affordance, bottom gradient text stack (map `animationProjects` title/brief; tool label can be a static prefix or a new optional field on `AnimationProject`).
  - **About** (new): Add [`AboutSection.tsx`](src/components/AboutSection.tsx) with `id="about"`, two-column layout + skills pills + right “recognition” card — copy arrays/strings from extended [`site.ts`](src/data/site.ts) (`aboutParagraphs`, `skills`, `timelineItems` or similar). Wire into [`page.tsx`](src/app/page.tsx) between motion and contact.
  - **Contact + footer**: Restyle [`ContactSection`](src/components/ContactSection.tsx) to centered headline + glow + primary/outline buttons; add [`SiteFooter.tsx`](src/components/SiteFooter.tsx) (copyright from `site`, back-to-top via Lenis `scrollTo(0)` or `document.documentElement`).

## Styling approach

- Prefer **Tailwind + CSS variables**: define the reference `:root` block in [`globals.css`](src/app/globals.css); add `@layer utilities` or `@layer components` for repeated patterns (`glass-dark`, `btn-primary`, `section-header`, `divider`) to avoid duplicating long class strings.
- Replace old `glass-surface` usage on marketing pages with dark-glass utilities; update or remove unused light-glass rules to avoid dead theme mix.
- **Framer Motion**: Keep existing `whileInView` patterns; optional small stagger — no need to duplicate raw `IntersectionObserver` unless you want pixel-perfect parity.

## Inner routes

- [`work/[id]/page.tsx`](src/app/work/[id]/page.tsx): switch article background to night gradient / transparent over starfield, retype breadcrumb + headers + section cards to dark glass + cream text + gold/cerulean accents.
- [`not-found.tsx`](src/app/not-found.tsx): same token-based colors if it uses canvas/ink classes today.

## Files to touch (summary)

| Area | Files |
|------|--------|
| Tokens + utilities | [`globals.css`](src/app/globals.css), [`tailwind.config.ts`](tailwind.config.ts) |
| Fonts + shell | [`layout.tsx`](src/app/layout.tsx) |
| Effects | New `StarryBackground.tsx`, `CustomCursor.tsx`; remove `BrushCursor` from layout; optional `PaintSwirls.tsx` |
| Nav / sections | [`GlassNav.tsx`](src/components/GlassNav.tsx), [`Hero.tsx`](src/components/Hero.tsx), [`WorkGrid.tsx`](src/components/WorkGrid.tsx), [`AnimationShowcase.tsx`](src/components/AnimationShowcase.tsx), [`ContactSection.tsx`](src/components/ContactSection.tsx), new `AboutSection.tsx`, `SiteFooter.tsx`, [`page.tsx`](src/app/page.tsx) |
| Data | [`site.ts`](src/data/site.ts); optional small type extension in [`projects.ts`](src/data/projects.ts) for motion labels |
| Case study | [`work/[id]/page.tsx`](src/app/work/[id]/page.tsx), [`not-found.tsx`](src/app/not-found.tsx) |

## Risk / note

- Hiding the system cursor is opinionated; scoping to fine pointers + honoring reduced motion keeps the site usable on touch and for a11y-sensitive users.
