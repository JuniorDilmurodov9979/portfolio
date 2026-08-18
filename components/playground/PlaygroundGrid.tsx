"use client";

import { motion, useReducedMotion } from "motion/react";

import PlaygroundCard from "@/components/playground/PlaygroundCard";
import {
  getScatterTransform,
  type ScatterVariant,
} from "@/components/playground/scatter";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { LabProject } from "@/types";

interface PlaygroundGridProps {
  readonly items: readonly LabProject[];
}

function GhostCard({
  index,
  variant,
}: {
  readonly index: number;
  readonly variant: ScatterVariant;
}): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const transform = getScatterTransform(index, variant);
  const showScatter = variant !== "mobile" && !reduceMotion;

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={showScatter ? { x: transform.x, y: transform.y, rotate: transform.rotate } : undefined}
      className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-md border border-dashed border-hairline p-6 text-center"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        More coming soon
      </p>
      <p className="mt-2 max-w-[22ch] text-xs leading-relaxed text-muted/80">
        Next free-time build lands here.
      </p>
    </motion.div>
  );
}

export default function PlaygroundGrid({
  items,
}: PlaygroundGridProps): React.JSX.Element {
  const isTabletUp = useMediaQuery("(min-width: 640px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const variant: ScatterVariant = isDesktop
    ? "desktop"
    : isTabletUp
      ? "tablet"
      : "mobile";

  return (
    <ul
      className={
        variant === "mobile"
          ? "flex flex-col gap-6"
          : "grid grid-cols-2 gap-x-10 gap-y-16 lg:gap-x-16 lg:gap-y-20"
      }
    >
      {items.map((item, index) => (
        <li key={item.id}>
          <PlaygroundCard item={item} index={index} variant={variant} />
        </li>
      ))}
      <li>
        <GhostCard index={items.length} variant={variant} />
      </li>
    </ul>
  );
}
