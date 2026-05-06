"use client";

import { motion } from "framer-motion";

const viscous = { type: "spring" as const, stiffness: 100, damping: 20 };

export function ImpastoStrokes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden max-md:opacity-40"
      aria-hidden
    >
      <motion.svg
        className="absolute -right-[18%] top-[8%] h-[min(520px,55vh)] w-[min(90vw,640px)] text-cobalt/35 md:text-cobalt/45"
        viewBox="0 0 600 420"
        fill="none"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={viscous}
      >
        <path
          d="M120 40C260 20 420 80 520 180C600 260 560 400 420 400C280 400 140 320 80 200C40 120 60 60 120 40Z"
          fill="currentColor"
        />
        <path
          d="M200 120C320 100 480 160 520 260C540 320 500 380 400 380C300 380 180 300 160 220C150 170 170 130 200 120Z"
          className="text-sage/50"
          fill="currentColor"
        />
      </motion.svg>

      <motion.svg
        className="absolute -left-[22%] bottom-[6%] h-[min(480px,50vh)] w-[min(88vw,600px)] text-willow/40 md:text-willow/50"
        viewBox="0 0 580 400"
        fill="none"
        initial={{ opacity: 0, x: -36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...viscous, delay: 0.08 }}
      >
        <path
          d="M460 60C360 40 220 80 120 160C40 230 20 320 120 360C220 400 380 360 480 280C540 230 520 80 460 60Z"
          fill="currentColor"
        />
        <path
          d="M380 140C300 120 200 160 160 240C140 290 180 340 260 340C360 340 460 260 440 200C430 170 410 150 380 140Z"
          className="text-lilac/35"
          fill="currentColor"
        />
      </motion.svg>

      <motion.div
        className="absolute left-1/2 top-1/3 hidden h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br from-cobalt/15 to-sage/20 blur-3xl md:block"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...viscous, delay: 0.12 }}
      />
    </div>
  );
}
