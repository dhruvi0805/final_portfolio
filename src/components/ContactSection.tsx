"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

export function ContactSection() {
  const first = site.name.split(" ")[0] ?? site.name;

  return (
    <section
      id="contact"
      className="scroll-mt-24 relative py-32 px-[8vw] text-center sm:py-36"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[min(700px,90vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(38,85,168,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <svg
        className="pointer-events-none absolute left-[5%] top-[10%] z-[1] w-[240px] opacity-[0.08]"
        viewBox="0 0 240 160"
        aria-hidden
      >
        <path
          d="M10,80 Q60,10 130,70 Q200,130 230,50"
          stroke="rgba(240,180,41,0.9)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-[10%] right-[5%] z-[1] w-[200px] opacity-[0.07]"
        viewBox="0 0 200 160"
        aria-hidden
      >
        <path
          d="M10,100 Q70,20 140,90 Q190,140 195,60"
          stroke="rgba(58,123,213,0.9)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <motion.div
        className="relative z-[2] mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={spring}
      >
        <p className="mb-6 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-night-cerulean">
          {site.contactPre}
        </p>
        <h2
          id="contact-heading"
          className="font-display text-[clamp(3rem,6vw,6rem)] font-bold leading-none text-star-white"
        >
          {site.contactTitleLines[0]}
          <br />
          <em className="font-normal italic text-star-yellow">{site.contactTitleEmphasis}</em>
          <br />
          {site.contactTitleLines[2]}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base font-light italic text-cream-soft">
          {site.contactSub}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="btn-primary-night inline-flex items-center gap-2 rounded-none px-10 py-4"
          >
            {site.email} ↗
          </a>
          <a
            href={site.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-none border border-[rgba(100,160,255,0.25)] bg-[rgba(20,40,90,0.15)] px-10 py-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cream-muted backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-star-gold hover:text-star-gold"
          >
            LinkedIn ↗
          </a>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-none border border-[rgba(100,160,255,0.25)] bg-[rgba(20,40,90,0.15)] px-10 py-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cream-muted backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-star-gold hover:text-star-gold"
          >
            Resume PDF ↓
          </a>
        </div>
        <p className="mt-10 text-sm text-cream-faint">
          Prefer a quick hello? Email {first} at the address above.
        </p>
      </motion.div>
    </section>
  );
}
