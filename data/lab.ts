import type { LabProject } from "@/types";

export const labProjects: readonly LabProject[] = [
  {
    id: "xarajat",
    title: "Xarajat — Expense Tracker",
    description:
      "A fast personal expense tracker (amounts in UZS). Weekly/monthly breakdowns, category charts, and on-demand AI spending insights. Installable as a PWA with offline fallback and optional daily push reminders.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "OpenAI", "PWA"],
    href: "https://money-tracker-omega-three.vercel.app/",
    repoUrl: "https://github.com/JuniorDilmurodov9979/money_tracker",
    status: "live",
    builtAt: "2026-08",
  },
  {
    id: "movie-app-v2",
    title: "Movie App v2",
    description:
      "A movie discovery app powered by TMDB — search, details, cast, trailers, and an AI mode where you describe what you want to watch in plain language and it parses genre, mood, and year to find matches.",
    tags: ["React", "TypeScript", "Vite", "TMDB API"],
    href: "https://movie-app-v2-jr.vercel.app/",
    repoUrl: "https://github.com/JuniorDilmurodov9979/movie_app_v2",
    status: "live",
    builtAt: "2026-05",
  },
  {
    id: "taklifnoma",
    title: "Taklifnoma — Wedding Invitation",
    description:
      "A single-page Islamic wedding invitation with seven scroll-snapped screens: wax-seal envelope opening, live countdown, RSVP, and a venue map — built in vanilla HTML/CSS/JS with parallax botanical layers and zero dependencies.",
    tags: ["HTML", "CSS", "JavaScript"],
    href: "https://taklifnoma-v2.vercel.app/",
    repoUrl: "https://github.com/JuniorDilmurodov9979/taklifnoma",
    status: "live",
    builtAt: "2026-07",
  },
];
