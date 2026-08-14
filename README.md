# jasur.dev

Personal portfolio — single page, minimalist, paper-white palette with a girih-inspired
line pattern behind the hero name.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 — tokens live in `app/globals.css` |
| Motion | `motion` (Framer Motion 13) |
| Smooth scroll | `lenis` |
| Deploy | Vercel, zero config |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

> Port 3000 on this machine is currently occupied by another (Python) server on IPv4.
> If `localhost:3000` shows a stale page, run `npm run dev -- -p 3100`.

## Where things live

```
app/
  layout.tsx            fonts, metadata, skip link, providers, analytics
  page.tsx              section composition + Work section + footer + JSON-LD
  globals.css           design tokens (@theme), base styles, caret animation
  not-found.tsx         on-brand 404
  opengraph-image.tsx   generated 1200×630 social card
  icon.tsx              generated favicon
  sitemap.ts robots.ts  generated at /sitemap.xml and /robots.txt
components/
  Nav.tsx               sticky nav, active-section indicator, Lenis scrollTo
  Hero.tsx              staggered entrance
  GirihPattern.tsx      tiled SVG lattice + cursor parallax
  About.tsx  Experience.tsx  Skills.tsx  Contact.tsx
  ProjectCard.tsx       hover lift + accent border overlay
  Reveal.tsx            scroll-into-view wrapper (keeps sections server components)
  SectionHeading.tsx    shared eyebrow + heading
  SmoothScroll.tsx      Lenis + MotionConfig provider
hooks/useMediaQuery.ts
data.ts                 all copy: profile, projects, experience, skills, contact
types/index.ts          Project, ExperienceItem, SkillGroup, NavLink, ContactLink
```

## Editing content

Everything visible on the page comes from `data.ts`. No copy is hardcoded in JSX.

### Project previews and access

Each project carries two fields that drive the card:

- `access: "live" | "login" | "internal"` — anything other than `live` renders a
  label so a visitor knows before clicking that they will hit a wall.
- `image: string | null` — a path under `public/work/`. When it is `null` the card
  renders a same-sized placeholder panel instead, so rows stay aligned.

Current state: `tanlov` and `kuprikqurilish` have screenshots. AI Legal Bridge and the
Internal ERP do not — both are behind authentication. To add them, take a screenshot
while logged in, save it to `public/work/<slug>.jpg` (roughly 16:10, ~1300px wide) and
set the `image` field.

## Changing the palette

All colours are CSS variables in the `@theme` block of `app/globals.css`:

```css
--color-accent: #146b6b;   /* deep turquoise */
```

Swapping that one line changes the accent everywhere (nav underline, buttons, card
hover border, girih pattern, favicon is separate — see `app/icon.tsx`).
The sage alternative is `#4a6b4a`.

## Before deploying

1. Add the CV as `public/jasur-dilmurodov-cv.pdf` — the "Download CV" button points there.
2. Set the real domain in `data.ts` (`siteUrl`) — metadata, OG, sitemap, robots and the
   JSON-LD `Person` schema all read from it.
3. Push to GitHub, import the repo in Vercel, deploy. No build settings to change.
4. Enable Web Analytics in the Vercel project — `@vercel/analytics` is already wired up
   and is a no-op until it is turned on.

## Accessibility & motion

- Skip-to-content link, visible focus ring on the accent colour, `aria-current` on the
  active nav link.
- `prefers-reduced-motion` disables Lenis entirely, drops the reveal/entrance transforms
  (`MotionConfig reducedMotion="user"`), stops the terminal caret, and disables the
  cursor parallax.
- The girih parallax is also skipped on touch devices (`pointer: fine` only).
- `color-scheme: light` opts out of Chrome's auto-darkening, which would otherwise
  repaint the whole palette.
