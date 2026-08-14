/** How much of a project a visitor can actually see by following the link. */
export type ProjectAccess = "live" | "login" | "internal";

export interface Project {
  /** Stable key, also used as the anchor-free React key. */
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  /** Public URL of the live deployment. */
  readonly href: string;
  /** Domain shown on the card, without protocol. */
  readonly domain: string;
  readonly access: ProjectAccess;
  /** Path under /public, or null while no screenshot exists yet. */
  readonly image: string | null;
  readonly tags: readonly string[];
}

export interface ExperienceItem {
  readonly slug: string;
  readonly company: string;
  readonly role: string;
  /** ISO year-month for the <time> element. */
  readonly startDate: string;
  /** ISO year-month, or null while ongoing. */
  readonly endDate: string | null;
  /** Human-readable start, e.g. "Jul 2025". */
  readonly startLabel: string;
  /** Human-readable end, or null while ongoing. */
  readonly endLabel: string | null;
  readonly location: string;
  readonly highlights: readonly string[];
}

export interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
}

export interface NavLink {
  /** In-page anchor, e.g. "#work". */
  readonly href: string;
  readonly label: string;
}

export interface ContactLink {
  readonly label: string;
  readonly value: string;
  readonly href: string;
  /** Show a copy-to-clipboard control next to the link. */
  readonly copyable?: boolean;
  readonly external?: boolean;
}
