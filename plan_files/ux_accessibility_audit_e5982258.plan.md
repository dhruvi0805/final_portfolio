---
name: UX Accessibility Audit
overview: A comprehensive WCAG 2.1 contrast audit and Nielsen heuristics review of the portfolio, with specific contrast ratios, failure classifications, and prioritized fixes across `retro-elegance.css` and all HTML pages.
todos:
  - id: p0-contrast
    content: "Fix contrast failures on crimson/teal backgrounds: eyebrow, stat-label, section-label-text, proj-desc, hero-tagline, contact-right-label — replace rgba opacity fades with pre-computed hex values that hit 4.5:1"
    status: completed
  - id: p0-footer-contrast
    content: Fix footer-copy (2.19:1), exp-period (2.19:1), footer-top/page-back (3.09:1) by raising opacity floor — e.g. 0.28→0.55, 0.38→0.62
    status: completed
  - id: p0-focus
    content: Add :focus-visible styles globally in retro-elegance.css for nav links, buttons, project rows, social rows
    status: completed
  - id: p0-motion
    content: "Add @media (prefers-reduced-motion: reduce) guard in CSS for .marquee-track animation, and in JS tick() for hero bars"
    status: completed
  - id: p1-social-links
    content: Replace all href='#' placeholder social links in index.html and contact.html with real URLs or visually indicate they're placeholders
    status: completed
  - id: p1-active-nav
    content: Add .active class to current-page nav link on each HTML page and style it in CSS
    status: completed
  - id: p1-case-study-bottom-nav
    content: Add bottom navigation to all three case study pages with ← previous / next → project links and Back to Work
    status: completed
  - id: p1-skip-link
    content: Add skip-to-content <a href='#main-content'> link before <nav> on all pages, with CSS to show on focus
    status: completed
  - id: p2-badge-sizes
    content: Raise badge-text-top from 7px and badge-sub from 6.5px to ≥12px, or add aria-hidden='true' and remove from DOM flow
    status: completed
  - id: p2-pill-sizes
    content: Raise .tag-pill and .proj-pill from 9px to 11–12px for readability
    status: completed
  - id: p2-aria-decorative
    content: Add aria-hidden='true' to contact-badge and hero badge elements that are purely decorative
    status: completed
  - id: p2-heading-hierarchy
    content: Add proper h2 to section headings in index.html; convert skill-row divs to ul/li
    status: completed
  - id: p2-all-work-cta
    content: Add an 'All Work →' CTA at the bottom of the Work section in index.html
    status: completed
isProject: false
---

# UX & Accessibility Audit — Dhruvi Malusare Portfolio

## Color Token Reference

```
--ink:        #120c06   (background, L ≈ 0.004)
--crimson:    #b5342a   (hero/contact bg, L ≈ 0.125)
--teal:       #1a6262   (work/page-hero bg, L ≈ 0.098)
--mustard:    #b88c22   (about section bg)
--cream:      #f0e6cc   (base text color, L ≈ 0.809)
```

WCAG AA requires **4.5:1** for normal text, **3:1** for large text (≥ 18px regular or ≥ 14px bold).

---

## Part 1 — WCAG Contrast Failures

### Critical Failures (ratio < 3:1)

| Element | CSS rule | Effective color | Background | Computed ratio | Required | Status |
|---|---|---|---|---|---|---|
| `.footer-copy` | `rgba(cream, 0.28)` → ~#504942 | ink | **2.19:1** | 4.5:1 | FAIL |
| `.exp-period` | `rgba(cream, 0.28)` → ~#504942 | ink | **2.19:1** | 4.5:1 | FAIL |
| `.stat-label` | `rgba(cream, 0.50)` → ~#a87568 | crimson | **2.25:1** | 4.5:1 | FAIL |
| `.section-label-text` | `rgba(cream, 0.45)` → ~#7a9d92 | teal | **2.38:1** | 4.5:1 | FAIL |
| `.eyebrow` | `rgba(cream, 0.60)` → ~#d89e8b | crimson | **2.65:1** | 4.5:1 | FAIL |
| `.badge-text-top` | `--mustard-lt` at 7px | crimson/ink | < 3:1 | 4.5:1 | FAIL |

### Moderate Failures (3:1–4.5:1 range, still fail AA for small text)

