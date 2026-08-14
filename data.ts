import type {
  ContactLink,
  ExperienceItem,
  NavLink,
  Project,
  SkillGroup,
} from "@/types";

export const siteUrl = "https://juniordilmurodov.uz";

export const profile = {
  name: "Jasur Dilmurodov",
  role: "Frontend Developer",
  stack: "React / Next.js / TypeScript",
  location: "Tashkent, Uzbekistan",
  email: "juniordilmurodov@gmail.com",
  telegram: "https://t.me/junior_dilmurodov",
  github: "https://github.com/JuniorDilmurodov9979",
  /** Drop the matching file into /public to enable the download button. */
  resumePath: "/jasur-dilmurodov-cv.pdf",
} as const;

export const navLinks: readonly NavLink[] = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const hero = {
  eyebrow: "available for opportunities",
  headline: "Building interfaces for real production load.",
  pitch:
    "Frontend developer in Tashkent. Nearly two years shipping enterprise platforms — tender evaluation, AI contract analysis, internal ERP — in React, Next.js and TypeScript.",
} as const;

export const about: readonly string[] = [
  "I build enterprise and public-facing web applications with React, Next.js and TypeScript. Over the last two years I have delivered production systems for tender evaluation, AI-assisted legal document analysis, internal ERP workflows and corporate platforms — the kind of software that people open every morning and use all day.",
  "My focus is performance, accessibility and clean UI architecture: state that stays predictable as a product grows, components that survive being reused, and interfaces that hold up when the data is messy and the user count is real.",
];

export const projects: readonly Project[] = [
  {
    slug: "tender-analysis",
    title: "AI Tender Analysis System",
    description:
      "A platform for automated tender evaluation — compliance scoring and ranking of submissions. Built the data visualization layer, PDF and Excel export pipelines, JWT authentication and role-based access control.",
    href: "https://tanlov.kuprikqurilish.uz",
    domain: "tanlov.kuprikqurilish.uz",
    access: "live",
    image: "/work/tanlov.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS", "ApexCharts", "JWT / RBAC", "REST API"],
  },
  {
    slug: "legal-bridge",
    title: "AI Legal Bridge",
    description:
      "Frontend for an AI-powered contract analysis platform. Implemented the legal document processing workflows and full multilingual support across the interface (UZ / RU).",
    href: "https://legal-bridge.kuprikqurilish.uz",
    domain: "legal-bridge.kuprikqurilish.uz",
    access: "login",
    image: null,
    tags: ["React", "TypeScript", "Tailwind CSS", "i18n (UZ / RU)", "REST API"],
  },
  {
    slug: "internal-erp",
    title: "Internal ERP Platform",
    description:
      "Document exchange and task routing used daily by 50+ employees across management teams. Built dynamic tables, status tracking and the reporting interfaces on top of them.",
    href: "https://loyiha.kuprikqurilish.uz",
    domain: "loyiha.kuprikqurilish.uz",
    access: "internal",
    image: null,
    tags: ["React", "TypeScript", "TanStack Query", "Zustand", "RBAC"],
  },
  {
    slug: "corporate-site",
    title: "Corporate Website",
    description:
      "Rebuilt and modernized the company's public website — new navigation, a reusable component library and responsive layouts replacing the previous static build.",
    href: "https://kuprikqurilish.uz",
    domain: "kuprikqurilish.uz",
    access: "live",
    image: "/work/kuprikqurilish.jpg",
    tags: ["React", "Tailwind CSS", "Responsive UI"],
  },
];

export const experience: readonly ExperienceItem[] = [
  {
    slug: "kuprikqurilish",
    company: "Kuprikqurilish JSC",
    role: "Frontend Developer",
    startDate: "2025-07",
    endDate: null,
    startLabel: "Jul 2025",
    endLabel: null,
    location: "Tashkent, Uzbekistan",
    highlights: [
      "Developed and maintained 4 enterprise web platforms using React, TypeScript, Tailwind CSS and modern frontend tooling.",
      "Built scalable UI architectures, integrated REST APIs and implemented state management across all projects.",
      "Implemented JWT authentication, role-based access control, UZ/RU localization and responsive layouts used by 50+ internal users.",
      "Worked with backend and business teams to ship internal and public-facing platforms on schedule.",
    ],
  },
  {
    slug: "freelance",
    company: "Noventer Dev",
    role: "Frontend Developer — Contract / Freelance",
    startDate: "2025-05",
    endDate: "2025-09",
    startLabel: "May 2025",
    endLabel: "Sep 2025",
    location: "Tashkent, Uzbekistan",
    highlights: [
      "Designed, developed and deployed web applications for local businesses as part of the Noventer Dev team.",
      "Built responsive, pixel-perfect interfaces from Figma designs in React and TypeScript.",
      "Developed admin dashboards with CRUD and business workflows — Zustand for client state, TanStack Query for server state.",
      "Shipped mydays.uz (landing page) and test.mydays.uz (CRM system) to production and staging.",
    ],
  },
  {
    slug: "limsa",
    company: "Limsa",
    role: "Frontend Developer Intern — Part-time",
    startDate: "2024-10",
    endDate: "2025-01",
    startLabel: "Oct 2024",
    endLabel: "Jan 2025",
    location: "Tashkent, Uzbekistan",
    highlights: [
      "Built and styled responsive web pages with React, JavaScript, Tailwind CSS, Ant Design and SCSS.",
      "Worked with senior developers on debugging and performance optimization.",
      "Contributed to propartnyor.uz and easyvisatour.uz.",
    ],
  },
];

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)"],
  },
  {
    title: "State Management",
    items: ["Redux Toolkit", "Zustand", "TanStack Query"],
  },
  {
    title: "Styling",
    items: [
      "Tailwind CSS",
      "SCSS",
      "Ant Design",
      "shadcn/ui",
      "Styled Components",
    ],
  },
  {
    title: "Tools & Practices",
    items: [
      "Git / GitHub",
      "REST API integration",
      "JWT / RBAC",
      "Storybook",
      "WebSockets",
      "ApexCharts",
    ],
  },
];

export const education = {
  institution: "Tashkent University of Information Technology",
  program: "Economy and Management in the field of Information Technology",
  period: "Sep 2022 — Present",
  courses: "Najot Ta'lim (2025) · Farobiy IT Academy (2023—2024)",
} as const;

export const languages: readonly string[] = [
  "Uzbek — Native",
  "English — Upper-Intermediate",
];

export const contactLinks: readonly ContactLink[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    copyable: true,
  },
  {
    label: "Telegram",
    value: "@junior_dilmurodov",
    href: profile.telegram,
    external: true,
  },
  {
    label: "GitHub",
    value: "JuniorDilmurodov9979",
    href: profile.github,
    external: true,
  },
];
