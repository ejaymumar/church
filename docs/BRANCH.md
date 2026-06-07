# BRANCH.md — Branch Tracking & Feature Log

This document tracks **what each branch is for** and **what features are being built on it**.
The repo intentionally holds two very different realities (see [CLAUDE.md](../CLAUDE.md) and
[PRD.md](./PRD.md)); this file is the map so the two are never conflated.

> **Convention:** When you start meaningful work on a branch, add a section below. Keep the
> branch's feature checklist current as work lands. Use `[x]` for done, `[ ]` for pending,
> `[~]` for in progress.

---

## `main` — POC / Presentation Prototype

- **Stack:** Vite + React 18 + TypeScript SPA (Figma Make export).
- **Purpose:** A front-end-only **proof of concept for a presentation**. Every page renders
  **hardcoded mock data** — there is no backend, database, API, auth, or data fetching.
- **Status:** Stable / showcase. Treat as frozen reference for the intended UI/UX.
- **Navigation:** Client-side page switching via a single `useState<Page>` in
  [App.tsx](../src/app/components/../App.tsx) — `react-router` is present but unused.
- **Rule:** Do **not** add backend concerns (Prisma, real auth, data fetching) here. Iterate on
  styling, layout, and mock interactions only.

### Features showcased (static / mock)
- [x] Public site: Home, About, Services, Events, Sermons, Giving, Prayer, Contact, Visitor Form
- [x] Admin dashboard (mock member CRUD, giving entry, attendance, visitor inbox — all static)
- [x] Brand theming (deep navy `#1e3a5f` / gold `#c9933a`, Crimson Pro + DM Sans)
- [x] Currency set to PHP (₱)

---

## `dev1` — Design Refactor + Next.js Migration  *(current)*

- **Stack now:** still the **Vite + React prototype** — the design refactor below was done *on the
  prototype* before the stack migration begins.
- **Stack target:** the **PRD's real stack** — Next.js 14 (App Router) + Tailwind + shadcn/ui +
  PostgreSQL/Prisma + Auth.js. See [PRD.md §6.2](./PRD.md).
- **Purpose:** First **rebrand + design-refactor** the prototype around the new ECC logo, then
  **migrate to Next.js** per the PRD.
- **Status:** 🚧 In progress — **Phase A (design refactor) done; Phase B (Next.js migration) not started.**
- **Base:** Branched from `main`.

### Phase A — Design refactor on the Vite prototype  ✅ *done*
- [x] Logo: transparent, cropped [public/ecc_logo.png](../public/ecc_logo.png) (+ backup + reusable
  [scripts/make_logo_transparent.py](../scripts/make_logo_transparent.py)); wired as favicon
  ([index.html](../index.html)) and navbar mark ([Navbar.tsx](../src/app/components/Navbar.tsx))
- [x] Recolor scheme to the logo — **teal `#0e7c86` accent + navy `#1e3a5f` anchor**, new **orange
  `#ef7d1a` `pop`** + **green `#6ba539` `tertiary`** tokens, cool off-white `#f4fbfb` background.
  All in [theme.css](../src/styles/theme.css) (app is ~100% token-driven, so one file recolors it)
- [x] Design-effects utilities [src/styles/effects.css](../src/styles/effects.css): `.arch`/`.arch-sm`
  (logo-derived arch motif), `.grain`, `.mesh-navy` (teal glow), `.cross-pattern`; reduced-motion guard
- [x] Motion primitives [src/app/components/motion/](../src/app/components/motion/) — `Reveal`
  (scroll-in + stagger) and `CountUp`, built on the `motion` (Framer Motion) dep
- [x] HomePage showcase: staggered hero load, scroll reveals, hover-lift cards, count-up stats,
  arch image frames, textured navy bands, orange conversion CTAs
- [x] Applied the same style kit to **all 8 public pages** (About, Services, Events, Sermons, Giving,
  Prayer, Contact, Visitor Form)
- [x] Local placeholder images in [public/images/](../public/images/) — external image hosts
  (Unsplash) are blocked in this env, so all `<img>` use local files (downloaded via picsum)
- [ ] Confetti on visitor-form submit (`canvas-confetti` is installed) — *deferred, optional*
- [ ] Admin dashboard full restyle — *charts recolored to the new palette; full motion/arch kit not applied*

### Phase B — Next.js migration  ⏳ *pending* (Phase 1 per [PRD §7](./PRD.md))
- [ ] Scaffold Next.js 14 (App Router) project
- [ ] Port Tailwind v4 theme tokens + fonts + `effects.css` into Next.js
- [ ] Re-establish shadcn/ui component library
- [ ] Migrate public pages (Home, About, Services, Contact)
- [ ] Migrate admin dashboard shell + role-based layout
- [ ] Prisma + PostgreSQL schema (members, users, services, visitors, giving_records)
- [ ] Auth.js v5 with role-based access (`super_admin` | `pastor` | `member`)
- [ ] Visitor registration form + n8n webhook (env-configurable URL)
- [ ] Member DB CRUD
- [ ] Service schedule (recurrence templates) + admin CRUD

### Notes / decisions
- **Palette call:** teal assigned to `--accent` (highest-frequency highlight token), not orange —
  teal is the logo's dominant color; orange (`--pop`) reserved for conversion CTAs only.
- **Images:** remote hosts unreachable in this environment; placeholders are random picsum photos —
  swap for real church photos by dropping files into `public/images/` with the same names.
- _(record Next.js migration decisions and open questions here as Phase B proceeds)_

---

## Branch index

| Branch | Stack | Purpose | Status |
| ------ | ----- | ------- | ------ |
| `main` | Vite + React (SPA) | Static POC for presentation | Stable |
| `dev1` | Next.js 14 (migration) | Design refactor + Next.js migration | 🚧 In progress |