| Element | CSS rule | Background | Computed ratio | Notes |
|---|---|---|---|---|
| `.footer-top` / `.page-back` | `rgba(cream, 0.38)` | ink | **3.09:1** | 10px weight-300 all-caps; fails AA |
| `.contact-right-label` | `rgba(cream, 0.38)` | crimson | ~2.8:1 | 10px weight-300; fails AA |
| `.proj-desc` | `rgba(cream, 0.72)` | teal | **3.78:1** | 17px weight-300; not large text; fails AA |
| `.hero-tagline` | `rgba(cream, 0.82)` | crimson | **3.72:1** | clamp(16–24px); may pass AA only at 18px+ |
| `.metric-label` / `.metric-desc` | `rgba(cream, 0.50)` | ink bg-03% | ~4.1:1 | 11–15px; borderline fail |
| `.exp-desc` | `rgba(cream, 0.55)` | ink | ~4.2:1 | 16px weight-300; borderline fail |
| `.case-list li` | `rgba(cream, 0.70)` | ink | ~5.7:1 | Passes AA |
| `.case-body` | `rgba(cream, 0.75)` | ink | **~9.0:1** | Passes AA ✓ |

### Systemic Root Cause

Virtually every text element uses aggressive opacity reductions for an "aged, faded" aesthetic — applied to the foreground color. On dark ink this is acceptable at 0.70+, but on mid-tone backgrounds (crimson, teal) even 0.65 opacity drops below 4.5:1.

**Fix pattern** — instead of fading with opacity, use pre-computed hex values that hit the correct contrast while preserving the aesthetic intent:

```css
/* Instead of: color: rgba(240, 230, 204, 0.50) on crimson */
/* Use:        color: #e8c9b8  (same visual feel, but ~4.6:1 on crimson) */
```

---

### Non-Text Contrast Failures (WCAG 1.4.11)

- `.tag-pill`, `.proj-pill` borders: `rgba(cream, 0.15–0.18)` on teal/ink → ~1.2:1. UI component borders require 3:1.
- `.case-section` dividers: `rgba(cream, 0.07)` — decorative (exempt), but visually negligible.
- `.metric-item` borders: `rgba(cream, 0.08)` on ink — below 3:1 for a structural component.

---

## Part 2 — WCAG Non-Contrast Issues

### 2.1 Motion — WCAG 2.2.2 + 2.3.3

- **Hero bar lift animation** has no `@media (prefers-reduced-motion: reduce)` guard. The JS `tick()` loop runs regardless of user preference.
- **Marquee** (`animation: slide 32s`) has no `prefers-reduced-motion` guard and no pause/stop control, violating WCAG 2.2.2 (Pause, Stop, Hide) for moving content that starts automatically and lasts > 5 seconds.

Fix:
```css
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
  .hero-bar      { transform: none !important; }
}
```

### 2.2 Keyboard / Focus — WCAG 2.4.7

No `:focus-visible` styles exist anywhere in `retro-elegance.css`. All interactive elements (nav, project rows, buttons, social rows) rely solely on browser defaults, which Chrome may suppress for mouse clicks.

Fix: Add a global focus style:
```css
:focus-visible {
  outline: 2px solid var(--mustard-lt);
  outline-offset: 3px;
}
a:focus-visible, button:focus-visible { outline: 2px solid var(--mustard-lt); }
```

### 2.3 Skip Navigation — WCAG 2.4.1

No skip-to-content link exists. Keyboard users must tab through all nav items on every page load.

Fix — add before `<nav>` in all pages:
```html
<a href="#main-content" class="skip-link">Skip to content</a>
```

### 2.4 Extreme Font Sizes (Readability, not strict WCAG)

- `.badge-text-top`: **7px** — unreadable at any DPI
- `.badge-sub`: **6.5px** — unreadable
- `.proj-pill`, `.tag-pill`: **9px** — below comfortable threshold (minimum recommended: 12px)
- Multiple labels at `font-size: 10px; font-weight: 100` — weight-100 is hair-thin at small sizes

These are not strict WCAG failures but are significant usability and inclusivity concerns (users with low vision, mobile users).

### 2.5 Semantic / ARIA

- The `.badge` in the contact section ("Open to Work / 2025") has no `aria-hidden="true"` — it's decorative but screen readers will announce it.
- `.skill-row` items are `<div>` elements that function as list items — should be `<ul><li>`.
- `<h3>` used for project titles in the Work section without a preceding `<h2>` for the section — heading hierarchy skips a level.
- The `cursor: default` on `body` removes the text cursor from body text, making it harder for users to know where they can select text.

---

