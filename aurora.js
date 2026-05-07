/* aurora.js — Newspaper Editorial: scroll reveal · dither hero · crosshair */
(function () {
  'use strict';

  /* ── Scroll reveal ─────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal], .reveal, .reveal-stagger');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ── Smooth anchor scroll ──────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ── Hero Dither ───────────────────────────────────────────────────
     Canvas-based ordered Bayer dithering over a domain-warped noise
     field. Renders at 1/PIXEL resolution and CSS-scales for authentic
     newspaper halftone pixel look. Only active on .hero-glow sections.
  ─────────────────────────────────────────────────────────────────── */
  function initHeroDither() {
    const hero = document.querySelector('.hero-glow');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'hero-dither-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;' +
      'pointer-events:none;z-index:0;' +
      'image-rendering:pixelated;image-rendering:crisp-edges;';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');

    /* Bayer 8×8 ordered dithering matrix */
    const BAYER = new Uint8Array([
       0,48,12,60, 3,51,15,63,
      32,16,44,28,35,19,47,31,
       8,56, 4,52,11,59, 7,55,
      40,24,36,20,43,27,39,23,
       2,50,14,62, 1,49,13,61,
      34,18,46,30,33,17,45,29,
      10,58, 6,54, 9,57, 5,53,
      42,26,38,22,41,25,37,21,
    ]);

    /* 4-tone warm newspaper palette  (eggshell → warm shadow) */
    const PALETTE = [
      [250, 247, 240],   /* base eggshell */
      [232, 226, 210],   /* warm light    */
      [200, 192, 172],   /* warm mid      */
      [158, 148, 128],   /* warm shadow   */
    ];
    const COLOR_NUM = PALETTE.length;   /* must match array length */

    /* Render at 1/PIXEL resolution; CSS stretches it */
    const PIXEL = 5;

    /* ─ Value noise ─ */
    function hash(x, y) {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
      return n - Math.floor(n);
    }
    function vnoise(x, y) {
      const ix = Math.floor(x), iy = Math.floor(y);
      const fx = x - ix,       fy = y - iy;
      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);
      return (
        hash(ix,   iy)   * (1 - ux) * (1 - uy) +
        hash(ix+1, iy)   * ux       * (1 - uy) +
        hash(ix,   iy+1) * (1 - ux) * uy       +
        hash(ix+1, iy+1) * ux       * uy
      );
    }

    /* Domain-warped fractal Brownian motion */
    function fbm(x, y, t) {
      const s = t * 0.008;
      let v = 0, a = 0.55, f = 1;
      v += a * vnoise(x * f + s * 0.40, y * f + s * 0.15);
      f *= 2.1; a *= 0.45;
      v += a * vnoise(x * f - s * 0.20, y * f + s * 0.08);
      f *= 2.1; a *= 0.45;
      v += a * vnoise(x * f + s * 0.10, y * f - s * 0.05);
      return v / 0.85; /* rough normalise → 0–1 range */
    }

    let frame = 0;
    let W = 0, H = 0;
    let imgData, pixels;

    function resize() {
      W = Math.max(1, Math.round(hero.offsetWidth  / PIXEL));
      H = Math.max(1, Math.round(hero.offsetHeight / PIXEL));
      canvas.width  = W;
      canvas.height = H;
      imgData = ctx.createImageData(W, H);
      pixels  = imgData.data;
    }

    function render() {
      const step   = 1 / (COLOR_NUM - 1);
      const aspect = W / Math.max(1, H);

      for (let py = 0; py < H; py++) {
        for (let px = 0; px < W; px++) {
          const nx = (px / W - 0.5) * aspect;
          const ny =  py / H - 0.5;

          /* Domain-warped noise */
          const warp = fbm(nx * 0.9, ny * 0.9, frame);
          const f    = fbm(nx * 0.9 + warp * 0.6, ny * 0.9, frame);

          /* Ordered Bayer dithering */
          const bx        = px % 8;
          const by        = py % 8;
          const threshold = (BAYER[by * 8 + bx] / 64) - 0.25;
          const val       = Math.max(0, Math.min(1, f + threshold * step - 0.08));
          const idx4      = Math.min(Math.round(val * (COLOR_NUM - 1)), COLOR_NUM - 1);
          const col       = PALETTE[idx4];

          const i = (py * W + px) * 4;
          pixels[i]     = col[0];
          pixels[i + 1] = col[1];
          pixels[i + 2] = col[2];
          pixels[i + 3] = 255;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      frame++;
    }

    resize();
    window.addEventListener('resize', resize);

    (function loop() {
      render();
      requestAnimationFrame(loop);
    })();
  }

  /* ── Crosshair ─────────────────────────────────────────────────────
     Smooth-lerp crosshair lines that follow the cursor. SVG turbulence
     distortion fires on any link's mouseenter for an ink-drag effect.
     Color: deep archive green #283618. Opacity: 0.38 — editorial but
     never obstructs content.
  ─────────────────────────────────────────────────────────────────── */
  function initCrosshair() {
    const GREEN = '#283618';

    const overlay = document.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;' +
      'pointer-events:none;z-index:8999;overflow:hidden;';

    overlay.innerHTML = `
      <svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
        <defs>
          <filter id="ch-fx">
            <feTurbulence id="ch-tx" type="fractalNoise" baseFrequency="0.000001" numOctaves="1"/>
            <feDisplacementMap in="SourceGraphic" scale="40"/>
          </filter>
          <filter id="ch-fy">
            <feTurbulence id="ch-ty" type="fractalNoise" baseFrequency="0.000001" numOctaves="1"/>
            <feDisplacementMap in="SourceGraphic" scale="40"/>
          </filter>
        </defs>
      </svg>
      <div id="crosshair-h"></div>
      <div id="crosshair-v"></div>
    `;
    document.body.appendChild(overlay);

    const lineH  = document.getElementById('crosshair-h');
    const lineV  = document.getElementById('crosshair-v');
    const turbX  = document.getElementById('ch-tx');
    const turbY  = document.getElementById('ch-ty');

    /* Base line style */
    const baseStyle =
      'position:absolute;pointer-events:none;opacity:0;transition:opacity 0.55s ease;';
    lineH.style.cssText = baseStyle +
      `width:100%;height:1px;top:0;left:0;background:${GREEN};`;
    lineV.style.cssText = baseStyle +
      `height:100%;width:1px;top:0;left:0;background:${GREEN};`;

    const lerp = (a, b, n) => a + (b - a) * n;

    let mouse  = { x: 0, y: 0 };
    let curr   = { x: 0, y: 0 };
    let active = false;

    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!active) {
        active  = true;
        curr.x  = mouse.x;
        curr.y  = mouse.y;
        lineH.style.opacity = '0.38';
        lineV.style.opacity = '0.38';
        tick();
      }
    });

    function tick() {
      curr.x = lerp(curr.x, mouse.x, 0.12);
      curr.y = lerp(curr.y, mouse.y, 0.12);
      lineV.style.transform = `translateX(${curr.x.toFixed(1)}px)`;
      lineH.style.transform = `translateY(${curr.y.toFixed(1)}px)`;
      requestAnimationFrame(tick);
    }

    /* Ink-drag turbulence on link hover */
    let turbVal = 0;
    let turbRaf;

    function playTurb() {
      cancelAnimationFrame(turbRaf);
      turbVal = 0.09;
      lineH.style.filter = 'url(#ch-fx)';
      lineV.style.filter = 'url(#ch-fy)';
      (function decay() {
        turbVal = Math.max(0, turbVal - 0.004);
        if (turbX) turbX.setAttribute('baseFrequency', turbVal);
        if (turbY) turbY.setAttribute('baseFrequency', turbVal);
        if (turbVal > 0) {
          turbRaf = requestAnimationFrame(decay);
        } else {
          lineH.style.filter = 'none';
          lineV.style.filter = 'none';
        }
      })();
    }

    document.querySelectorAll('a').forEach((a) => {
      a.addEventListener('mouseenter', playTurb);
    });
  }

  /* ── Page load fade-in ─────────────────────────────── */
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  /* ── ScrambledText ─────────────────────────────────────────────────
     Mouse-proximity text scramble for hero card elements.
     Add data-scramble to any element; optional data-scramble-radius="80".
  ─────────────────────────────────────────────────────────────────── */
  function initScrambledText() {
    const CHARS     = '.:·•○◦∘∙';
    const DEFAULT_R = 80;
    const STEPS     = 9;
    const STEP_MS   = 58;

    const targets = document.querySelectorAll('[data-scramble]');
    if (!targets.length) return;

    targets.forEach((el) => {
      const radius  = parseInt(el.dataset.scrambleRadius, 10) || DEFAULT_R;
      const rawText = el.innerText;
      const charEls = [];

      el.innerHTML = '';
      [...rawText].forEach((ch) => {
        if (ch === ' ') {
          el.appendChild(document.createTextNode('\u00a0'));
        } else if (ch === '\n') {
          el.appendChild(document.createElement('br'));
        } else {
          const span            = document.createElement('span');
          span.className        = 'scramble-char';
          span.dataset.original = ch;
          span.textContent      = ch;
          el.appendChild(span);
          charEls.push(span);
        }
      });

      el._scrambleChars  = charEls;
      el._scrambleRadius = radius;
    });

    document.addEventListener('mousemove', (e) => {
      targets.forEach((el) => {
        const chars  = el._scrambleChars;
        const radius = el._scrambleRadius;
        if (!chars) return;
        chars.forEach((c) => {
          if (c._scrambling) return;
          const rect = c.getBoundingClientRect();
          const dist = Math.hypot(
            e.clientX - (rect.left + rect.width  / 2),
            e.clientY - (rect.top  + rect.height / 2)
          );
          if (dist < radius) {
            c._scrambling = true;
            const original = c.dataset.original;
            let step = 0;
            const iv = setInterval(() => {
              if (step >= STEPS) {
                c.textContent = original;
                c._scrambling = false;
                clearInterval(iv);
              } else {
                c.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
                step++;
              }
            }, STEP_MS);
          }
        });
      });
    });
  }

  /* ── Boot ──────────────────────────────────────────── */
  initReveal();
  initSmoothScroll();
  initHeroDither();
  initCrosshair();
  initScrambledText();

})();
