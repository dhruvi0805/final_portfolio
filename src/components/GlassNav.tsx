"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { site } from "@/data/site";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const linkClass =
  "group relative font-mono text-[0.7rem] font-light uppercase tracking-[0.2em] text-cream-faint transition-colors duration-300 hover:text-star-white after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-star-gold after:transition-[width] after:duration-300 hover:after:w-full";

export function GlassNav() {
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollToId = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.1 });
    } else {
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [logoFirst, logoRest] = site.logoNameParts;

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-[100]"
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={spring}
    >
      <nav
        className="nav-glass flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-[60px] sm:py-7"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="shrink-0 font-display text-[1.05rem] font-bold tracking-[0.05em] text-star-white sm:text-[1.15rem]"
        >
          {logoFirst}
          <span className="italic text-star-gold">{logoRest}</span>
        </Link>
        <ul className="flex list-none flex-wrap items-center justify-end gap-x-5 gap-y-2 sm:gap-x-8 md:gap-x-12">
          <li>
            <Link href="/" className={linkClass}>
              Home
            </Link>
          </li>
          <li>
            {isHome ? (
              <a href="#work" onClick={scrollToId("work")} className={linkClass}>
                Work
              </a>
            ) : (
              <Link href="/#work" className={linkClass}>
                Work
              </Link>
            )}
          </li>
          <li>
            {isHome ? (
              <a href="#motion" onClick={scrollToId("motion")} className={linkClass}>
                Motion
              </a>
            ) : (
              <Link href="/#motion" className={linkClass}>
                Motion
              </Link>
            )}
          </li>
          <li>
            {isHome ? (
              <a href="#about" onClick={scrollToId("about")} className={linkClass}>
                About
              </a>
            ) : (
              <Link href="/#about" className={linkClass}>
                About
              </Link>
            )}
          </li>
          <li>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              Resume
            </a>
          </li>
          <li>
            {isHome ? (
              <a
                href="#contact"
                onClick={scrollToId("contact")}
                className="btn-primary-night inline-block rounded-none px-5 py-2.5 sm:px-9 sm:py-3.5"
              >
                Contact
              </a>
            ) : (
              <Link
                href="/#contact"
                className="btn-primary-night inline-block rounded-none px-5 py-2.5 sm:px-9 sm:py-3.5"
              >
                Contact
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
