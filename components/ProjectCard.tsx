"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";

import type { Project, ProjectAccess } from "@/types";

interface ProjectCardProps {
  readonly project: Project;
}

const card: Variants = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * The accent border is a separate overlay faded in on hover rather than an
 * animated border-color, so the palette stays defined in one place (CSS vars)
 * while Framer Motion still owns the transition.
 */
const accentBorder: Variants = {
  rest: { opacity: 0, transition: { duration: 0.2 } },
  hover: { opacity: 1, transition: { duration: 0.2 } },
};

const preview: Variants = {
  rest: {
    filter: "grayscale(1) contrast(0.95)",
    transition: { duration: 0.25 },
  },
  hover: {
    filter: "grayscale(0) contrast(1)",
    transition: { duration: 0.25 },
  },
};

/** Only flagged when a visitor cannot simply look at the thing. */
const ACCESS_LABEL: Record<ProjectAccess, string | null> = {
  live: null,
  login: "Login required",
  internal: "Internal system",
};

export default function ProjectCard({
  project,
}: ProjectCardProps): React.JSX.Element {
  const accessLabel = ACCESS_LABEL[project.access];

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={card}
      className="relative flex h-full flex-col border border-hairline bg-paper"
    >
      <motion.span
        aria-hidden="true"
        variants={accentBorder}
        className="pointer-events-none absolute inset-0 z-10 border border-accent"
      />

      {project.image === null ? (
        // Keeps every card the same shape when there is nothing to show.
        <div className="flex aspect-16/10 w-full items-center justify-center border-b border-hairline bg-hairline/40">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {accessLabel ?? "No preview"}
          </p>
        </div>
      ) : (
        <motion.div
          variants={preview}
          className="relative aspect-16/10 w-full overflow-hidden border-b border-hairline"
        >
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </motion.div>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg tracking-tight sm:text-xl">
            {project.title}
          </h3>
          <span aria-hidden="true" className="mt-1 font-mono text-sm text-muted">
            ↗
          </span>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p className="font-mono text-xs text-accent">{project.domain}</p>
          {/* The placeholder panel already carries this label. */}
          {accessLabel === null || project.image === null ? null : (
            <p className="border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              {accessLabel}
            </p>
          )}
        </div>

        <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <span className="sr-only">(opens in a new tab)</span>
    </motion.a>
  );
}
