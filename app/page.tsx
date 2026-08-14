import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Skills from "@/components/Skills";
import {
  education,
  experience,
  profile,
  projects,
  siteUrl,
  skillGroups,
} from "@/data";

/** Person schema so a search for the name can surface a rich result. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tashkent",
    addressCountry: "UZ",
  },
  sameAs: [profile.github, profile.telegram],
  worksFor: { "@type": "Organization", name: experience[0].company },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.institution,
  },
  knowsAbout: skillGroups.flatMap((group) => group.items),
};

export default function Home(): React.JSX.Element {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, author-controlled data — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Nav />

      <main id="main">
        <Hero />
        <About />

        <section id="work" className="border-t border-hairline py-20 md:py-28">
          <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
            <Reveal>
              <SectionHeading eyebrow="work" title="Selected projects" />
            </Reveal>

            <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              {projects.map((project, index) => (
                <Reveal as="li" key={project.slug} delay={(index % 2) * 0.05}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <Experience />
        <Skills />
        <Contact />
      </main>

      <footer className="border-t border-hairline py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 font-mono text-xs text-muted md:px-10">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </footer>
    </>
  );
}
