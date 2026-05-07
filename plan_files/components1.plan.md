1. Cleanup (Bug Fixes)
Header Issues
Remove any stamp graphics in header background
Remove all squiggles / decorative noise elements in header
Ensure header background is clean and consistent with theme
Contact Page Issue
Remove unexpected gradient background
Replace with solid eggshell background (see updated palette below)
2. Updated Design System
Base Colors
Background (eggshell): lighten by ~20% from current
Target: softer, brighter off-white (clean paper feel)
Text: black (#000000)
Primary accent: green (#283618)
Secondary accent: yellow (#EFCB68)
3. Background Styling
Global
Add subtle paper grain texture across entire site
Very low opacity
Must not interfere with readability
Use CSS overlay or repeating noise texture
Hero Section Only
Add dither effect background
Source: components/dither.txt
Convert React Native logic → Next.js + HTML + Tailwind compatible implementation
Must only apply to HERO section background
4. UI Enhancements
Section Styling Variants

Introduce two consistent section styles:

Light Sections (default)
Eggshel background
Black text
Dark Sections (emphasis blocks)
Background: green (#283618)
Text: eggshell white
Use for:
feature highlights
important content blocks
callouts
Accent Usage Rules
Yellow (#EFCB68):
buttons
highlights
hover states
tags / labels
Do NOT overuse — must stand out
5. Crosshair Component Integration
Component Source
File: components/Crosshair.txt
Implementation Requirements
Convert from React Native style → Next.js compatible React component
Ensure:
No RN-only dependencies remain
Uses standard DOM elements + CSS/Tailwind
Must run in:
Next.js
Static export (GitHub Pages)
Usage
Integrate crosshair as a visual overlay or UI accent
Do NOT obstruct text or usability
Should feel subtle / editorial, not interactive-heavy
6. Technical Constraint (IMPORTANT)
Project must remain fully static-export compatible
No server-side rendering dependencies for these features
Must work with GitHub Pages deployment
7. Next.js GitHub Pages Setup
Update next.config.js:
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/YOUR_REPO_NAME" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/YOUR_REPO_NAME/" : "",
};

module.exports = nextConfig;
Deployment Notes
Ensure next export works cleanly
No API routes
No server-only features
All assets must be statically accessible
8. Final Visual Direction Summary
Old newspaper editorial feel (modernized)
Minimal brutalism structure
Paper grain texture across site
Controlled use of stamps removed from bugged areas
Dithered hero background only
Crosshair = subtle design accent
Strong hierarchy with green + yellow accents