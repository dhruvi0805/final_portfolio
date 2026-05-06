"use client";

import { useEffect, useRef } from "react";

type Stroke = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  color: string;
};

const PALETTE = [
  "46, 93, 78",
  "61, 107, 140",
  "156, 175, 136",
  "1, 50, 32",
  "91, 123, 153",
];

export function BrushCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const batch = 4;
      for (let i = 0; i < batch; i++) {
        const rgb = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        strokesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 28,
          y: e.clientY + (Math.random() - 0.5) * 28,
          r: 6 + Math.random() * 18,
          alpha: 0.22 + Math.random() * 0.2,
          color: rgb,
        });
      }
      if (strokesRef.current.length > 420) {
        strokesRef.current.splice(0, strokesRef.current.length - 420);
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      strokesRef.current = strokesRef.current.filter((s) => {
        s.alpha -= 0.018;
        s.r += 0.35;
        if (s.alpha <= 0) return false;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        g.addColorStop(0, `rgba(${s.color},${s.alpha})`);
        g.addColorStop(1, `rgba(${s.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90] opacity-70 mix-blend-multiply max-md:hidden"
      aria-hidden
    />
  );
}
