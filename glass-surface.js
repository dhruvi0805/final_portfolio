/* glass-surface.js — Vanilla JS port of React Bits <GlassSurface>
   Applies chromatic-aberration SVG displacement to .glass-card backdrop.
   Chromium: uses backdrop-filter: url(#svgFilter).
   Firefox/Safari: adds gs-fallback class for CSS-only glass. */

(function () {
  'use strict';

  /* ─── Browser capability check ─────────────────────────── */
  function supportsBackdropSVGFilter() {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent;
    // Only Chromium-based browsers support SVG filter references in backdrop-filter
    if (/Safari/.test(ua) && !/Chrome/.test(ua)) return false;
    if (/Firefox/.test(ua)) return false;
    const probe = document.createElement('div');
    probe.style.backdropFilter = 'url(#gs-probe)';
    return probe.style.backdropFilter !== '';
  }

  const SVG_SUPPORTED = supportsBackdropSVGFilter();

  /* ─── Global hidden SVG container for filter defs ──────── */
  let globalDefs = null;

  function ensureGlobalDefs() {
    if (globalDefs) return;
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.setAttribute('aria-hidden', 'true');
    svgEl.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;';
    globalDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svgEl.appendChild(globalDefs);
    document.body.insertBefore(svgEl, document.body.firstChild);
  }

  /* ─── Displacement map: inline SVG as data URL ──────────── */
  function buildMapDataUrl(w, h, br, opts) {
    const { borderWidth, brightness, opacity, blur, mixBlendMode, redGradId, blueGradId } = opts;
    const edge = Math.min(w, h) * borderWidth * 0.5;
    const svg =
      `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">` +
      `<defs>` +
      `<linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">` +
        `<stop offset="0%" stop-color="#0000"/>` +
        `<stop offset="100%" stop-color="red"/>` +
      `</linearGradient>` +
      `<linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">` +
        `<stop offset="0%" stop-color="#0000"/>` +
        `<stop offset="100%" stop-color="blue"/>` +
      `</linearGradient>` +
      `</defs>` +
      `<rect width="${w}" height="${h}" fill="black"/>` +
      `<rect width="${w}" height="${h}" rx="${br}" fill="url(#${redGradId})"/>` +
      `<rect width="${w}" height="${h}" rx="${br}" fill="url(#${blueGradId})" style="mix-blend-mode:${mixBlendMode}"/>` +
      `<rect x="${edge}" y="${edge}" ` +
        `width="${Math.max(0, w - edge * 2)}" height="${Math.max(0, h - edge * 2)}" ` +
        `rx="${br}" fill="hsl(0 0% ${brightness}%/${opacity})" style="filter:blur(${blur}px)"/>` +
      `</svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  /* ─── Build SVG filter element in <defs> ───────────────── */
  function buildFilter(filterId, opts) {
    const {
      distortionScale, redOffset, greenOffset, blueOffset,
      xChannel, yChannel, displace,
    } = opts;
    const NS = 'http://www.w3.org/2000/svg';

    const filter = document.createElementNS(NS, 'filter');
    filter.id = filterId;
    filter.setAttribute('colorInterpolationFilters', 'sRGB');
    filter.setAttribute('x', '0%'); filter.setAttribute('y', '0%');
    filter.setAttribute('width', '100%'); filter.setAttribute('height', '100%');

    /* feImage — holds the displacement map SVG */
    const feImg = document.createElementNS(NS, 'feImage');
    feImg.setAttribute('x', '0'); feImg.setAttribute('y', '0');
    feImg.setAttribute('width', '100%'); feImg.setAttribute('height', '100%');
    feImg.setAttribute('preserveAspectRatio', 'none');
    feImg.setAttribute('result', 'map');
    filter.appendChild(feImg);

    /* Helper: one RGB channel displacement + color isolation */
    function addChannel(scale, dispResult, colorResult, matrix) {
      const fd = document.createElementNS(NS, 'feDisplacementMap');
      fd.setAttribute('in', 'SourceGraphic'); fd.setAttribute('in2', 'map');
      fd.setAttribute('scale', String(scale));
      fd.setAttribute('xChannelSelector', xChannel);
      fd.setAttribute('yChannelSelector', yChannel);
      fd.setAttribute('result', dispResult);
      filter.appendChild(fd);

      const fc = document.createElementNS(NS, 'feColorMatrix');
      fc.setAttribute('in', dispResult);
      fc.setAttribute('type', 'matrix');
      fc.setAttribute('values', matrix);
      fc.setAttribute('result', colorResult);
      filter.appendChild(fc);
    }

    addChannel(
      distortionScale + redOffset,   'dispRed',   'red',
      '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0'
    );
    addChannel(
      distortionScale + greenOffset, 'dispGreen', 'green',
      '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0'
    );
    addChannel(
      distortionScale + blueOffset,  'dispBlue',  'blue',
      '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0'
    );

    /* Blend the three channels back together */
    const fb1 = document.createElementNS(NS, 'feBlend');
    fb1.setAttribute('in', 'red'); fb1.setAttribute('in2', 'green');
    fb1.setAttribute('mode', 'screen'); fb1.setAttribute('result', 'rg');
    filter.appendChild(fb1);

    const fb2 = document.createElementNS(NS, 'feBlend');
    fb2.setAttribute('in', 'rg'); fb2.setAttribute('in2', 'blue');
    fb2.setAttribute('mode', 'screen'); fb2.setAttribute('result', 'output');
    filter.appendChild(fb2);

    /* Tiny output blur to smooth the chromatic aberration edges */
    const fg = document.createElementNS(NS, 'feGaussianBlur');
    fg.setAttribute('in', 'output');
    fg.setAttribute('stdDeviation', String(displace));
    filter.appendChild(fg);

    return { filter, feImg };
  }

  /* ─── Apply glass surface to one card element ───────────── */
  let counter = 0;

  function applyGlass(el, opts) {
    if (el.classList.contains('gs-enhanced')) return; // already applied

    const {
      borderWidth     = 0.07,
      brightness      = 50,
      opacity         = 0.93,
      blur            = 11,
      displace        = 0.7,
      saturation      = 1.6,
      distortionScale = -180,
      redOffset       = 0,
      greenOffset     = 10,
      blueOffset      = 20,
      xChannel        = 'R',
      yChannel        = 'G',
      mixBlendMode    = 'difference',
    } = (opts || {});

    el.classList.add('gs-enhanced');

    if (!SVG_SUPPORTED) {
      el.classList.add('gs-fallback');
      return;
    }

    counter++;
    const filterId = `gs-filter-${counter}`;
    const redGradId  = `gs-rg-${counter}`;
    const blueGradId = `gs-bg-${counter}`;

    ensureGlobalDefs();
    const { filter, feImg } = buildFilter(filterId, {
      distortionScale, redOffset, greenOffset, blueOffset,
      xChannel, yChannel, displace,
    });
    globalDefs.appendChild(filter);

    /* Update feImage displacement map when card resizes */
    function updateMap() {
      const rect = el.getBoundingClientRect();
      const w  = rect.width  || 400;
      const h  = rect.height || 200;
      const br = parseFloat(getComputedStyle(el).borderRadius) || 20;
      feImg.setAttribute('href', buildMapDataUrl(w, h, br, {
        borderWidth, brightness, opacity, blur, mixBlendMode,
        redGradId, blueGradId,
      }));
    }

    updateMap();

    const ro = new ResizeObserver(() => setTimeout(updateMap, 0));
    ro.observe(el);

    /* Wire up backdrop-filter via CSS custom properties */
    el.style.setProperty('--gs-backdrop', `url(#${filterId})`);
    el.style.setProperty('--gs-saturation', String(saturation));
    el.classList.add('gs-svg');
  }

  /* ─── Init: apply to every .glass-card ──────────────────── */
  function init() {
    document.querySelectorAll('.glass-card').forEach(card => {
      applyGlass(card, {
        distortionScale: -130,
        redOffset:       0,
        greenOffset:     9,
        blueOffset:      20,
        brightness:      52,
        opacity:         0.91,
        blur:            10,
        borderWidth:     0.08,
        saturation:      1.65,
        displace:        0.7,
        xChannel:        'R',
        yChannel:        'G',
        mixBlendMode:    'difference',
      });
    });
  }

  /* Run after DOM (and aurora.js / BorderGlow) are ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
