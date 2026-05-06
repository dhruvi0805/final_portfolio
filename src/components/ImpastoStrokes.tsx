"use client";

import { motion } from "framer-motion";

const viscous = { type: "spring" as const, stiffness: 100, damping: 20 };

export function ImpastoStrokes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden max-md:opacity-50"
      aria-hidden
    >
      <motion.svg
        className="absolute -right-[20%] top-[2%] h-[min(620px,58vh)] w-[min(92vw,720px)]"
        viewBox="0 0 760 540"
        fill="none"
        initial={{ opacity: 0, x: 45, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={viscous}
      >
        <defs>
          <radialGradient id="strokeADeep" cx="18%" cy="18%" r="88%">
            <stop offset="0%" stopColor="rgba(184,169,201,0.95)" />
            <stop offset="42%" stopColor="rgba(61,107,140,0.92)" />
            <stop offset="100%" stopColor="rgba(20,61,78,0.95)" />
          </radialGradient>
          <radialGradient id="strokeAHigh" cx="28%" cy="22%" r="65%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.64)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id="strokeARim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(3,49,40,0.18)" />
            <stop offset="70%" stopColor="rgba(3,49,40,0)" />
          </linearGradient>
        </defs>
        <path
          d="M128 78C289 9 540 58 656 185C736 273 698 470 505 503C332 534 143 436 94 293C54 182 59 111 128 78Z"
          fill="url(#strokeADeep)"
        />
        <path
          d="M188 149C336 90 529 152 588 273C619 335 565 438 433 448C306 457 173 369 160 273C150 221 164 171 188 149Z"
          fill="url(#strokeAHigh)"
          style={{ mixBlendMode: "screen" }}
        />
        <path
          d="M142 112C315 29 554 83 639 188C676 236 682 324 630 393C568 319 479 261 322 230C239 215 174 186 142 112Z"
          fill="url(#strokeARim)"
          style={{ mixBlendMode: "multiply" }}
        />
        <ellipse
          cx="256"
          cy="172"
          rx="120"
          ry="60"
          fill="rgba(255,255,255,0.2)"
          style={{ mixBlendMode: "screen" }}
        />
      </motion.svg>

      <motion.svg
        className="absolute -left-[26%] bottom-[3%] h-[min(560px,54vh)] w-[min(90vw,680px)]"
        viewBox="0 0 680 500"
        fill="none"
        initial={{ opacity: 0, x: -36, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ ...viscous, delay: 0.08 }}
      >
        <defs>
          <radialGradient id="strokeBDeep" cx="72%" cy="24%" r="90%">
            <stop offset="0%" stopColor="rgba(156,175,136,0.96)" />
            <stop offset="40%" stopColor="rgba(83,121,94,0.94)" />
            <stop offset="100%" stopColor="rgba(1,50,32,0.95)" />
          </radialGradient>
          <radialGradient id="strokeBHigh" cx="70%" cy="26%" r="68%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.66)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id="strokeBShadow" x1="15%" y1="80%" x2="86%" y2="20%">
            <stop offset="0%" stopColor="rgba(1,50,32,0.24)" />
            <stop offset="100%" stopColor="rgba(1,50,32,0)" />
          </linearGradient>
        </defs>
        <path
          d="M564 90C427 10 234 52 104 151C16 219 -4 355 123 427C257 503 461 459 584 332C656 258 649 136 564 90Z"
          fill="url(#strokeBDeep)"
        />
        <path
          d="M455 173C350 102 206 151 153 240C130 285 158 365 252 384C356 405 499 317 509 233C514 199 493 179 455 173Z"
          fill="url(#strokeBHigh)"
          style={{ mixBlendMode: "screen" }}
        />
        <path
          d="M593 144C547 181 492 208 426 218C262 242 183 302 151 380C88 325 85 248 149 189C247 100 454 62 593 144Z"
          fill="url(#strokeBShadow)"
          style={{ mixBlendMode: "multiply" }}
        />
        <ellipse
          cx="460"
          cy="156"
          rx="112"
          ry="52"
          fill="rgba(255,255,255,0.18)"
          style={{ mixBlendMode: "screen" }}
        />
      </motion.svg>

      <motion.div
        className="absolute left-[48%] top-[32%] hidden h-48 w-48 -translate-x-1/2 rounded-full bg-gradient-to-br from-cobalt/30 via-lilac/25 to-sage/30 blur-3xl md:block"
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...viscous, delay: 0.12 }}
      />
      <motion.div
        className="absolute right-[24%] top-[18%] hidden h-32 w-32 rounded-full bg-white/20 blur-2xl md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...viscous, delay: 0.18 }}
      />
    </div>
  );
}
