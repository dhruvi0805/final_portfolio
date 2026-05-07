---
name: Retro Elegance CSS Refinement
overview: Replace index.html with the provided template HTML exactly as-is, applying retro elegance CSS refinements only inside the style block. No HTML structure, class names, or content changes. aurora-glass.css and prehero.css are retired from the main page (no longer linked).
todos:
  - id: css-refine-html
    content: Write new index.html with the exact provided HTML structure and refined style block
    status: pending
isProject: false
---

# Retro Elegance CSS Refinement

## Rule: CSS only — zero HTML changes

The provided HTML becomes the new [`index.html`](index.html) verbatim. Only the `<style>` block content is upgraded. All class names, structure, content, and copy stay identical.

---

## CSS changes (inside the existing `<style>` block)

### 1. Color tokens — muted ink / aged print

```css
--crimson:    #b5342a;   /* aged, less saturated */
--crimson-dk: #7f1a11;
--teal:       #1a6262;   /* deeper, more dignified */
--teal-lt:    #247878;
--mustard:    #b88c22;   /* aged mustard, less lime */
--mustard-lt: #d4a030;
--cream:      #f0e6cc;   /* slightly more parchment */
--ink:        #120c06;   /* deeper warm ink */
--gold:       #c89c38;   /* antique gold */
```

### 2. Paper grain — real fiber feel

```css
body::after {
  /* increase to 0.65 opacity, add mix-blend-mode: multiply */
  /* shift baseFrequency from 0.9 to 0.75 for coarser, more natural fiber */
  opacity: 0.65;
  mix-blend-mode: multiply;
}
```

### 3. Typography — optical sizing & print rhythm

- `body`: `line-height: 1.82` (airier body rhythm)
- `.hero-name`: `letter-spacing: -0.025em`, `line-height: 0.86`
- `.section-title-giant`: `letter-spacing: -0.03em`, `line-height: 0.88`
- `.contact-hed`: `letter-spacing: -0.03em`
- `.about-giant-name`: `letter-spacing: -0.03em`
- `.proj-title`: `letter-spacing: -0.02em`, `line-height: 0.98`
- `.proj-desc`: `line-height: 1.82`, `font-size: 17px`
- `.about-body`: `font-size: 19px`, `line-height: 1.85`
- `.eyebrow`, `.section-label-text`, `.proj-num-small`: `letter-spacing: 0.42em` (more open, print-catalog feel)
- `.nav-links a`: `letter-spacing: 0.28em`
- `.btn-retro`: `letter-spacing: 0.34em`, `font-size: 10.5px`

### 4. Section aging gradients (pure CSS, no new elements)

- **Hero** `::before`: add bottom darkening alongside horizontal lines
  ```css
  background-image:
    repeating-linear-gradient(0deg, ...),
    linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, transparent 20%, transparent 78%, rgba(0,0,0,0.12) 100%);
  ```
- **About** `::before`: shift hatch pattern to `rgba(0,0,0,0.03)` (softer), add radial vignette corners
- **Contact** `::before`: expand radial gradient coverage, add a second warm radial at top-left

### 5. Nav — masthead double rule

```css
nav {
  border-bottom: none;
  box-shadow: 0 1.5px 0 rgba(212,168,67,0.28), 0 3px 0 rgba(212,168,67,0.08);
}
```

### 6. Buttons — stamped type, ink-bleed hover

```css
.btn-retro {
  border: 1px solid rgba(245,237,216,0.65);  /* softer, not pure white */
  transition: all 0.28s ease;                 /* slower = ink-bleed feel */
  opacity: 0.92;                              /* slight impression like stamp */
}
.btn-retro:hover {
  background: rgba(200,155,42,0.88);         /* muted, not pure mustard */
  border-color: transparent;
  opacity: 1;
}
.btn-retro.filled {
  opacity: 0.88;                              /* stamped feel */
}
```

### 7. Project rows — editorial framing

```css
.proj-tag {
  border: 1px solid rgba(200,155,42,0.6);    /* softer, aged */
  color: rgba(200,155,42,0.85);
  letter-spacing: 0.35em;
}
.proj-num-small { letter-spacing: 0.4em; }
.proj-pill {
  border: 1px solid rgba(245,237,216,0.18);
  color: rgba(245,237,216,0.55);
  letter-spacing: 0.22em;
}
.proj-year { color: rgba(245,237,216,0.25); }  /* ghosted archival year */
.proj-link { letter-spacing: 0.3em; }
```

Add subtle inner vignette to `.project-visual-panel` via `::after`:
```css
.project-visual-panel::after {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.18) 100%);
  pointer-events: none;
}
```

### 8. Marquee — more editorial

- `animation` duration: `32s` (slower, more stately)
- `.marquee-track .sep`: `color: rgba(139,26,18,0.7)` (muted separator)
- `.marquee-track span`: `letter-spacing: 0.02em`

### 9. Section dividers (project row borders)

```css
.project-row { border-top: 1px solid rgba(245,237,216,0.1); }
.project-row:hover { background: rgba(0,0,0,0.08); }  /* less stark hover */
```

### 10. About & experience

```css
.exp-item { border-left: 2px solid rgba(200,155,42,0.6); }  /* aged mustard */
.about-divider { background: rgba(26,16,8,0.7); }
.skill-row { border-bottom: 1px solid rgba(26,16,8,0.1); letter-spacing: 0.24em; }
```

### 11. Footer

```css
footer { border-top: 1px solid rgba(212,168,67,0.15); }  /* even softer gold rule */
.footer-copy { letter-spacing: 0.24em; }
```

---

## File impact

| File | Action |
|---|---|
| [`index.html`](index.html) | Full replace: provided HTML + refined `<style>` block |
| `aurora-glass.css` | Kept on disk, no longer linked from index |
| `prehero.css` | Kept on disk, no longer linked from index |
| `aurora.js` | Kept on disk, no longer linked from index |
