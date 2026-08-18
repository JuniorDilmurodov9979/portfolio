"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef } from "react";

import {
  getParallaxAmplitude,
  getScatterTransform,
  type ScatterVariant,
} from "@/components/playground/scatter";
import type { LabProject, LabProjectStatus } from "@/types";

interface PlaygroundCardProps {
  readonly item: LabProject;
  readonly index: number;
  readonly variant: ScatterVariant;
}

const STATUS_LABEL: Record<LabProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
};

const STATUS_DOT: Record<LabProjectStatus, string> = {
  live: "bg-accent",
  "in-progress": "bg-[#b8863b]",
  archived: "bg-muted",
};

function ExternalLinkIcon(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="size-3.5"
    >
      <path
        d="M6.5 3.5H3.5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3M9.5 2.5h4v4M13 3 7 9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="size-3.5"
    >
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.35c-2.22.48-2.69-1.07-2.69-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.83 1.22.83.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.96 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.08-1.87 3.76-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

const entranceTablet: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      delay: 0.08 * index,
    },
  }),
};

const entranceMobile: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/** prefers-reduced-motion: fade only, no translate/spring/stagger. */
const entranceReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const scatterVariants: Variants = {
  rest: (rotate: number) => ({ rotate }),
  hover: { rotate: 0, scale: 1.02, transition: { duration: 0.2 } },
};

export default function PlaygroundCard({
  item,
  index,
  variant,
}: PlaygroundCardProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const transform = getScatterTransform(index, variant);
  const amplitude = reduceMotion ? 0 : getParallaxAmplitude(variant) * transform.depth;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [transform.y - amplitude, transform.y + amplitude],
  );

  const statusLabel = STATUS_LABEL[item.status];

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={
        reduceMotion
          ? entranceReduced
          : variant === "mobile"
            ? entranceMobile
            : entranceTablet
      }
    >
      <motion.div
        ref={ref}
        custom={transform.rotate}
        initial="rest"
        animate="rest"
        whileHover={variant === "mobile" || reduceMotion ? undefined : "hover"}
        variants={variant === "mobile" || reduceMotion ? undefined : scatterVariants}
        style={
          variant === "mobile" || reduceMotion
            ? undefined
            : { x: transform.x, y: parallaxY }
        }
        className="relative h-full rounded-md border border-hairline bg-paper p-6 shadow-sm transition-transform duration-150 active:scale-[0.98] md:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            {item.title}
          </h3>
          <span
            className="mt-1.5 flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
            title={`Status: ${statusLabel}`}
          >
            <span
              aria-hidden="true"
              className={`size-1.5 rounded-full ${STATUS_DOT[item.status]}`}
            />
            <span className="sr-only">Status:</span>
            {statusLabel}
          </span>
        </div>

        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          {item.builtAt}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          {item.description}
        </p>

        <div className="relative mt-6 -m-2 p-2">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[#146B6B]/[0.08] backdrop-blur-[8px]"
          />
          <ul className="relative flex flex-wrap gap-x-3 gap-y-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {(item.href || item.repoUrl) && (
          <div className="mt-6 flex items-center gap-4">
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors duration-150 hover:text-accent"
              >
                <ExternalLinkIcon />
                Live
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {item.repoUrl && (
              <a
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted transition-colors duration-150 hover:text-accent"
              >
                <GithubIcon />
                Source
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
