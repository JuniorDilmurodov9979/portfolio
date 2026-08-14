import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { about, profile } from "@/data";

export default function About(): React.JSX.Element {
  return (
    <section id="about" className="border-t border-hairline py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow="about" title="Who I am" />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-16">
          <Reveal delay={0.05}>
            <dl className="space-y-5 font-mono text-xs">
              <div>
                <dt className="text-muted uppercase tracking-[0.12em]">Role</dt>
                <dd className="mt-1.5 text-ink">{profile.stack}</dd>
              </div>
              <div>
                <dt className="text-muted uppercase tracking-[0.12em]">Based in</dt>
                <dd className="mt-1.5 text-ink">{profile.location}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-muted">
              {about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
