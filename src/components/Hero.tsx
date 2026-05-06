"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";
import { ImpastoStrokes } from "@/components/ImpastoStrokes";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      <ImpastoStrokes />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cobalt"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.05 }}
        >
          Digital Water Lilies
        </motion.p>
        <motion.h1
          className="font-display text-balance text-4xl leading-tight text-canvas-ink sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
        >
          {site.name}
          <span className="mt-2 block text-2xl font-sans font-medium text-canvas-ink/85 sm:text-3xl">
            {site.title}
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-canvas-ink/80 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.16 }}
        >
          {site.tagline}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.22 }}
        >
          <a
            href="#work"
            className="inline-flex items-center rounded-full border border-canvas-ink/15 bg-white/80 px-5 py-2.5 text-sm font-semibold text-canvas-ink shadow-sm backdrop-blur-sm transition hover:border-canvas-ink/25"
          >
            View selected work
          </a>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-cobalt underline-offset-4 hover:underline"
          >
            Download resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
