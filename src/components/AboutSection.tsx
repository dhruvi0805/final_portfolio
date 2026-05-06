"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-[120px] px-[8vw]"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring}
        >
          <p className="mb-5 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-night-cerulean">
            03 — About
          </p>
          <h2
            id="about-heading"
            className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-bold leading-tight text-star-white"
          >
            {site.aboutHeadlineLead}
            <em className="font-normal italic text-star-yellow">{site.aboutHeadlineEm1}</em>
            <br />
            {site.aboutHeadlineMid}
            <em className="font-normal italic text-star-yellow">{site.aboutHeadlineEm2}</em>
          </h2>
          {site.aboutParagraphs.map((p, i) => (
            <p key={i} className="mt-5 text-base font-light leading-[1.9] text-cream-muted">
              {p}
            </p>
          ))}
          <div className="mt-12">
            <p className="mb-4 font-mono text-[0.58rem] uppercase tracking-[0.25em] text-night-cerulean">
              Capabilities
            </p>
            <div className="flex flex-wrap gap-2">
              {site.skills.map((s) => (
                <span key={s} data-starry-cursor-hover className="skill-tag-night">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...spring, delay: 0.08 }}
        >
          <div className="glass-dark-strong relative overflow-hidden p-12 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[rgba(240,180,41,0.4)] before:to-transparent after:pointer-events-none after:absolute after:-bottom-20 after:-right-20 after:h-[200px] after:w-[200px] after:rounded-full after:bg-[radial-gradient(circle,rgba(240,180,41,0.08),transparent_70%)]">
            <p className="mb-8 font-mono text-[0.58rem] uppercase tracking-[0.25em] text-night-cerulean">
              {site.recognitionHeading}
            </p>
            <ul className="list-none">
              {site.timelineItems.map((row, idx) => (
                <li
                  key={row.title}
                  className={`flex gap-5 py-5 ${
                    idx < site.timelineItems.length - 1
                      ? "border-b border-[rgba(100,160,255,0.08)]"
                      : ""
                  }`}
                >
                  <span
                    className={`mt-0.5 shrink-0 text-lg ${
                      row.icon === "star" ? "text-star-gold" : "text-night-cerulean"
                    }`}
                    aria-hidden
                  >
                    {row.icon === "star" ? "✦" : "◆"}
                  </span>
                  <div>
                    <div className="text-[0.95rem] text-star-white">{row.title}</div>
                    <div className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-cream-faint">
                      {row.org}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
