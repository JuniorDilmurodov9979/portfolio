"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { contactLinks, profile } from "@/data";

export default function Contact(): React.JSX.Element {
  const [copied, setCopied] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = useCallback(async (value: string): Promise<void> => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard access can be denied; the mailto link still works.
    }
  }, []);

  return (
    <section id="contact" className="border-t border-hairline py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow="contact" title="Get in touch" />
        </Reveal>

        <Reveal delay={0.05}>
          <p className="max-w-xl text-base leading-relaxed text-muted">
            Open to frontend roles and contract work. The fastest way to reach
            me is email or Telegram — I usually reply the same day.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 border-t border-hairline">
            {contactLinks.map((link) => (
              <li
                key={link.label}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-hairline py-5"
              >
                <span className="w-20 shrink-0 font-mono text-eyebrow uppercase text-muted">
                  {link.label}
                </span>

                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-base text-ink underline decoration-hairline underline-offset-4 transition-colors duration-150 hover:text-accent hover:decoration-accent"
                >
                  {link.value}
                </a>

                {link.copyable ? (
                  <button
                    type="button"
                    onClick={() => void copy(link.value)}
                    className="ml-auto font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors duration-150 hover:text-accent"
                  >
                    {copied === link.value ? "Copied" : "Copy"}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>

          <p aria-live="polite" className="sr-only">
            {copied ? `${copied} copied to clipboard` : ""}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-md bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-opacity duration-150 hover:opacity-85"
            >
              Send an email
            </a>
            <a
              href={profile.resumePath}
              download
              className="rounded-md border border-hairline px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
