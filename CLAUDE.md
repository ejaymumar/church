# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current State — Two Realities, Don't Conflate Them

1. **What's in the repo today:** a **Figma Make design export** — a Vite + React 18 + TypeScript
   **front-end prototype only**. Every page renders **hardcoded mock data** (see the `const`
   arrays at the top of [src/app/components/AdminDashboard.tsx](src/app/components/AdminDashboard.tsx)).
   There is **no backend, no database, no API, no auth, no data fetching** — it exists to
   demonstrate the UI/UX, not to run as the real product.

2. **What the project is meant to become:** the system described in
   **[docs/PRD.md](docs/PRD.md)** — the single, canonical, authoritative spec. It defines a
   Next.js + Prisma + PostgreSQL full-stack app with a different architecture from the prototype.
   Read it before implementing any real feature; it defines the database schema, roles, feature
   phasing, and infrastructure. The PRD is a **living document versioned via Git history** — there
   are no longer version-numbered copies (`PRD_v1.x.md`); edit `PRD.md` in place and let commits
   track the revisions.

**Branching strategy:** the React + Vite prototype is a **POC for a presentation** and lives on the
**main line**. The real product is built by **migrating to the PRD's Next.js stack on a separate
branch** — not by extending this Figma export. So:

- Work on the **main line** = iterate on the prototype (styling, layout, mock interactions) in the
  Vite/React SPA documented below.
- Work on the **Next.js migration branch** = build the real app per the PRD.
- **Don't silently mix the two** (e.g. don't add Prisma to the prototype, and don't assume the
  prototype's `useState` navigation carries over to the real app).

## Project: Church Website & Member Management System

A self-hosted church website plus an integrated member-management database. Two surfaces:
a **public site** (homepage, services, sermons, giving, prayer, visitor form) and an
**admin dashboard / member portal** (member CRUD, giving entry, attendance, visitor inbox).

## Working in the Current Prototype (Vite + React SPA)

**Commands** (npm; a `package-lock.json` is present and gitignored):
- `npm i` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — production build via `vite build`

There is **no lint, test, or typecheck script** and no test framework wired up — don't assume
`npm test` exists.

**Entry & navigation:**
- [src/main.tsx](src/main.tsx) mounts [src/app/App.tsx](src/app/App.tsx) into `#root`
  (see [index.html](index.html)).
- Routing is **client-side page switching via a single `useState<Page>` in `App.tsx`** — a
  `switch` renders one page component at a time. **`react-router` is a dependency but is NOT
  used** for app navigation; don't reach for it when adding a "page." Add a new page by extending
  the `Page` union + the switch in `App.tsx` and a nav link in
  [src/app/components/Navbar.tsx](src/app/components/Navbar.tsx).
- The `Navbar` is hidden when `page === "admin"` so the admin dashboard renders full-screen.

**Structure:**
- One component per public page in [src/app/components/](src/app/components/)
  (`HomePage`, `AboutPage`, `ServicesPage`, `EventsPage`, `SermonsPage`, `GivingPage`,
  `PrayerPage`, `ContactPage`, `VisitorFormPage`) plus `AdminDashboard`.
- [src/app/components/ui/](src/app/components/ui/) is the **shadcn/ui** primitive set (Radix-based).
  Compose class names with the `cn()` helper from
  [src/app/components/ui/utils.ts](src/app/components/ui/utils.ts) (`clsx` + `tailwind-merge`).
- [src/app/components/figma/ImageWithFallback.tsx](src/app/components/figma/ImageWithFallback.tsx)
  is Figma-generated — leave it for Figma asset handling.

**Styling (Tailwind CSS v4):**
- Tailwind runs through the **`@tailwindcss/vite`** plugin — there is **no `tailwind.config.js`**
  and `postcss.config.mjs` is intentionally empty (the plugin sets up PostCSS itself).
- CSS entry is [src/styles/index.css](src/styles/index.css), which imports `fonts.css`,
  `tailwind.css`, `theme.css`, and `effects.css`. **Design tokens live in
  [src/styles/theme.css](src/styles/theme.css)** as CSS variables exposed to Tailwind via
  `@theme inline` — change colors/radii/fonts there, not via a config file. Fonts: **Crimson Pro**
  (`--font-display`) / **DM Sans** (`--font-body`). A `.dark` variant is defined but no theme toggle
  is wired up.
- **Brand palette (recolored to the ECC logo on `dev1`):** `--primary` deep navy `#1e3a5f` is the
  structural anchor (navbar/footer/sidebar); `--accent` is **teal `#0e7c86`** (the dominant highlight
  used across the app); `--pop` is **orange `#ef7d1a`** (reserved for conversion CTAs only); `--tertiary`
  is **green `#6ba539`**. Background is cool off-white `#f4fbfb`. Since the app is ~100% token-driven,
  editing these vars recolors everything. (The original Figma export was navy + gold `#c9933a` + warm
  cream — now superseded.)
- **[src/styles/effects.css](src/styles/effects.css)** holds reusable design utilities: `.arch`/`.arch-sm`
  (logo-derived arch motif), `.grain`, `.mesh-navy` (navy + teal radial glow), `.cross-pattern`. Decorative
  `::before`/`::after` layers sit at `z-index:-1` inside an isolated stacking context — **do not** force
  `position`/`z-index` on their children (an earlier `.grain > *` rule broke absolutely-positioned image
  overlays). A `prefers-reduced-motion` guard is included.
