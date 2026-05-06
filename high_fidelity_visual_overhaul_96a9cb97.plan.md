---
name: High Fidelity Visual Overhaul
overview: Create an execution-ready plan to restyle the current portfolio into a high-fidelity dark digital-impressionist glassmorphism experience like the provided reference, while keeping routes/content editable and linked.
todos:
  - id: foundation-system
    content: Implement dark painterly + glass token foundation in globals and tailwind theme
    status: pending
  - id: hero-nav-impasto
    content: Restyle nav, hero, and impasto effects for high-fidelity reference match
    status: pending
  - id: section-parity
    content: Apply visual parity to work, motion, contact, and /work/[id] route
    status: pending
  - id: standalone-html-parity
    content: Create/update root index.html to match high-fidelity visual language
    status: pending
  - id: qa-finalize
    content: Validate links, responsive behavior, accessibility contrast, lint, and production build
    status: pending
isProject: false
---

# High-Fidelity Glassmorphism Overhaul Plan

## Objective
Transform the current portfolio into a close visual match of the reference direction: dark painterly backdrop, premium glass panels, embossed/metallic hero typography, and cohesive linked sections/pages that are production-ready and immediately implementable.

## Target Outcome
- Landing page visually resembles the reference style at first glance.
- Existing app routes remain functional (`/`, `/work/[id]`) and internal links/anchors continue to work.
- Content remains editable through existing data files.
- A standalone `index.html` mirrors the same style language for direct HTML usage.

## Implementation Scope
- **In scope**
  - High-fidelity visual redesign (not just token tuning)
  - Home-page section restyling (nav, hero, project row/cards, CTA surfaces)
  - Case-study page style parity (`/work/[id]`)
  - Standalone high-fidelity `index.html`
  - Accessibility/contrast and responsive checks
- **Out of scope (this pass)**
  - New content model/schema changes
  - New CMS/backend integration
  - Rewriting project copy beyond needed microcopy polish

## File-by-File Plan
- Update global visual system in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\globals.css](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\globals.css)
  - Add dark painterly base gradients, richer glass layers, elevated blur/shadow stack, and reusable utility classes.
  - Add embossed text utilities for metallic title treatment.

- Expand theme tokens in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\tailwind.config.ts](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\tailwind.config.ts)
  - Add deep navy/purple-green palette variants and reusable shadow/background-image presets.

- Restyle floating nav in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\GlassNav.tsx](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\GlassNav.tsx)
  - Shift to top-floating capsule with stronger translucency, inner highlights, and tighter icon/text rhythm.

- Redesign hero in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\Hero.tsx](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\Hero.tsx)
  - Compose reference-like feature panel:
    - Large embossed headline treatment
    - Brush icon accent
    - Painterly blur hotspots behind title

- Upgrade paint texture layer in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\ImpastoStrokes.tsx](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\ImpastoStrokes.tsx)
  - Build more tactile 3D impasto via stacked gradients + highlight/shadow masks and subtle animated drift.

- Restyle project strip/cards in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\WorkGrid.tsx](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\WorkGrid.tsx)
  - Move toward horizontal “project tray” composition and high-blur card thumbs similar to reference.

- Align motion section styling in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\AnimationShowcase.tsx](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\AnimationShowcase.tsx)
  - Harmonize with dark glass aesthetic and preview frame treatment.

- Maintain route-level consistency in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\layout.tsx](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\layout.tsx), [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\page.tsx](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\page.tsx), and [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\work\[id]\page.tsx](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\work\[id]\page.tsx)
  - Ensure home and case-study pages share the same visual language and depth cues.

- Create standalone artifact in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\index.html](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\index.html)
  - Build single-file version (HTML/CSS/JS) with same high-fidelity style and editable content blocks.

- Keep content editing surface unchanged in [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\data\site.ts](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\data\site.ts) and [c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\data\projects.ts](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\data\projects.ts)
  - Validate no regressions to existing editable workflow.

## Execution Sequence
1. **Foundation pass**: tokens/utilities/background system.
2. **Primary visual pass**: nav + hero + impasto layers.
3. **Content module pass**: project tray + motion + contact/case-study parity.
4. **Standalone parity pass**: `index.html` mirrors final Next.js look.
5. **QA pass**: links, responsive, contrast, overflow, lint/build.

## Acceptance Criteria
- Reference-style look is clearly achieved (dark painterly + premium glass + embossed hero text).
- All primary links and anchors work on home and work pages.
- No horizontal overflow at common breakpoints.
- Text remains readable against textured backgrounds.
- `npm run lint` and `npm run build` pass.
- `index.html` opens directly and reflects the same design language.

## Risks and Mitigations
- **Risk:** Over-blur reduces legibility.
  - **Mitigation:** Use layered contrast guards and minimum text contrast checks.
- **Risk:** Heavy visual effects hurt performance on low-end devices.
  - **Mitigation:** Reduce effect density on mobile and cap animation complexity.
- **Risk:** Overfitting to reference harms brand content clarity.
  - **Mitigation:** Preserve existing information architecture and editable data sources.