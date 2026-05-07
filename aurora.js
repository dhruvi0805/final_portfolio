/* aurora.js — Foundation UI: scroll reveal + smooth anchor scroll only */
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
  initReveal();

  /* ── Smooth anchor scroll ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Page load fade-in ─────────────────────────────── */
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
  });
})();
