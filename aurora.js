/* aurora.js — Drop-in behavior layer for Aurora Glassmorphism Portfolio
   Handles: custom cursor, scroll reveal, mouse-tracked light, caustic spots
   No dependencies. Vanilla JS. */

   (function () {
    'use strict';
  
    /* ── 1. CUSTOM CURSOR ─────────────────────────────── */
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
  
    if (dot && ring) {
      let mouseX = 0, mouseY = 0;
      let ringX  = 0, ringY  = 0;
  
      document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top  = mouseY + 'px';
      });
  
      // Ring lags behind for smooth feel
      function animateRing() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        ring.style.left = ringX + 'px';
        ring.style.top  = ringY + 'px';
        requestAnimationFrame(animateRing);
      }
      animateRing();
  
      // Hide native cursor site-wide (CSS handles it, but belt+suspenders)
      document.documentElement.style.cursor = 'none';
  
      // Cursor color shifts when hovering interactive elements
      const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, label, .glass-card';
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.style.background  = 'var(--aurora-emerald)';
          dot.style.boxShadow   = '0 0 16px var(--aurora-emerald), 0 0 32px var(--aurora-cyan)';
          ring.style.borderColor = 'rgba(0, 255, 136, 0.6)';
          ring.style.transform   = 'translate(-50%, -50%) scale(1.4)';
        });
        el.addEventListener('mouseleave', () => {
          dot.style.background  = 'var(--aurora-cyan)';
          dot.style.boxShadow   = '0 0 12px var(--aurora-cyan), 0 0 24px var(--aurora-violet)';
          ring.style.borderColor = 'rgba(0, 212, 255, 0.5)';
          ring.style.transform   = 'translate(-50%, -50%) scale(1)';
        });
      });
    }
  
  
    /* ── 2. SCROLL REVEAL ─────────────────────────────── */
    function initReveal() {
      const els = document.querySelectorAll('.reveal, .reveal-stagger');
  
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  
      els.forEach(el => io.observe(el));
    }
    initReveal();
  
  
    /* ── 3. AUTO-TAG SECTIONS WITH .reveal ───────────────
       Wraps any section/article/div.container children that aren't
       already tagged — so existing HTML gets scroll reveal for free.  */
    function autoReveal() {
      const sectionSelectors = 'section, article, footer';
      document.querySelectorAll(sectionSelectors).forEach(section => {
        if (!section.classList.contains('aurora-bg')) {
          section.classList.add('reveal');
        }
      });
      // Re-init after tagging
      initReveal();
    }
    autoReveal();
  
  
    /* ── 4. MOUSE-TRACKED AURORA PARALLAX ────────────────
       The orbs subtly follow the mouse for depth illusion.  */
    const orbs = document.querySelectorAll('.aurora-orb');
  
    if (orbs.length) {
      const FACTOR = [0.018, -0.012, 0.009, -0.016];
      document.addEventListener('mousemove', e => {
        const cx = window.innerWidth  / 2;
        const cy = window.innerHeight / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        orbs.forEach((orb, i) => {
          const f = FACTOR[i] || 0.01;
          orb.style.transform += ` translate(${dx * f}px, ${dy * f}px)`;
          // Reset each frame to avoid cumulative drift
          orb.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
        });
      });
    }
  
  
    /* ── 5. CAUSTIC LIGHT SPOTS ON CARDS ─────────────────
       A glowing spot follows the mouse within each glass card.  */
    document.querySelectorAll('.glass-card').forEach(card => {
      // Inject caustic element
      const caustic = document.createElement('div');
      caustic.className = 'caustic';
      card.appendChild(caustic);
  
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        caustic.style.left = (x - 60) + 'px';
        caustic.style.top  = (y - 60) + 'px';
      });
    });
  
  
    /* ── 6. PRISMATIC BORDER GLOW on scroll position ─────
       Cards near viewport center get an amplified glow.  */
    function updateProximityGlow() {
      const vh = window.innerHeight;
      document.querySelectorAll('.glass-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vh / 2);
        const proximity = Math.max(0, 1 - dist / (vh * 0.6));
        card.style.setProperty('--card-glow', proximity.toFixed(3));
        // Boost glow intensity based on proximity
        if (proximity > 0.6) {
          card.style.borderColor = `rgba(0, 212, 255, ${0.15 + proximity * 0.25})`;
        } else {
          card.style.borderColor = '';
        }
      });
    }
  
    window.addEventListener('scroll', updateProximityGlow, { passive: true });
    updateProximityGlow();
  
  
    /* ── 7. PAGE LOAD ENTRANCE ───────────────────────────
       Staggered fade-in of the hero on load.  */
    window.addEventListener('load', () => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.6s ease';
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    });
  
  
    /* ── 8. SMOOTH ANCHOR SCROLL ─────────────────────────
       Intercepts all #anchor links for buttery scroll.  */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  
  
    /* ── 9. ACTIVE NAV HIGHLIGHT ─────────────────────────
       Highlights nav links matching the current section in view.  */
    const navLinks = document.querySelectorAll('.glass-nav a[href^="#"]');
    if (navLinks.length) {
      const sections = [...navLinks]
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);
  
      const navIO = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(l => {
              l.style.color = l.getAttribute('href') === '#' + id
                ? 'var(--aurora-cyan)'
                : '';
            });
          }
        });
      }, { threshold: 0.5 });
  
      sections.forEach(s => navIO.observe(s));
    }
  
  })();
