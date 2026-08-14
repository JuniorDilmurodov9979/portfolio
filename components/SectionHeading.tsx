interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly id?: string;
}

/** Shared eyebrow + heading pair used by every section below the hero. */
export default function SectionHeading({
  eyebrow,
  title,
  id,
}: SectionHeadingProps): React.JSX.Element {
  return (
    <div className="mb-12 md:mb-16">
      <p className="font-mono text-eyebrow uppercase text-accent">{eyebrow}</p>
      <h2
        id={id}
        className="mt-4 font-display text-2xl tracking-tight sm:text-3xl"
      >
        {title}
      </h2>
    </div>
  );
}
