"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  /** Seconds to wait before the entrance starts. */
  readonly delay?: number;
  /** Render as a different element than a plain div. */
  readonly as?: "div" | "section" | "li" | "header" | "footer";
}

/**
 * Fade + slide-up when scrolled into view, once. Keeping this the only
 * client component around a section lets the section itself stay a
 * server component.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
