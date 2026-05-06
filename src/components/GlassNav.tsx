"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { site } from "@/data/site";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const linkClass =
  "rounded-full px-3 py-2 text-sm font-medium text-canvas-ink/80 transition-colors duration-200 hover:bg-canvas-ink/6 hover:text-canvas-ink";

export function GlassNav() {
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("work");
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.1 });
    } else {
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("contact");
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -72, duration: 1.1 });
    } else {
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      className="fixed left-0 right-0 top-3 z-[100] px-3 sm:px-5"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={spring}
    >
      <nav
        className="glass-surface mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-canvas-ink sm:text-xl"
        >
          {site.name}
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-3">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          {isHome ? (
            <a href="#work" onClick={scrollToWork} className={linkClass}>
              Work
            </a>
          ) : (
            <Link href="/#work" className={linkClass}>
              Work
            </Link>
          )}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className={linkClass}
          >
            Resume
          </a>
          {isHome ? (
            <a
              href="#contact"
              onClick={scrollToContact}
              className="rounded-full bg-ochre px-4 py-2 text-sm font-semibold text-canvas-ink transition duration-200 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas-ink"
            >
              Contact
            </a>
          ) : (
            <Link
              href="/#contact"
              className="rounded-full bg-ochre px-4 py-2 text-sm font-semibold text-canvas-ink transition duration-200 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-canvas-ink"
            >
              Contact
            </Link>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
