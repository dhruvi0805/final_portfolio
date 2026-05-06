"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

export function Hero() {
  const [firstName] = site.logoNameParts;

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden px-[8vw] pt-28">
      <svg
        className="pointer-events-none absolute left-[55%] top-[15%] z-[1] w-[300px] opacity-[0.07]"
        viewBox="0 0 300 200"
        aria-hidden
      >
        <path
          d="M20,100 Q80,20 160,80 Q240,140 280,60"
          stroke="rgba(240,180,41,0.6)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M10,130 Q90,60 170,110 Q250,160 290,90"
          stroke="rgba(58,123,213,0.5)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-[10%] right-[2%] z-[1] w-[200px] opacity-[0.05]"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <path
          d="M10,100 Q60,10 120,80 Q180,150 190,60"
          stroke="rgba(240,180,41,0.8)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-[3] max-w-[680px]">
        <motion.p
          className="mb-6 font-mono text-[0.65rem] uppercase tracking-[0.35em] text-night-cerulean"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.08 }}
        >
          {site.heroLabel}
        </motion.p>
        <motion.h1
          className="mb-2 font-display text-[clamp(4rem,8vw,7.5rem)] font-bold leading-[0.9] text-star-white"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.12 }}
        >
          {firstName}
          <br />
          <span className="block font-normal italic text-star-yellow">{site.heroNameAccent}</span>
        </motion.h1>
        <motion.p
          className="mb-12 max-w-xl font-sans text-[clamp(1rem,2vw,1.4rem)] font-light italic text-cream-soft"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.16 }}
        >
          {site.heroRole}
        </motion.p>
        <motion.p
          className="mb-14 max-w-[480px] text-[1.05rem] font-light leading-[1.85] text-cream-muted"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
        >
          {site.tagline}
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.24 }}
        >
          <a href="#work" className="btn-primary-night">
            View work
          </a>
          <a href="#contact" className="btn-ghost-night">
            Let&apos;s talk
            <span className="inline-block animate-bounce text-base">↓</span>
          </a>
        </motion.div>
      </div>

      <div className="absolute right-[6vw] top-1/2 hidden w-[380px] max-w-[40vw] -translate-y-1/2 opacity-0 animate-fade-in-slow md:block">
        <div className="glass-dark-strong relative h-[460px] max-h-[70vh] overflow-hidden rounded-[2px] p-10 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[rgba(200,220,255,0.4)] before:to-transparent after:pointer-events-none after:absolute after:-right-20 after:-top-20 after:h-[200px] after:w-[200px] after:rounded-full after:bg-[radial-gradient(circle,rgba(38,85,168,0.3),transparent_70%)]">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-night-cerulean">
            {site.availabilityTitle}
          </p>
          <p className="mt-1 font-sans text-[1.3rem] font-light italic leading-snug text-cream-muted">
            {site.availabilitySubtitle}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-px">
            {site.heroStats.map((s) => (
              <div
                key={s.label}
                className="border border-[rgba(100,160,255,0.08)] bg-[rgba(255,255,255,0.03)] px-5 py-7"
              >
                <div className="font-display text-[2.8rem] font-bold leading-none text-star-yellow">
                  {s.value}
                </div>
                <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cream-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
