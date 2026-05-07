/* aurora.js — Aurora dark + BorderGlow (vanilla) + cursor, reveal, parallax */

(function () {
  'use strict';

  /* ── BorderGlow (React Bits port) ─────────────────── */
  const MESH_COLORS_DEFAULT = ['#c084fc', '#f472b6', '#38bdf8'];
  const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
  const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
  const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

  function parseHSL(hslStr) {
    const match = String(hslStr).match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!match) return { h: 280, s: 90, l: 72 };
    return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  }

  function buildGlowVars(glowColor, intensity) {
    const { h, s, l } = parseHSL(glowColor);
    const base = `${h}deg ${s}% ${l}%`;
    const opacities = [100, 60, 50, 40, 30, 20, 10];
    const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
    const vars = {};
    for (let i = 0; i < opacities.length; i++) {
      vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
    }
    return vars;
  }

  function buildGradientVars(colors) {
    const vars = {};
    for (let i = 0; i < 7; i++) {
      const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
    }
    vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
    return vars;
  }

  function getCenterLocal(el) {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }

  function getEdgeProximity(el, x, y) {
    const [cx, cy] = getCenterLocal(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }

  function getCursorAngle(el, x, y) {
    const [cx, cy] = getCenterLocal(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }

  function applyBorderGlowStyle(card, opts) {
    const {
      edgeSensitivity = 30,
      glowColor = '280 90 72',
      glowIntensity = 1.1,
      coneSpread = 25,
      glowRadius = 36,
      fillOpacity = 0.45,
      colors = MESH_COLORS_DEFAULT,
      borderRadiusPx = 20,
    } = opts;

    card.style.setProperty('--edge-sensitivity', String(edgeSensitivity));
    card.style.setProperty('--cone-spread', String(coneSpread));
    card.style.setProperty('--glow-padding', `${glowRadius}px`);
    card.style.setProperty('--fill-opacity', String(fillOpacity));
    card.style.setProperty('--border-radius', `${borderRadiusPx}px`);
    card.style.setProperty('--card-bg', 'rgba(10, 8, 14, 0.55)');

    Object.assign(card.style, buildGlowVars(glowColor, glowIntensity));
    Object.assign(card.style, buildGradientVars(colors));
  }

  function initBorderGlowCards() {
    const cards = document.querySelectorAll('.glass-card:not([data-no-border-glow])');
    cards.forEach((card) => {
      if (card.querySelector(':scope > .border-glow-inner')) return;

      card.classList.add('border-glow-card');
      const edgeLight = document.createElement('span');
      edgeLight.className = 'edge-light';
      const inner = document.createElement('div');
      inner.className = 'border-glow-inner liquid-glass-inner';

      while (card.firstChild) {
        inner.appendChild(card.firstChild);
      }
      card.appendChild(edgeLight);
      card.appendChild(inner);

      const br = parseFloat(getComputedStyle(card).borderRadius) || 20;
      applyBorderGlowStyle(card, { borderRadiusPx: br });

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const edge = getEdgeProximity(card, x, y);
        const angle = getCursorAngle(card, x, y);
        card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
        card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
      });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--edge-proximity', '0');
      });
    });
  }

  initBorderGlowCards();

  /* ── 1. CUSTOM CURSOR ─────────────────────────────── */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.documentElement.style.cursor = 'none';

    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, label, .glass-card, .border-glow-card';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        dot.style.background = 'var(--accent-pink)';
        dot.style.boxShadow = '0 0 16px var(--accent-pink), 0 0 36px rgba(244,114,182,0.45)';
        ring.style.borderColor = 'rgba(244, 114, 182, 0.65)';
        ring.style.transform = 'translate(-50%, -50%) scale(1.35)';
      });
      el.addEventListener('mouseleave', () => {
        dot.style.background = 'var(--accent-cyan)';
        dot.style.boxShadow = '0 0 12px var(--accent-cyan), 0 0 28px rgba(56,189,248,0.55), 0 0 2px rgba(255,255,255,0.8)';
        ring.style.borderColor = 'rgba(192, 132, 252, 0.5)';
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  /* ── 2. SCROLL REVEAL ─────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }
  initReveal();

  /* ── 3. AUTO-TAG SECTIONS ─────────────────────────── */
  function autoReveal() {
    document.querySelectorAll('section, article, footer').forEach((section) => {
      if (!section.classList.contains('aurora-bg')) section.classList.add('reveal');
    });
    initReveal();
  }
  autoReveal();

  /* ── 4. PARALLAX ORBS ─────────────────────────────── */
  const orbs = document.querySelectorAll('.aurora-orb');
  if (orbs.length) {
    const FACTOR = [0.018, -0.012, 0.009, -0.016];
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      orbs.forEach((orb, i) => {
        const f = FACTOR[i] || 0.01;
        orb.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
      });
    });
  }

  /* ── 5. CAUSTICS ──────────────────────────────────── */
  document.querySelectorAll('.glass-card').forEach((card) => {
    const target = card.querySelector('.border-glow-inner') || card;
    const caustic = document.createElement('div');
    caustic.className = 'caustic';
    target.appendChild(caustic);

    target.addEventListener('mousemove', (e) => {
      const rect = target.getBoundingClientRect();
      caustic.style.left = e.clientX - rect.left - 60 + 'px';
      caustic.style.top = e.clientY - rect.top - 60 + 'px';
    });
  });

  /* ── 6. PROXIMITY (non–border-glow only) ──────────── */
  function updateProximityGlow() {
    const vh = window.innerHeight;
    document.querySelectorAll('.glass-card:not(.border-glow-card)').forEach((card) => {
      const rect = card.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - vh / 2);
      const proximity = Math.max(0, 1 - dist / (vh * 0.6));
      if (proximity > 0.6) {
        card.style.borderColor = `rgba(192, 132, 252, ${0.12 + proximity * 0.28})`;
      } else {
        card.style.borderColor = '';
      }
    });
  }
  window.addEventListener('scroll', updateProximityGlow, { passive: true });
  updateProximityGlow();

  /* ── 7. PRISM BEAMS ───────────────────────────────── */
  function initPrismBeams() {
    const bg = document.querySelector('.aurora-bg');
    if (!bg) return;

    const beamDefs = [
      { top: '8%', left: '18%', w: '5px', h: '220px', colors: 'rgba(192,132,252,0.35), rgba(244,114,182,0.28), rgba(56,189,248,0.32)', rot: '-22deg', anim: 'prism-a', dur: '16s', delay: '0s' },
      { top: '38%', left: '72%', w: '4px', h: '160px', colors: 'rgba(56,189,248,0.32), rgba(192,132,252,0.28), rgba(244,114,182,0.26)', rot: '18deg', anim: 'prism-b', dur: '21s', delay: '3s' },
      { top: '68%', left: '44%', w: '6px', h: '190px', colors: 'rgba(244,114,182,0.3), rgba(192,132,252,0.26), rgba(56,189,248,0.28)', rot: '32deg', anim: 'prism-c', dur: '19s', delay: '6.5s' },
      { top: '22%', left: '86%', w: '3px', h: '130px', colors: 'rgba(56,189,248,0.3), rgba(192,132,252,0.28), rgba(244,114,182,0.24)', rot: '-38deg', anim: 'prism-a', dur: '24s', delay: '9s' },
      { top: '82%', left: '12%', w: '5px', h: '170px', colors: 'rgba(192,132,252,0.28), rgba(244,114,182,0.26), rgba(56,189,248,0.26)', rot: '12deg', anim: 'prism-b', dur: '18s', delay: '2s' },
      { top: '50%', left: '55%', w: '4px', h: '145px', colors: 'rgba(244,114,182,0.28), rgba(56,189,248,0.26), rgba(192,132,252,0.26)', rot: '-8deg', anim: 'prism-c', dur: '22s', delay: '11s' },
    ];

    beamDefs.forEach((b) => {
      const beam = document.createElement('div');
      beam.className = 'prism-beam';
      Object.assign(beam.style, {
        top: b.top,
        left: b.left,
        width: b.w,
        height: b.h,
        background: `linear-gradient(to bottom, transparent, ${b.colors}, transparent)`,
        filter: 'blur(7px)',
        transform: `rotate(${b.rot})`,
        animation: `${b.anim} ${b.dur} ease-in-out ${b.delay} infinite alternate`,
        opacity: '0.55',
      });
      beam.style.setProperty('--r', b.rot);
      bg.appendChild(beam);
    });
  }
  initPrismBeams();

  /* ── 8. SPARKLES ──────────────────────────────────── */
  function initSparkles() {
    const bg = document.querySelector('.aurora-bg');
    if (!bg) return;

    const colors = [
      'rgba(192,132,252,0.65)',
      'rgba(244,114,182,0.6)',
      'rgba(56,189,248,0.65)',
      'rgba(192,132,252,0.45)',
      'rgba(244,114,182,0.5)',
      'rgba(56,189,248,0.5)',
    ];

    for (let i = 0; i < 18; i++) {
      const sp = document.createElement('div');
      const size = 4 + Math.random() * 8;
      sp.className = 'prism-sparkle';
      Object.assign(sp.style, {
        width: size + 'px',
        height: size + 'px',
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        background: colors[i % colors.length],
        filter: `blur(${1 + Math.random() * 3}px)`,
        animation: `sparkle-float ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 6}s infinite alternate`,
      });
      bg.appendChild(sp);
    }
  }
  initSparkles();

  /* ── 9. PAGE LOAD ─────────────────────────────────── */
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  /* ── 10. SMOOTH ANCHOR ────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 11. ACTIVE NAV (in-page sections) ────────────── */
  const navLinks = document.querySelectorAll('.glass-nav a[href^="#"]');
  if (navLinks.length) {
    const sections = [...navLinks]
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((l) => {
              l.style.color = l.getAttribute('href') === '#' + id ? 'var(--accent-cyan)' : '';
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => navIO.observe(s));
  }
})();
