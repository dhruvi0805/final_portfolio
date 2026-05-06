"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { animationProjects } from "@/data/projects";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

function ReelVideo({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border border-dashed border-canvas-ink/20 bg-canvas-ink/[0.03] px-4 text-center">
        <p className="text-sm font-medium text-canvas-ink">Video placeholder</p>
        <p className="mt-1 text-xs text-canvas-ink/65">
          Add your MP4 to{" "}
          <code className="rounded bg-canvas-ink/5 px-1 py-0.5 text-[0.7rem]">
            public{src}
          </code>{" "}
          (see <code className="rounded bg-canvas-ink/5 px-1">src/data/projects.ts</code>
          ).
        </p>
      </div>
    );
  }

  return (
    <video
      className="aspect-video w-full rounded-xl border border-canvas-ink/10 bg-black object-cover shadow-inner"
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
      className="scroll-mt-24 border-t border-canvas-ink/10 py-16 sm:py-20"
      aria-labelledby="motion-heading"
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
            id="motion-heading"
            className="font-display text-3xl text-canvas-ink sm:text-4xl"
          >
            3D & motion
          </h2>
          <p className="mt-3 text-base text-canvas-ink/75">
            Three short reels — swap in your exports under{" "}
            <code className="rounded bg-canvas-ink/5 px-1.5 py-0.5 text-sm">
              /public/videos
            </code>{" "}
            and edit paths in{" "}
            <code className="rounded bg-canvas-ink/5 px-1.5 py-0.5 text-sm">
              projects.ts
            </code>
            .
          </p>
        </motion.div>
        <ul className="grid gap-10 lg:grid-cols-3">
          {animationProjects.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ ...spring, delay: i * 0.06 }}
              className="flex flex-col gap-3"
            >
              <ReelVideo src={item.videoPath} title={item.title} />
              <div>
                <h3 className="font-display text-xl text-canvas-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-canvas-ink/75">
                  {item.brief}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