## Part 3 — Nielsen Heuristics

### H1: Visibility of System Status
- **No active/current-page indicator in nav.** When on `about.html`, there is no way to tell which page is active. All nav links have the same idle opacity.
- **Fix:** Add an `.active` class and set `opacity: 1; color: var(--gold);` for the current page link.

### H3: User Control & Freedom
- **Social links all point to `href="#"`** — LinkedIn, Read.cv, Dribbble, and Resume links go nowhere. This erodes trust for a portfolio aimed at recruiters.
- **No bottom navigation on case study pages.** After reading a full case study, users must scroll all the way back to the top to navigate. There is a `← Back to selected work` at the very top, but nothing at the bottom.
- **Fix:** Add a case-study bottom nav with previous/next project links and a "Back to Work" link.

### H4: Consistency & Standards
- `.footer-copy` at `font-weight: 100` and `rgba(cream, 0.28)` is nearly invisible (2.19:1). Copyright and attribution text should be legible, not decorative.
- Badge text at 7px and 6.5px is inconsistent with the rest of the design — it cannot actually communicate information.
- The `about-right` section in `index.html` uses `<div class="exp-section-label">` but then no `<h2>` or `<h3>` — the heading hierarchy is visual-only.

### H6: Recognition over Recall
- **No active navigation state** (see H1 above) — users cannot tell where they are in the site.
- **No "View All Work" CTA** at the end of the Work section on the homepage — users who scroll through all three projects have no clear next action.

### H7: Flexibility & Efficiency
- **No skip link** (see WCAG 2.4.1 above).
- Mobile experience: at `max-width: 900px`, `.case-two-col` collapses to 1 column but font sizes, badge sizes, and padding are not adjusted for the very small (7–9px) text elements.

### H8: Aesthetic & Minimalist Design
- The decorative badges (`.badge-1`, `.badge-2` in hero; `contact-badge`) contain text that is visually unreadable (6.5–7px) but still present in the DOM and announced by screen readers. Either make them legible or make them purely decorative with `aria-hidden`.
- The `.proj-year` at `rgba(cream, 0.22)` is essentially invisible even as a decorative element — the contrast is so low it adds visual noise rather than depth.
- `.proj-pill` and `.tag-pill` text at 9px, even at readable contrast, is too small to scan quickly, reducing the utility of the taxonomy system.

---

## Prioritized Fix Plan

### P0 — Critical (Break Accessibility)

1. **Contrast on crimson/teal backgrounds** — raise opacity or swap to pre-computed hex values for: `.eyebrow`, `.stat-label`, `.section-label-text`, `.proj-desc`, `.hero-tagline`, `.contact-right-label`
2. **Footer / back link contrast** — `.footer-copy` (0.28→0.55+), `.footer-top`/`.page-back` (0.38→0.60+), `.exp-period` (0.28→0.50+)
3. **Add `:focus-visible` styles** globally
4. **Add `prefers-reduced-motion`** guards for marquee animation and hero JS

### P1 — Important (Usability)

5. **Fix social links** — replace `href="#"` with real URLs or clearly mark as "coming soon"
6. **Add active nav state** (`.active` class on current page link)
7. **Add bottom-of-page navigation** on all case study pages (← / → between case studies)
8. **Add skip-to-content link**

### P2 — Polish (Quality)

9. **Raise badge text** from 7px/6.5px to minimum 12px, or add `aria-hidden="true"` and make purely decorative
10. **Raise tag-pill/proj-pill** from 9px to 11–12px
11. **Add `aria-hidden="true"`** to `.contact-badge` and hero `.badge` elements
12. **Fix heading hierarchy** — add `<h2>` to section headings in `index.html`
13. **Add "All Work →" CTA** at the bottom of the Work section on the homepage
14. **Convert `.skill-row` divs** to `<ul><li>` for semantics

### Files to change

- [`retro-elegance.css`](retro-elegance.css) — all contrast and focus fixes, motion media query
- [`index.html`](index.html) — skip link, active nav, aria-hidden on badges, semantic markup, "all work" CTA
- [`pages/work-wayfinding.html`](pages/work-wayfinding.html), [`work-thrive.html`](pages/work-thrive.html), [`work-researchgate.html`](pages/work-researchgate.html) — skip link, active nav, bottom navigation
- [`pages/about.html`](pages/about.html), [`pages/contact.html`](pages/contact.html), [`pages/projects.html`](pages/projects.html) — skip link, active nav
