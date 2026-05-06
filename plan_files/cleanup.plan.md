You are a senior frontend engineer performing a SAFE cleanup and refactor of this portfolio project.

Goal:
Streamline the codebase for a simple HTML/CSS class portfolio deployed on GitHub Pages.
Remove ALL unnecessary, redundant, or conflicting files/code while ensuring the UI remains exactly the same.

CRITICAL RULES:
- Do NOT change the visual design or layout of the website
- Do NOT remove anything required for rendering the current UI
- Only remove dead, unused, or conflicting code/files
- Prefer safety over aggressive deletion

STEP 1: Analyze project structure
- Identify whether this is React/Next.js, static HTML, or mixed
- Identify duplicate systems (e.g. index.html vs React app vs Next build output)
- Identify unused frameworks, configs, or build artifacts

STEP 2: Remove unnecessary items safely
Delete or remove:
- Old build artifacts (.next, dist, build folders if not needed for current setup)
- Duplicate or unused entry points (e.g. conflicting index.html if React is used OR vice versa)
- Unused dependencies in package.json (only if confirmed unused)
- Old scripts, configs, or experimental files (e.g. install.ps1, temp files, agent.md if not used in build)
- Redundant CSS/JS files not imported anywhere
- Any Framer/Next/React leftovers if project is being simplified

STEP 3: Keep ONLY what is required
Ensure the final project includes only:
- Files needed to render the live website
- Required assets (images, fonts, css, js actually used)
- One clear build/deployment path (no duplicates or competing systems)

STEP 4: Fix consistency issues
- Ensure asset paths work on GitHub Pages
- Ensure no broken imports or missing references
- Ensure CSS is properly loaded everywhere

STEP 5: Output
After cleanup, provide:
- A list of files removed and why
- A list of files kept and why
- Any risks or things I should double-check before deploying

FINAL GOAL:
A clean, minimal, deployment-ready portfolio that matches the current UI exactly but has no redundant or conflicting code.