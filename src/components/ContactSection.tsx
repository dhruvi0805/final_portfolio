"use client";

import { motion } from "framer-motion";
import { site } from "@/data/site";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-canvas-ink/10 bg-canvas-ink text-base py-16 sm:py-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={spring}
        >
          <h2
            id="contact-heading"
            className="font-display text-3xl text-white sm:text-4xl"
          >
            Let’s build something legible and alive.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85">
            Open to UX design roles and collaborative prototypes. Edit contact details
            in{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm text-white">
              src/data/site.ts
            </code>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex rounded-full bg-ochre px-6 py-3 text-sm font-semibold text-canvas-ink shadow transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Email {site.name.split(" ")[0]}
            </a>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
