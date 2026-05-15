# Dhruvi Malusare — Portfolio

Personal portfolio website for Dhruvi Malusare, UX Researcher & Product Designer.  
Built as the final project for IS117 at NJIT.

**Live site:** https://dhruvi0805.github.io/final_portfolio/

## Overview

A single-page portfolio with smooth-scroll navigation, a cursor-reactive animated hero, and individual case study pages for three UX/product design projects.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Main landing page — Hero, Work, About, Contact |
| `pages/work-wayfinding.html` | Case study: WayFinding Library Navigation |
| `pages/work-thrive.html` | Case study: Thrive Plant Doctor App |
| `pages/work-researchgate.html` | Case study: ResearchGate Opportunity Platform |
| `pages/projects.html` | All projects listing |
| `pages/about.html` | Extended about page |
| `pages/contact.html` | Contact page |

## Projects

**WayFinding Library Navigation** (2025)  
Centralized kiosk + mobile app for physical library navigation. Achieved 70% faster navigation and a 64% ease-of-use improvement across user testing.

**Thrive Plant Doctor App** (2025)  
Mobile app that diagnoses plant diseases via real-time camera scan and provides comprehensive care tracking.

**ResearchGate Opportunity Platform** (2024)  
Mobile app connecting college students to faculty-led research opportunities and events.

## Tech Stack

- Vanilla HTML, CSS, JavaScript — no frameworks or build tools required
- Google Fonts: Playfair Display, DM Serif Display, Cormorant Garamond, Josefin Sans
- Custom JS hero animation — cursor-reactive bar lift using `requestAnimationFrame`
- Fully accessible: semantic HTML, skip link, ARIA labels, `prefers-reduced-motion` support

## Running Locally

Open `index.html` directly in a browser — no build step needed.

```bash
# Or serve with any static server:
npx serve .
```

## Project Structure

```
final_portfolio/
├── index.html           # Main page
├── retro-elegance.css   # Global stylesheet
├── pages/               # Case study & secondary pages
└── Images/              # Project assets
    ├── Wayfinding/
    ├── Thrive/
    └── ResearchGate/
```