- **Motion**: animations use the **`motion`** (Framer Motion) dep via small shared primitives in
  [src/app/components/motion/](src/app/components/motion/) — `Reveal` (scroll-in fade/slide + `staggerContainer`/`staggerItem`)
  and `CountUp`. Wrap a page root in `<MotionConfig reducedMotion="user">`. [HomePage.tsx](src/app/components/HomePage.tsx)
  is the reference for the full "style kit"; the same kit is applied to all public pages.
- **Images**: external image hosts (e.g. Unsplash) are **blocked in this environment** — remote `<img>`
  src URLs silently fail. Use **local files in [public/images/](public/images/)** (served from `/`,
  e.g. `/images/hero.jpg`). To add more, download with `curl -L --ssl-no-revoke -o public/images/NAME.jpg "https://picsum.photos/seed/SEED/W/H"`.
  Current placeholders are generic picsum photos — swap for real church photos using the same filenames.
- **Logo**: [public/ecc_logo.png](public/ecc_logo.png) is the transparent, cropped mark (favicon +
  navbar); [scripts/make_logo_transparent.py](scripts/make_logo_transparent.py) regenerates it (white→alpha + autocrop).

**Vite quirks (from [vite.config.ts](vite.config.ts)):**
- `@` is aliased to `src/`.
- A custom `figma-asset-resolver` maps `figma:asset/...` imports to `src/assets/`.
- Per the file's own comments: **do not remove the `react()` or `tailwindcss()` plugins**, and
  **never add `.css`, `.ts`, or `.tsx` to `assetsInclude`**.

[guidelines/Guidelines.md](guidelines/Guidelines.md) is an unfilled Figma template (all commented
out) — no active rules there yet.

## Target Tech Stack (per PRD §6.2 — for the real build, NOT the current prototype)

- **Next.js 14 (App Router)** — frontend + API routes (no separate backend service)
- **Tailwind CSS + shadcn/ui** — styling and components
- **PostgreSQL 16** accessed via **Prisma** (type-safe queries + migrations)
- **NextAuth.js / Auth.js v5** — role-based auth with bcrypt password hashing
- **MinIO** (S3-compatible) — sermon media and profile photo storage
- **n8n** (self-hosted) — visitor-form webhook automation
- **Postal** — transactional email; **PayMongo or Stripe** — online giving
- Deployed via **Docker Compose** on a local Ubuntu server, exposed through a **Cloudflare Tunnel**
  behind an **Nginx** reverse proxy

There is no choice yet between **PayMongo** (Philippine-local; GCash, Maya, GrabPay, cards) and
**Stripe** (open question in PRD §9.1) — confirm before implementing the giving gateway.

## Architecture Notes That Aren't Obvious From a Single File

- **`services` is a recurrence *template* table, not occurrences.** Each row is a service *pattern*
  (e.g. "Sunday Main Service" with `recurrence_pattern = WEEKLY:SUNDAY`). Dated occurrences are
  generated at the **application layer** from these templates — do not create one DB row per week.
  Special one-off services use `service_type = 'Special'` + `special_date` instead of a recurrence rule.
- **`visitors` and `members` are deliberately separate tables.** Visitors are captured via the public
  form; an admin later *promotes* a visitor to a member (sets `converted_to_member`, links `member_id`).
  Don't merge them.
- **`users` vs `members`:** `members` holds people/contact data; `users` holds login credentials and the
  system `role` (`super_admin` | `pastor` | `member`). A user may link to a member (`member_id`) or be a
  standalone admin account.
- **Visitor form flow (PRD §4.2):** on submit, the app both `INSERT`s into the `visitors` table *and*
  POSTs a JSON payload to an **n8n webhook**. The webhook URL must be an environment variable
  (configurable without code changes). The form itself is public — no auth.
- **`giving_records` is manual admin entry** (cash/EFT from the physical tithe box), entirely separate
  from the online-giving payment gateway. Don't conflate the two.
- Several `members` foreign keys exist on `services` (`speaker_id`, `worship_leader_id`, `song_leader_id`,
  `closing_prayer_id`) — a single member can fill multiple service roles.

## Feature Phasing (PRD §7)

Build in phases — don't pull Phase 2/3 work forward unless asked:
- **Phase 1:** landing page, mission/vision, service schedule (+ admin CRUD), contact, member DB,
  admin dashboard, auth & roles, visitor registration form + webhook.
- **Phase 2:** events/calendar, sermon library, MinIO media, prayer requests, online giving,
  member self-service portal, giving-records admin page, visitor admin inbox.
- **Phase 3:** attendance tracking, giving reports/exports, full service calendar, Postal email,
  perf/accessibility/backup hardening, go-live.

## Conventions Implied by the Spec

- The church is in the **Philippines**: default currency **PHP (₱)**, timezone **Asia/Manila (UTC+8)**,
  `+63` phone formats. Compliance targets are the **Data Privacy Act of 2012 (RA 10173)** (overseen by
  the **NPC**) and **WCAG 2.1 AA** — not POPIA/GDPR.
- All primary keys are `UUID` (`gen_random_uuid()`); timestamps are `TIMESTAMPTZ`; soft-deletes use
  `is_active` boolean flags rather than row deletion.
- Match the schema's enum value casing exactly when defining Prisma enums / TS types
  (e.g. `'First Time'`, `'Building Fund'`, `'super_admin'`).
