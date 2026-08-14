"use client";

import { useLenis } from "lenis/react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

import { navLinks } from "@/data";
import type { NavLink } from "@/types";

const NAV_OFFSET = -72;

interface NavItemProps {
  readonly link: NavLink;
  readonly isActive: boolean;
  readonly onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}

function NavItem({ link, isActive, onNavigate }: NavItemProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const showUnderline = isActive || isHighlighted;

  return (
    <li>
      <a
        href={link.href}
        aria-current={isActive ? "true" : undefined}
        onClick={(event) => onNavigate(event, link.href)}
        onPointerEnter={() => setIsHighlighted(true)}
        onPointerLeave={() => setIsHighlighted(false)}
        onFocus={() => setIsHighlighted(true)}
        onBlur={() => setIsHighlighted(false)}
        className={`relative block py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-150 sm:text-xs sm:tracking-[0.12em] ${
          isActive ? "text-ink" : "text-muted hover:text-ink"
        }`}
      >
        {link.label}
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent"
          initial={false}
          animate={{ scaleX: showUnderline ? 1 : 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </a>
    </li>
  );
}

export default function Nav(): React.JSX.Element {
  const lenis = useLenis();
  const [activeId, setActiveId] = useState<string>("");

  // A thin band across the middle of the viewport decides which section is
  // "current", so at most one link is ever marked active.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Clear the indicator once the hero is back in view.
  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY < 120) setActiveId("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string): void => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();

      if (lenis) {
        lenis.scrollTo(target, { offset: NAV_OFFSET });
      } else {
        target.scrollIntoView({ block: "start" });
      }

      window.history.replaceState(null, "", href === "#top" ? " " : href);
    },
    [lenis],
  );

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-3 px-6 md:px-10">
        <a
          href="#top"
          onClick={(event) => scrollTo(event, "#top")}
          className="shrink-0 font-mono text-[13px] text-ink sm:text-sm"
        >
          jasur.dev
          <span className="caret" />
        </a>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-3 sm:gap-7">
            {navLinks.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                isActive={activeId === link.href}
                onNavigate={scrollTo}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
