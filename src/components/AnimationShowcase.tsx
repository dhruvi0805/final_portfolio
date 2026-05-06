"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { animationProjects } from "@/data/projects";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const BG = ["motion-bg-1", "motion-bg-2", "motion-bg-3"] as const;
const ORB = ["motion-orb-1", "motion-orb-2", "motion-orb-3"] as const;

function ReelVideo({
  src,
  title,
  className,
}: {
  src: string;
  title: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex h-full min-h-[200px] w-full flex-col items-center justify-center border border-dashed border-[rgba(100,160,255,0.2)] bg-[rgba(10,11,26,0.5)] px-4 text-center ${className ?? ""}`}
      >
        <p className="text-sm font-medium text-star-white">Video placeholder</p>
        <p className="mt-2 text-xs text-cream-soft">
          Add your MP4 to{" "}
          <code className="rounded border border-[rgba(100,160,255,0.15)] bg-[rgba(255,255,255,0.04)] px-1 py-0.5 text-[0.7rem]">
            public{src}
          </code>
        </p>
      </div>
    );
  }

  return (
    <video
      className={`h-full w-full object-cover opacity-95 ${className ?? ""}`}
      src={src}
      muted
      playsInline
      loop
      autoPlay
      preload="metadata"
      aria-label={`${title} animation reel`}
      onError={() => setFailed(true)}
    />
  );
}

export function AnimationShowcase() {
  return (
    <section
      id="motion"
      className="scroll-mt-24 bg-motion-tint py-[120px] px-[8vw]"
      aria-labelledby="motion-heading"
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
            02 —
          </span>
          <h2
            id="motion-heading"
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-none text-star-white"
          >
            3D <em className="font-normal italic text-[rgba(240,180,41,0.8)]">motion</em>
          </h2>
        </motion.div>

        <ul className="grid grid-cols-1 gap-0.5 md:grid-cols-3">
          {animationProjects.map((item, i) => {
            const bg = BG[i % 3];
            const orb = ORB[i % 3];
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...spring, delay: i * 0.06 }}
                className="group relative aspect-[9/12] cursor-none overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[rgba(240,180,41,0.3)] hover:shadow-glow-gold"
              >
                <div className={`absolute inset-0 ${bg}`}>
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="relative opacity-45">
                      <div className={orb} />
                      {i % 3 === 0 ? (
                        <>
                          <div
                            className="pointer-events-none absolute -left-5 -top-5 h-[160px] w-[160px] animate-ring-pulse rounded-full border border-[rgba(58,123,213,0.3)]"
                            style={{ animationDelay: "0s" }}
                          />
                          <div
                            className="pointer-events-none absolute -left-10 -top-10 h-[200px] w-[200px] animate-ring-pulse rounded-full border border-[rgba(58,123,213,0.15)]"
                            style={{ animationDelay: "1s" }}
                          />
                        </>
                      ) : null}
                      {i % 3 === 1 ? (
                        <>
                          <div
                            className="pointer-events-none absolute -left-5 -top-5 h-[120px] w-[120px] animate-ring-pulse rounded-full border border-[rgba(240,180,41,0.3)]"
                            style={{ animationDelay: "0.5s" }}
                          />
                          <div
                            className="pointer-events-none absolute -left-10 -top-10 h-[160px] w-[160px] animate-ring-pulse rounded-full border border-[rgba(240,180,41,0.15)]"
                            style={{ animationDelay: "1.5s" }}
                          />
                        </>
                      ) : null}
                      {i % 3 === 2 ? (
                        <>
                          <div
                            className="pointer-events-none absolute -left-5 -top-5 h-[160px] w-[160px] animate-ring-pulse rounded-full border border-[rgba(38,85,168,0.3)]"
                            style={{ animationDelay: "0.3s" }}
                          />
                          <div
                            className="pointer-events-none absolute -left-[50px] -top-[50px] h-[220px] w-[220px] animate-ring-pulse rounded-full border border-[rgba(38,85,168,0.12)]"
                            style={{ animationDelay: "1.3s" }}
                          />
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="absolute inset-0 z-[2]">
                    <ReelVideo src={item.videoPath} title={item.title} />
                  </div>
                </div>

                <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(245,237,224,0.3)] bg-[rgba(10,11,26,0.4)] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-0.5 h-[18px] w-[18px] fill-star-gold"
                    aria-hidden
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] bg-gradient-to-t from-[rgba(10,11,26,0.95)] via-transparent to-transparent pb-8 pl-8 pr-8 pt-20">
                  <div className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-star-gold">
                    {item.motionLabel ?? "Motion reel"}
                  </div>
                  <h3 className="mt-2 font-display text-[1.4rem] font-bold leading-tight text-star-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.85rem] font-light text-cream-faint">{item.brief}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
