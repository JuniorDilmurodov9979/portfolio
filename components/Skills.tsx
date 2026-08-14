import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { education, languages, skillGroups } from "@/data";

export default function Skills(): React.JSX.Element {
  return (
    <section id="skills" className="border-t border-hairline py-20 md:py-28">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow="skills" title="What I work with" />
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.05}>
              <h3 className="border-t border-hairline pt-4 font-mono text-eyebrow uppercase text-muted">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((skill) => (
                  <li key={skill} className="text-sm text-ink">
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-10 border-t border-hairline pt-10 sm:grid-cols-2 md:mt-20">
            <div>
              <h3 className="font-mono text-eyebrow uppercase text-muted">
                Education
              </h3>
              <p className="mt-4 text-sm text-ink">{education.institution}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {education.program}
              </p>
              <p className="mt-3 font-mono text-xs text-muted">
                {education.period}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Frontend courses: {education.courses}
              </p>
            </div>

            <div>
              <h3 className="font-mono text-eyebrow uppercase text-muted">
                Languages
              </h3>
              <ul className="mt-4 space-y-2.5">
                {languages.map((language) => (
                  <li key={language} className="text-sm text-ink">
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
