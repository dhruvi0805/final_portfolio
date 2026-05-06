const STAR_COLORS = [
  "rgba(255,249,240,",
  "rgba(240,180,41,",
  "rgba(91,155,213,",
  "rgba(58,123,213,",
  "rgba(245,200,66,",
];

const SWIRLS = [
  { cx: 0.3, cy: 0.08, rx: 0.25, ry: 0.04, color: "rgba(38,85,168,0.04)" },
  { cx: 0.7, cy: 0.15, rx: 0.2, ry: 0.03, color: "rgba(91,155,213,0.035)" },
  { cx: 0.5, cy: 0.45, rx: 0.35, ry: 0.05, color: "rgba(240,180,41,0.025)" },
  { cx: 0.2, cy: 0.7, rx: 0.28, ry: 0.04, color: "rgba(38,85,168,0.03)" },
  { cx: 0.8, cy: 0.85, rx: 0.22, ry: 0.03, color: "rgba(58,123,213,0.04)" },
];

function makeStars(count) {
  const stars = [];
  for (let i = 0; i < count; i += 1) {
    const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    stars.push({
      nx: Math.random(),
      ny: Math.random(),
      r: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      color,
    });
  }
  return stars;
}

function initStarCanvas() {
  const canvas = document.getElementById("starCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const stars = makeStars(280);
  let frame = 0;
  let raf = 0;

  const setSize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    frame += 1;
    ctx.clearRect(0, 0, w, h);

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#0a0b1a");
    grad.addColorStop(0.3, "#0d1b3e");
    grad.addColorStop(0.6, "#0a1228");
    grad.addColorStop(1, "#0a0b1a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const moonX = w * 0.82;
    const moonY = 160;
    const moonGrad = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 100);
    moonGrad.addColorStop(0, "rgba(245,220,140,0.18)");
    moonGrad.addColorStop(0.4, "rgba(240,180,41,0.06)");
    moonGrad.addColorStop(1, "transparent");
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 100, 0, Math.PI * 2);
    ctx.fill();

    const innerMoon = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 28);
    innerMoon.addColorStop(0, "rgba(255,249,220,0.55)");
    innerMoon.addColorStop(0.5, "rgba(240,200,80,0.25)");
    innerMoon.addColorStop(1, "transparent");
    ctx.fillStyle = innerMoon;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 28, 0, Math.PI * 2);
    ctx.fill();

    SWIRLS.forEach((swirl) => {
      ctx.beginPath();
      ctx.ellipse(swirl.cx * w, swirl.cy * h, swirl.rx * w, swirl.ry * h, 0, 0, Math.PI * 2);
      ctx.fillStyle = swirl.color;
      ctx.fill();
    });

    stars.forEach((star) => {
      const x = star.nx * w;
      const y = star.ny * h;
      const t = Math.sin(frame * star.twinkleSpeed + star.twinklePhase);
      const a = star.alpha * (0.5 + 0.5 * t);
      const r = star.r * (0.7 + 0.3 * Math.abs(t));
      const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
      glow.addColorStop(0, `${star.color}${a})`);
      glow.addColorStop(1, `${star.color}0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, r * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `${star.color}${Math.min(1, a * 1.5)})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  };

  setSize();
  window.addEventListener("resize", setSize);
  raf = requestAnimationFrame(draw);
  window.addEventListener("beforeunload", () => cancelAnimationFrame(raf), { once: true });
}

function initRevealAnimations() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "-60px 0px" }
  );
  items.forEach((item) => observer.observe(item));
}

window.AppAnimations = {
  initStarCanvas,
  initRevealAnimations,
};
