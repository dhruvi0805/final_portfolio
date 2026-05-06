"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { uxProjects } from "@/data/projects";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

export function WorkGrid() {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-canvas-ink/10 bg-white/35 py-16 sm:py-20"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring}
        >
          <h2
            id="work-heading"
            className="font-display text-3xl text-canvas-ink sm:text-4xl"
          >
            UX case studies
          </h2>
          <p className="mt-3 text-base text-canvas-ink/75">
            Four projects spanning fintech habits, education, spatial clarity, and
            scholarly tools. Open any card for the long-form narrative.
          </p>
        </motion.div>
        <ul className="grid gap-6 sm:grid-cols-2">
          {uxProjects.map((project, i) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...spring, delay: i * 0.05 }}
            >
              <Link
                href={`/work/${project.id}`}
                className="glass-surface group flex h-full cursor-pointer flex-col rounded-2xl p-6 transition-colors duration-200 hover:border-cobalt/30"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl text-canvas-ink group-hover:text-cobalt">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-canvas-ink/70">
                      {project.subtitle}
                    </p>
                  </div>
                  <span
                    className="rounded-full bg-canvas-ink/6 px-2.5 py-1 text-xs font-medium text-canvas-ink/70"
                    aria-hidden
                  >
                    Case study
                  </span>
                </div>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-canvas-ink/80">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-canvas-ink/60">
                  <span className="font-medium text-canvas-ink/80">{project.role}</span>
                  <span aria-hidden>·</span>
                  <span>{project.timeline}</span>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-cobalt">
                  Read case study
                  <span className="ml-1 transition group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
