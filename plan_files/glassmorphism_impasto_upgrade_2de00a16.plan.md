---
name: Glassmorphism Impasto Upgrade
overview: Upgrade the existing Next.js portfolio to a more minimal Apple-inspired glass style with richer 3D/vibrant impasto strokes, and add a standalone editable `index.html` artifact that mirrors the visual direction.
todos:
  - id: tokens-and-glass
    content: Refine global style tokens and reusable glass utilities for minimal Apple-like surfaces
    status: pending
  - id: impasto-3d-refresh
    content: Upgrade impasto stroke renderer to layered vibrant 3D look with responsive/performance-safe fallback
    status: pending
  - id: ui-consistency
    content: Apply updated glass/spacing/motion treatment across hero, nav, grid, motion, and case-study routes
    status: pending
  - id: standalone-html
    content: Create root index.html with semantic editable sections and matching glass + impasto visual system
    status: pending
  - id: qa-verify
    content: Run lint/build and verify links, anchors, readability, and overflow behavior
    status: pending
isProject: false
---

# Glassmorphism + Impasto Implementation Plan

## Scope
- Refresh the existing Next.js portfolio UI for stronger minimal glassmorphism and more dimensional, vibrant impasto strokes.
- Add a standalone editable `index.html` in project root (chosen since you said no preference) that reproduces the same visual language.

## What I Will Change
- **Design token refinement** in [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\globals.css`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\globals.css) and [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\tailwind.config.ts`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\tailwind.config.ts)
  - Add a clearer glass token set: stronger backdrop blur, subtle inner highlight, soft border, layered shadow values.
  - Tune contrast to preserve AA readability against textured/painted backgrounds.
  - Add reusable utility classes for glass cards/nav/buttons to keep pages consistent and editable.

- **Navigation and section surface polish** in [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\GlassNav.tsx`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\GlassNav.tsx), [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\Hero.tsx`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\Hero.tsx), [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\WorkGrid.tsx`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\WorkGrid.tsx), and [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\AnimationShowcase.tsx`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\AnimationShowcase.tsx)
  - Make the top bar feel more “Apple minimal”: cleaner spacing, softer translucency, controlled elevation.
  - Apply consistent glass surface treatment across cards/panels with restrained motion and no layout-shifting hover effects.

- **3D vibrant impasto stroke upgrade** in [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\ImpastoStrokes.tsx`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\components\ImpastoStrokes.tsx)
  - Replace current flat fills with layered gradients and highlight/shadow passes to simulate paint thickness.
  - Add depth cues: overlapping stroke blobs, rim light, and soft multiply/overlay blending.
  - Keep responsive fallback on mobile (reduced stroke density/opacity) for readability and performance.

- **Route-level consistency check** in [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\page.tsx`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\page.tsx), [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\work\[id]\page.tsx`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\work\[id]\page.tsx), and [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\layout.tsx`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\app\layout.tsx)
  - Ensure visual language carries across home + case study pages.
  - Preserve linked navigation behavior and section anchors.

- **Standalone HTML deliverable** in [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\index.html`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\index.html)
  - Build a clean single-file version with semantic sections (Hero, Work, Motion, Contact).
  - Include embedded CSS/JS for glassmorphism + vibrant 3D impasto background effects.
  - Keep content blocks clearly editable (named sections/comments and straightforward structure).

## Implementation Notes
- Existing content source files remain editable:
  - [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\data\projects.ts`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\data\projects.ts)
  - [`c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\data\site.ts`](c:\Dhruvi\NJIT classes\junior\IS117\final_portfolio\src\data\site.ts)
- Motion keeps the current viscous spring intent while respecting reduced-motion preferences.
- Final pass will include build/lint validation and visual QA for contrast + no horizontal overflow.

## Validation
- Run Next.js build and lints to ensure no regressions.
- Verify all links and anchors on home/case study pages.
- Confirm `index.html` opens directly and matches the requested aesthetic baseline.