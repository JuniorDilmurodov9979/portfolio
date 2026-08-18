import type { Metadata } from "next";

import Nav from "@/components/Nav";
import PlaygroundGrid from "@/components/playground/PlaygroundGrid";
import Reveal from "@/components/Reveal";
import { labProjects } from "@/data/lab";
import { profile, siteUrl } from "@/data";

const title = "Playground";
const description =
  "Hobby and side projects built in free time — a lower-stakes lab away from the main portfolio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/playground" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/playground`,
    title: `${title} — ${profile.name}`,
    description,
  },
};

export default function PlaygroundPage(): React.JSX.Element {
  return (
    <>
      <Nav />

      <main id="main">
        <section className="py-20 md:py-28">
          <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-eyebrow uppercase text-muted">
                <span aria-hidden="true" className="size-1.5 bg-accent" />
                playground
              </p>

              <h1 className="mt-7 font-display text-[2.75rem] leading-[1.05] tracking-tight sm:text-6xl">
                Free-time builds.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                No deadlines, no stakeholders — just things I wanted to build.
                Some are half-finished, some I still poke at on weekends. Come
                poke around.
              </p>
            </Reveal>

            <div className="mt-16 md:mt-20">
              <PlaygroundGrid items={labProjects} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 font-mono text-xs text-muted md:px-10">
          <p>
            Crafted by {profile.name} — Tashkent, {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
