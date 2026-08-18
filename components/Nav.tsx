"use client";

import { useLenis } from "lenis/react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

import { navLinks } from "@/data";
import type { NavLink } from "@/types";

const NAV_OFFSET = -72;
const SCROLL_THRESHOLD = 90;

interface NavItemProps {
  readonly link: NavLink;
  /** Section anchors only scroll-jump on the homepage; elsewhere they route home with the hash. */
  readonly isHome: boolean;
  readonly isActive: boolean;
  readonly isScrolled: boolean;
  readonly onNavigate: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
}

function NavItem({
  link,
  isHome,
  isActive,
  isScrolled,
  onNavigate,
}: NavItemProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const showUnderline = isActive || isHighlighted;
  const isSectionAnchor = link.href.startsWith("#");

  const className = `relative block py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-150 sm:text-xs sm:tracking-[0.12em] ${
    isScrolled
      ? isActive
        ? "text-paper"
        : "text-paper/70 hover:text-paper"
      : isActive
        ? "text-ink"
        : "text-muted hover:text-ink"
  }`;

  const underline = (
    <motion.span
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent"
      initial={false}
      animate={{ scaleX: showUnderline ? 1 : 0 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
      }
    />
  );

  const hoverHandlers = {
    onPointerEnter: () => setIsHighlighted(true),
    onPointerLeave: () => setIsHighlighted(false),
    onFocus: () => setIsHighlighted(true),
    onBlur: () => setIsHighlighted(false),
  };

  // Off the homepage, a section anchor has nothing on the current page to
  // scroll to — route home with the hash instead of intercepting the click.
  if (isSectionAnchor && !isHome) {
    return (
      <li>
        <Link href={`/${link.href}`} className={className} {...hoverHandlers}>
          {link.label}
          {underline}
        </Link>
      </li>
    );
  }

  if (!isSectionAnchor) {
    return (
      <li>
        <Link
          href={link.href}
          aria-current={isActive ? "true" : undefined}
          className={className}
          {...hoverHandlers}
        >
          {link.label}
          {underline}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a
        href={link.href}
        aria-current={isActive ? "true" : undefined}
        onClick={(event) => onNavigate(event, link.href)}
        className={className}
        {...hoverHandlers}
      >
        {link.label}
        {underline}
      </a>
    </li>
  );
}

export default function Nav(): React.JSX.Element {
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // navigator.deviceMemory is Chromium-only; when it's unavailable (Safari,
  // Firefox) we assume adequate memory rather than disabling the effect.
  const [enableGlass] = useState<boolean>(() => {
    if (typeof navigator === "undefined") return true;
    const memory = (navigator as Navigator & { deviceMemory?: number })
      .deviceMemory;
    return typeof memory !== "number" || memory >= 4;
  });

  // A thin band across the middle of the viewport decides which section is
  // "current", so at most one link is ever marked active.
  useEffect(() => {
    const sections = navLinks
      .filter((link) => link.href.startsWith("#"))
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

  // Clear the indicator once the hero is back in view, and track when the
  // nav should detach into a floating pill.
  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY < 120) setActiveId("");
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
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

  // Blur is a real GPU cost on low-memory devices; fall back to a solid
  // pill there rather than dropping frames on scroll.
  const useBlur = enableGlass && !reduceMotion;

  return (
    <>
      {/* Reserves the header's flow space while it sits inline in the hero;
          collapses once the header detaches into a fixed floating pill. */}
      <div
        aria-hidden="true"
        className="transition-[height] duration-300 ease-out"
        style={{ height: isScrolled ? 0 : 64 }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-300 ease-out ${
          isScrolled ? "px-4 pt-4" : "px-0 pt-0"
        }`}
      >
        <div
          className={`relative flex h-16 w-full items-center justify-between gap-3 transition-[max-width,border-radius,padding] duration-300 ease-out ${
            isScrolled
              ? "max-w-3xl rounded-full px-6 md:px-8"
              : "max-w-5xl rounded-none px-6 md:px-10"
          }`}
        >
          {/* Plain header background — visible inline at the top of the hero. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 rounded-[inherit] border-b border-hairline bg-paper transition-opacity duration-300 ease-out"
            style={{ opacity: isScrolled ? 0 : 1 }}
          />

          {/* Floating glass pill — fades/scales in once detached from the hero. */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{
              opacity: isScrolled ? 1 : 0,
              scale: isScrolled ? 1 : 0.96,
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: "easeOut" }
            }
            style={{ willChange: "transform, opacity" }}
            className={`pointer-events-none absolute inset-0 -z-10 rounded-[inherit] border border-white/10 shadow-lg shadow-black/20 ${
              useBlur
                ? "bg-ink/90 [backdrop-filter:blur(10px)_saturate(160%)] supports-[backdrop-filter:blur(1px)]:bg-ink/40 sm:[backdrop-filter:blur(16px)_saturate(160%)]"
                : "bg-ink/90"
            }`}
          />

          {isHome ? (
            <a
              href="#top"
              onClick={(event) => scrollTo(event, "#top")}
              className={`relative shrink-0 font-mono text-[13px] transition-colors duration-150 sm:text-sm ${
                isScrolled ? "text-paper" : "text-ink"
              }`}
            >
              Jasur
              <span className="caret" />
            </a>
          ) : (
            <Link
              href="/"
              className={`relative shrink-0 font-mono text-[13px] transition-colors duration-150 sm:text-sm ${
                isScrolled ? "text-paper" : "text-ink"
              }`}
            >
              Jasur
              <span className="caret" />
            </Link>
          )}

          <nav aria-label="Sections" className="relative">
            <ul className="flex items-center gap-3 sm:gap-7">
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  link={link}
                  isHome={isHome}
                  isActive={
                    link.href.startsWith("#")
                      ? activeId === link.href
                      : pathname === link.href
                  }
                  isScrolled={isScrolled}
                  onNavigate={scrollTo}
                />
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
