# Evangelical Community Church — Website & Member Management

A church website and member-management system for **Evangelical Community Church (ECC)** in
**Minglanilla, Cebu, Philippines**. It has two surfaces:

- a **public site** — homepage, about, services, events, sermons, giving, prayer, contact, and a
  visitor registration form; and
- an **admin dashboard** — member directory, visitor inbox, attendance, and giving overview.

> [!IMPORTANT]
> **What this repo currently is:** a **React + Vite front-end prototype (POC)** exported from
> Figma Make, used for presentations and design iteration. Every page renders **hardcoded mock
> data** — there is no backend, database, authentication, or API yet.
>
> **What it's meant to become:** the full-stack **Next.js + Prisma + PostgreSQL** application
> specified in [`docs/PRD.md`](docs/PRD.md). That product is built by migrating to the planned
> stack on a separate branch — not by extending this prototype. See [`CLAUDE.md`](CLAUDE.md).

---

## Tech stack

| Area | Tooling |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite` — no `tailwind.config.js`) |
| UI primitives | shadcn/ui (Radix UI) |
| Icons | lucide-react |
| Forms | react-hook-form |
| Charts | Recharts |
| Fonts | Crimson Pro (display) + DM Sans (body) |

---

## Getting started

**Prerequisites:** Node.js 20 LTS (or any version Vite 6 supports, 18+) and npm.

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server (prints a local URL)
npm run build    # production build into dist/ (note: vite build, not type-checked)
```

There is **no lint or test script** configured, and no test framework is wired up.

---

## Deployment

Once built, the app is a **static single-page app** (`npm run build` → `dist/`), so it can be served
by any static host or container. Two supported paths:

### Option A — Docker Compose (recommended)

Files: [`Dockerfile`](Dockerfile) (multi-stage: `client-dev` / `client-build` / `client-prod`) and
[`compose.yaml`](compose.yaml).

**Dev / preview** — runs the Vite dev server with live file-sync:

```bash
docker compose up --build        # build image + start → http://localhost:5173
docker compose watch             # same, syncing ./src into the container for HMR
docker compose down              # stop and remove
```

The dev server binds `0.0.0.0:5173` (set in `vite.config.ts`), and Compose maps `5173:5173`.

**Production (static, nginx)** — build and run the `client-prod` stage, which serves the compiled
`dist/` with nginx:

```bash
docker build --target client-prod -t ecc-church-web:prod .
docker run -d -p 8080:80 --restart=always ecc-church-web:prod   # → http://localhost:8080
```

Behind a reverse proxy / tunnel (per the PRD's Cloudflare Tunnel + Nginx setup), point the proxy at
the container port. `server.allowedHosts` in `vite.config.ts` only matters when exposing the *dev*
server through a domain — the nginx production image doesn't use it.

Notes:
- `node_modules` is **not** copied into the image (see [`.dockerignore`](.dockerignore)); `npm install`
  runs inside the Linux container so native binaries match the platform.
- `package-lock.json` is gitignored, so the Dockerfile copies it optionally.

### Option B — Manual deployment (static hosting)

Build the bundle and serve the `dist/` directory with any web server or static host (Nginx, Caddy,
Apache, Netlify, Vercel, S3 + CloudFront, …):

```bash
npm install      # or: npm ci, if package-lock.json is present
npm run build    # outputs static assets to dist/
npx vite preview --host --port 5173   # optional: preview the production build locally
```

Example Nginx config (copy `dist/` to the web root):

```nginx
server {
  listen 80;
  server_name your-domain;
  root /var/www/ecc/dist;
  location / {
    try_files $uri $uri/ /index.html;   # SPA fallback
  }
}
```

> Navigation is entirely in-app (the URL never changes — see [Routing](#routing)), so there are no
> server routes to configure. The `try_files` fallback is included as good practice and future-proofing.

---

## Project structure

```
church/
├─ index.html                  # Vite entry; mounts #root
├─ vite.config.ts              # @ → src alias, figma:asset resolver, plugins, dev server (host/port)
├─ Dockerfile                  # multi-stage: client-dev / client-build / client-prod (nginx)
├─ compose.yaml                # Docker Compose service (dev, with file-sync watch)
├─ .dockerignore
├─ src/
│  ├─ main.tsx                 # React root, imports styles/index.css
│  ├─ app/
│  │  ├─ App.tsx               # page switching (see "Routing" below)
│  │  └─ components/
│  │     ├─ Navbar.tsx
│  │     ├─ HomePage.tsx  AboutPage.tsx  ServicesPage.tsx  EventsPage.tsx
│  │     ├─ SermonsPage.tsx  GivingPage.tsx  PrayerPage.tsx  ContactPage.tsx
│  │     ├─ VisitorFormPage.tsx
│  │     ├─ AdminDashboard.tsx
│  │     ├─ ui/                # shadcn/ui primitives + cn() helper (utils.ts)
│  │     └─ figma/             # Figma-generated helpers (ImageWithFallback)
│  └─ styles/
│     ├─ index.css             # imports fonts + tailwind + theme
│     ├─ theme.css             # design tokens (colours, radius, fonts) via @theme inline
│     └─ fonts.css             # Google Fonts import
├─ docs/                       # PRD.md (spec) + DESIGN.md (design system)
└─ guidelines/                 # Figma guidelines template (unfilled)
```

## Routing

Navigation is **client-side page switching**: a single `useState<Page>` in
[`src/app/App.tsx`](src/app/App.tsx) drives a `switch` that renders one page component at a time.
**`react-router` is a dependency but is not used** for app navigation. To add a page, extend the
`Page` union + switch in `App.tsx` and add a link in
[`Navbar.tsx`](src/app/components/Navbar.tsx). The navbar is hidden on the admin page so the
dashboard renders full-screen.

## Styling & design

Tailwind v4 runs through the Vite plugin — **there is no `tailwind.config.js`**, and
`postcss.config.mjs` is intentionally empty. All design tokens (colours, radius, fonts) live in
[`src/styles/theme.css`](src/styles/theme.css). The brand is deep navy (`#1e3a5f`) + gold
(`#c9933a`) on a warm cream background, with Crimson Pro headings and DM Sans body text.

See **[`docs/DESIGN.md`](docs/DESIGN.md)** for the full design system (palette, typography,
component patterns).

---

## Documentation

- [`docs/PRD.md`](docs/PRD.md) — product requirements: features, database schema, roles, phasing,
  and the target Next.js architecture. (Single living doc, versioned via Git history.)
- [`docs/DESIGN.md`](docs/DESIGN.md) — design system / style guide.
- [`CLAUDE.md`](CLAUDE.md) — guidance for working in this repo (prototype vs. target build).
- [`ATTRIBUTIONS.md`](ATTRIBUTIONS.md) — third-party asset/license attributions.

## Localisation

Targets the Philippines: currency **PHP (₱)**, timezone **Asia/Manila (UTC+8)**, `+63` phone
formats, and compliance with the **Data Privacy Act of 2012 (RA 10173)**.

## Roadmap (per the PRD)

1. **Phase 1** — landing, services schedule, member DB + admin, auth & roles, visitor form + webhook.
2. **Phase 2** — events, sermon library, prayer requests, online giving, member portal, visitor inbox.
3. **Phase 3** — attendance tracking, giving reports, full calendar, email, hardening & go-live.
