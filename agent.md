# Agent Role: Lead Creative Technologist & UX Engineer


## 1. Project Vision: "Digital Water Lilies"
Build a high-end UX Portfolio for **Dhruvi Malusare**.
- **Design Philosophy:** Apple-inspired Glassmorphism (discipline/clarity) meets Monet’s *The Water Lily Pond* (tactile/organic).
- **Core Aesthetic:** High-contrast minimalism (White/Black/Dark Green) punctuated by heavy, irregular "Impasto" strokes (Blues/Greens) that bleed off the edges.
-Goal: The goal is to secure a UX Designer role by demonstrating technical sophistication, aesthetic taste, and motion design mastery.

## 2. Visual & Interaction Specs
- **Color Palette:**
  - Base: Off-white (#F9F9F9) / Dark Green (#013220).
  - Accents: Sage, Willow, Cobalt, Lilac, and Ochre (Contact CTA).
- **The "Brush" Cursor:**
  - Implement a 2D Canvas overlay. On mouse move/drag, render a temporary, fading particle trail that mimics a thick oil paint stroke.
- **Impasto Sectioning:**
  - Desktop: Large, irregular multi-colored stroke SVGs/Images bleeding into the viewport from the sides.
  - Mobile: Scale strokes down significantly or hide them to prioritize content readability.
- **Motion:** Framer Motion with "viscous" spring physics (`stiffness: 100, damping: 20`). Smooth scroll via Lenis or Framer.

## 3. Architecture & Content Management
- **Navigation:** Top-floating blurred glass bar (backdrop-filter: blur(20px)).
  - Left: "Dhruvi Malusare".
  - Right: Home, Work (Smooth scroll to grid), Resume (External link), Contact (Solid Ochre/Accent Button).
- **Project Data Management:**
  - Centralize all content in `src/data/projects.ts`. 
  - Array 1: 4 UX Projects (FunnyMoney, Thrive, Wayfinding, ResearchGate).
  - Array 2: 3 3D Animations (Brief + Video File Path).
- **Routing:** - Home Page (`/`): Integrated Hero, UX Grid, and 3D Section.
  - Case Study Pages (`/work/[id]`): Modular long-form layouts.

## 4. Technical Stack & Bounds
- **Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, TypeScript, Canvas API.
- **Video:** Raw files in `/public/videos`, rendered via `<video>` with `playsInline`, `muted`, `loop`.
- **Safety:** Ensure `overflow-x: hidden` on the body to prevent horizontal scrolling caused by "bleeding" impasto strokes.
- **Accessibility:** Ensure all text passes AA contrast regardless of underlying texture.

## 5. Implementation Steps for Agent
1. Setup Next.js environment with Tailwind and Framer Motion.
2. Create `src/data/projects.ts` with placeholders for the 7 projects.
3. Build the Glassmorphic Navigation and Canvas-based Cursor Brush.
4. Implement the Home page with "bleeding" impasto dividers and smooth-scroll "Work" anchor.
5. Create the dynamic `/work/[id]` template for long-form UX case studies.

