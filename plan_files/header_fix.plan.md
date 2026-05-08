Fix the layout issue between the top navigation header and the project hero section.

Problem:

There is an unwanted gap between the navbar and the project header/hero section. The navbar is not properly positioned, and part of the page background/scroll area is visible underneath it. The layout feels misaligned and the header is not sticking correctly to the top.

Requirements:
Make the navigation bar fully sticky or fixed to the top of the viewport.
It should remain visible on scroll.
It should sit flush against the top of the page with no gap.
Remove any unintended spacing between:
navbar
hero/project header section
Ensure the hero section starts directly underneath the navbar (no visible background strip or empty space).
Check for and fix common causes:
margin-top or padding-top on the first section
body default margin
header positioning issues (relative, absolute, fixed, sticky)
z-index issues causing layering/scroll bleed
Ensure layout consistency across all project pages, not just this one.
Visual expectation:

Navbar should sit pinned at the top, and the project hero section should begin immediately below it with no visible gap or scroll artifact.

Do not change design styling (colors, typography, spacing system) unless required to fix the layout bug.