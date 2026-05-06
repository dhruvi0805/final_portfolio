"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.15,
      }}
    >
      {children}
    </ReactLenis>
  );
}
