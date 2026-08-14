import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound(): React.JSX.Element {
  return (
    <main className="flex min-h-svh items-center">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <p className="flex items-center gap-2.5 font-mono text-eyebrow uppercase text-muted">
          <span aria-hidden="true" className="size-1.5 bg-accent" />
          error 404
        </p>

        <h1 className="mt-7 font-display text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl">
          Page not found
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          That page does not exist. Everything on this site lives on one page.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block bg-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-opacity duration-150 hover:opacity-85"
        >
          Back to start
        </Link>
      </div>
    </main>
  );
}
