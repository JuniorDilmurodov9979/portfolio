"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SmoothScrollProps {
  readonly children: ReactNode;
}

/**
 * Site-wide smooth scrolling, plus the global motion config.
 * Lenis is skipped entirely when the visitor asks for reduced motion, so the
 * browser's native instant scrolling takes over.
 */
export default function SmoothScroll({
  children,
}: SmoothScrollProps): React.JSX.Element {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // `reducedMotion="user"` makes Framer drop transform animations for visitors
  // who ask for it, while still allowing opacity fades.
  if (reduceMotion) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
  }

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          duration: 0.9,
          lerp: 0.12,
          // Let Lenis own in-page anchor jumps, clearing the sticky nav.
          anchors: { offset: -72 },
          // Native momentum on touch feels better than a simulated one.
          syncTouch: false,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
