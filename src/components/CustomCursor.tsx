"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR =
  "a, button, input, textarea, select, summary, [role='button'], [data-starry-cursor-hover]";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const rafRef = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reduceMotion.matches || !finePointer.matches) {
      document.documentElement.classList.add("starry-cursor-off");
      return;
    }

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    setVisible(true);
    document.body.classList.add("custom-cursor-active");

    const updateHover = () => {
      const el = document.elementFromPoint(mx.current, my.current);
      const hover = !!(el && el.closest(HOVER_SELECTOR));
      ring.classList.toggle("hovering", hover);
    };

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      cursor.style.left = `${mx.current - 6}px`;
      cursor.style.top = `${my.current - 6}px`;
      updateHover();
    };

    const ringLoop = () => {
      rx.current += (mx.current - rx.current - 18) * 0.12;
      ry.current += (my.current - ry.current - 18) * 0.12;
      ring.style.left = `${rx.current}px`;
      ring.style.top = `${ry.current}px`;
      rafRef.current = requestAnimationFrame(ringLoop);
    };

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(ringLoop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("custom-cursor-active");
      document.documentElement.classList.remove("starry-cursor-off");
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed z-[9999] h-3 w-3 rounded-full bg-star-gold mix-blend-difference transition-transform duration-150 ease-out ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ left: 0, top: 0 }}
        aria-hidden
      />
      <div
        ref={ringRef}
        id="cursorRing"
        className={`pointer-events-none fixed z-[9998] h-9 w-9 rounded-full border-[1.5px] border-[rgba(240,180,41,0.5)] transition-all duration-[250ms] ease-out [&.hovering]:h-14 [&.hovering]:w-14 [&.hovering]:border-star-gold [&.hovering]:bg-[rgba(240,180,41,0.07)] ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ left: 0, top: 0 }}
        aria-hidden
      />
    </>
  );
}
