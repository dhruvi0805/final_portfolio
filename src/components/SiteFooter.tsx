"use client";

import { useLenis } from "lenis/react";
import { site } from "@/data/site";

export function SiteFooter() {
  const lenis = useLenis();

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-[2] border-t border-[rgba(100,160,255,0.06)] py-10 px-[8vw]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-[0.6rem] tracking-[0.15em] text-[rgba(245,237,224,0.2)]">
          © {new Date().getFullYear()} {site.name} · UX portfolio
        </p>
        <a
          href="#"
          onClick={toTop}
          className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(245,237,224,0.25)] transition-colors duration-300 hover:text-star-gold"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
