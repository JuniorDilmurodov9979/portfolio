"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

import GirihPattern from "@/components/GirihPattern";
import { hero, profile } from "@/data";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero(): React.JSX.Element {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-20 md:py-28"
    >
      <motion.div
        className="mx-auto w-full max-w-5xl px-6 md:px-10"
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.p
          variants={item}
          className="flex items-center gap-2.5 font-mono text-eyebrow uppercase text-muted"
        >
          <span aria-hidden="true" className="size-1.5 bg-accent" />
          {hero.eyebrow}
        </motion.p>

        <div className="relative mt-7 w-fit">
          <GirihPattern className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[240px] w-[440px] -translate-x-1/2 -translate-y-1/2 sm:h-[300px] sm:w-[620px] lg:h-[340px] lg:w-[760px]" />

          <motion.h1
            variants={item}
            className="relative z-10 font-display text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>
        </div>

        <motion.p
          variants={item}
          className="relative z-10 mt-4 max-w-2xl font-display text-xl leading-snug text-ink sm:text-2xl lg:text-3xl"
        >
          {hero.headline}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted"
        >
          {hero.pitch}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
          <a
            href="#work"
            className="bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-opacity duration-150 hover:opacity-85"
          >
            View work
          </a>
          <a
            href="#contact"
            className="border border-hairline px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
