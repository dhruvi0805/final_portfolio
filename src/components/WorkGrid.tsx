"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { uxProjects } from "@/data/projects";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

function ProjectMock() {
  return (
    <div className="flex h-[240px] min-h-[200px] flex-1 items-center justify-center border border-[rgba(100,160,255,0.1)] bg-[rgba(10,11,26,0.6)]">
      <div className="flex w-full flex-col gap-2 px-6">
        <div className="h-1.5 w-[60%] rounded-[1px] bg-[rgba(240,180,41,0.3)]" />
        <div className="h-1.5 w-[85%] rounded-[1px] bg-[rgba(100,160,255,0.15)]" />
        <div className="h-1.5 w-[45%] rounded-[1px] bg-[rgba(100,160,255,0.15)]" />
        <div className="h-1.5 w-[70%] rounded-[1px] bg-[rgba(100,160,255,0.15)]" />
        <div className="h-1.5 w-[55%] rounded-[1px] bg-[rgba(100,160,255,0.15)]" />
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-[72px] rounded-[1px] border border-[rgba(100,160,255,0.2)] bg-[rgba(38,85,168,0.4)]" />
          <div className="h-6 w-[72px] rounded-[1px] border border-[rgba(240,180,41,0.2)] bg-[rgba(240,180,41,0.25)]" />
        </div>
      </div>
    </div>
  );
}

export function WorkGrid() {
  const [featured, ...rest] = uxProjects;

  return (
    <section
      id="work"
      className="scroll-mt-24 bg-work-section py-[120px] px-[8vw]"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          className="mb-[72px] flex items-baseline gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring}
        >
          <span className="shrink-0 font-mono text-[0.65rem] tracking-[0.2em] text-night-cerulean">
            01 —
          </span>
          <h2
            id="work-heading"
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none text-star-white"
          >
            Selected <em className="font-normal italic text-[rgba(240,180,41,0.8)]">work</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-0.5 md:grid-cols-2">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={spring}
          >
            <Link
              href={`/work/${featured.id}`}
              className="group relative block cursor-none overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-gradient-to-br before:from-[rgba(38,85,168,0.15)] before:to-transparent before:to-60% before:opacity-0 before:transition-opacity before:duration-500 hover:z-[1] hover:-translate-y-0.5 hover:border-[rgba(100,160,255,0.35)] hover:shadow-[0_0_60px_rgba(38,85,168,0.2),inset_0_0_40px_rgba(38,85,168,0.05)] hover:before:opacity-100"
            >
              <div className="relative z-[2] flex min-h-[360px] flex-col gap-10 p-12 lg:flex-row lg:items-center lg:gap-20 lg:p-16">
                <div className="min-w-0 flex-1">
                  <span className="mb-5 inline-block border border-[rgba(58,123,213,0.3)] px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-night-cerulean">
                    Featured · Case study
                  </span>
                  <h3 className="font-display text-[clamp(1.6rem,2.5vw,2.4rem)] font-bold leading-tight text-star-white">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-[440px] text-base font-light leading-[1.8] text-cream-soft">
                    {featured.summary}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-8 border-t border-[rgba(100,160,255,0.08)] pt-8">
                    <div>
                      <div className="mb-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-cream-faint">
                        Role
                      </div>
                      <div className="text-sm font-light text-cream-muted">{featured.role}</div>
                    </div>
                    <div>
                      <div className="mb-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-cream-faint">
                        Duration
                      </div>
                      <div className="text-sm font-light text-cream-muted">{featured.timeline}</div>
                    </div>
                    {featured.outcome ? (
                      <div>
                        <div className="mb-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-cream-faint">
                          Outcome
                        </div>
                        <div className="max-w-xs text-sm font-light text-cream-muted">
                          {featured.outcome}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-star-gold transition-[gap] duration-300 group-hover:gap-[18px]">
                    View case study →
                  </span>
                </div>
                <ProjectMock />
              </div>
            </Link>
          </motion.div>

          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...spring, delay: i * 0.06 }}
            >
              <Link
                href={`/work/${project.id}`}
                className="group relative flex h-full flex-col overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-gradient-to-br before:from-[rgba(38,85,168,0.15)] before:to-transparent before:to-60% before:opacity-0 before:transition-opacity before:duration-500 hover:z-[1] hover:-translate-y-0.5 hover:border-[rgba(100,160,255,0.35)] hover:shadow-glow-blue hover:before:opacity-100"
              >
                <div className="relative z-[2] flex h-full flex-col p-12">
                  <span className="mb-5 inline-block w-fit border border-[rgba(58,123,213,0.3)] px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-night-cerulean">
                    UX · Case study
                  </span>
                  <h3 className="font-display text-[clamp(1.6rem,2.5vw,2.2rem)] font-bold leading-tight text-star-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 flex-1 text-base font-light leading-[1.8] text-cream-soft">
                    {project.summary}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-8 border-t border-[rgba(100,160,255,0.08)] pt-8">
                    <div>
                      <div className="mb-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-cream-faint">
                        Role
                      </div>
                      <div className="text-sm font-light text-cream-muted">{project.role}</div>
                    </div>
                    <div>
                      <div className="mb-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-cream-faint">
                        Timeline
                      </div>
                      <div className="text-sm font-light text-cream-muted">{project.timeline}</div>
                    </div>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-star-gold transition-[gap] duration-300 group-hover:gap-[18px]">
                    Case study →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
