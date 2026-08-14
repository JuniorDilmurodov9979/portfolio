import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { experience } from "@/data";

export default function Experience(): React.JSX.Element {
  return (
    <section id="experience" className="border-t border-hairline py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow="experience" title="Where I have worked" />
        </Reveal>

        <ol className="space-y-12 md:space-y-16">
          {experience.map((job, index) => (
            <Reveal
              as="li"
              key={job.slug}
              delay={index * 0.05}
              className="grid gap-3 md:grid-cols-[10rem_1fr] md:gap-8"
            >
              <div className="font-mono text-xs text-muted">
                <p>
                  <time dateTime={job.startDate}>{job.startLabel}</time>
                  {" — "}
                  {job.endDate === null ? (
                    "Present"
                  ) : (
                    <time dateTime={job.endDate}>{job.endLabel}</time>
                  )}
                </p>
                <p className="mt-1.5">{job.location}</p>
              </div>

              <div className="relative border-l border-hairline pl-6 md:pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[3.5px] top-2 size-[7px] bg-accent"
                />

                <h3 className="font-display text-lg tracking-tight sm:text-xl">
                  {job.company}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-accent">
                  {job.role}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight.slice(0, 32)}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span aria-hidden="true" className="text-hairline">
                        —
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
