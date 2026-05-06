"use client";

import { useEffect, useRef } from "react";

type Star = {
  nx: number;
  ny: number;
  r: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
};

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

function makeStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
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

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>(makeStars(280));
  const frameRef = useRef(0);
  const tickRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    setSize();
    window.addEventListener("resize", setSize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      tickRef.current += 1;
      const frame = tickRef.current;

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

      SWIRLS.forEach((s) => {
        ctx.beginPath();
        ctx.ellipse(s.cx * w, s.cy * h, s.rx * w, s.ry * h, 0, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
      });

      starsRef.current.forEach((s) => {
        const x = s.nx * w;
        const y = s.ny * h;
        const t = Math.sin(frame * s.twinkleSpeed + s.twinklePhase);
        const a = s.alpha * (0.5 + 0.5 * t);
        const r = s.r * (0.7 + 0.3 * Math.abs(t));

        const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
        grd.addColorStop(0, `${s.color}${a})`);
        grd.addColorStop(1, `${s.color}0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `${s.color}${Math.min(1, a * 1.5)})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starCanvas"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-full"
      aria-hidden
    />
  );
}
