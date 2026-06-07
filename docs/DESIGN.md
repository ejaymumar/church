# Design System — Evangelical Community Church

The visual language for the ECC website and member portal. It documents the theme, colour
scheme, typography, and the recurring UI patterns used across the app so that new screens stay
visually consistent.

> **Source of truth:** the tokens below live in [`src/styles/theme.css`](../src/styles/theme.css)
> (exposed to Tailwind via `@theme inline`) and the web fonts in
> [`src/styles/fonts.css`](../src/styles/fonts.css). Change a colour or font **there** — there is
> no `tailwind.config.js`. Everything in this document reflects those files.

---

## 1. Brand & Mood

A **traditional-yet-modern church** feel: warm and welcoming, but clean and trustworthy.

- **Cream background** → warmth, approachability (not stark white).
- **Deep navy** → stability, trust, reverence.
- **Gold accent** → the sacred, the celebratory, the "premium" highlight.
- A **serif display font** (Crimson Pro) carries tradition and scripture; a **clean sans**
  (DM Sans) keeps body text modern and legible.

---

## 2. Colour Scheme

All colours are CSS variables on `:root` and surfaced as Tailwind utilities
(`bg-primary`, `text-accent`, `border-border`, …).

### Core palette (light theme)

| Token | Hex | Tailwind | Role |
|---|---|---|---|
| `--background` | `#faf8f5` | `bg-background` | Page background (warm cream) |
| `--foreground` | `#1a1a2e` | `text-foreground` | Default text (near-black navy) |
| `--primary` | `#1e3a5f` | `bg-primary` | Deep navy — headers, hero, primary buttons, nav |
| `--primary-foreground` | `#ffffff` | `text-primary-foreground` | Text on navy |
| `--accent` | `#c9933a` | `bg-accent` / `text-accent` | **Gold** — CTAs, eyebrows, icons, active states |
| `--accent-foreground` | `#ffffff` | — | Text on gold |
| `--secondary` | `#f0ece6` | `bg-secondary` | Warm beige — alternating section backgrounds |
| `--secondary-foreground` | `#1a1a2e` | — | Text on beige |
| `--muted` | `#e8e3db` | `bg-muted` | Subtle fills, map/placeholder blocks |
| `--muted-foreground` | `#6b6455` | `text-muted-foreground` | Secondary / supporting text |
| `--card` | `#ffffff` | `bg-card` | Card surfaces |
| `--card-foreground` | `#1a1a2e` | — | Text on cards |
| `--popover` | `#ffffff` | `bg-popover` | Dropdowns, popovers |
| `--destructive` | `#c0392b` | `bg-destructive` | Errors, validation, destructive actions |
| `--border` | `rgba(30,58,95,0.12)` | `border-border` | Hairline borders (navy at 12%) |
| `--input-background` | `#f5f1eb` | `bg-input-background` | Form field fill |
| `--ring` | `#c9933a` | `ring-ring` | Focus ring (gold) |

### Sidebar / admin palette

The admin dashboard uses a dark navy sidebar with gold highlights:

| Token | Hex | Role |
|---|---|---|
| `--sidebar` | `#1e3a5f` | Sidebar background |
| `--sidebar-foreground` | `#ffffff` | Sidebar text |
| `--sidebar-primary` | `#c9933a` | Active item / highlight |
| `--sidebar-accent` | `#16304f` | Hover row |
| `--sidebar-accent-foreground` | `#e8d5b0` | Hover text (soft gold) |
| `--sidebar-border` | `rgba(255,255,255,0.1)` | Dividers |

### Chart palette

Used by Recharts in the admin dashboard (`--chart-1` … `--chart-5`):

`#c9933a` (gold) · `#1e3a5f` (navy) · `#4a7a9b` (slate blue) · `#e8c56a` (light gold) · `#6b9e8a` (sage)

### Usage rules

- **One gold per view.** Gold (`accent`) is the attention colour — use it for the single most
  important action and small highlights (eyebrows, icons, active nav). Overusing it kills the effect.
- **Navy is the workhorse** for emphasis surfaces (hero, primary buttons, nav, sidebar).
- **Alternate section backgrounds** (cream → beige → cream) to create rhythm down a long page.
- **Borders are subtle by design** (navy at 12% opacity). Don't reach for darker borders;
  prefer `hover:border-accent/30` to indicate interactivity.

### Dark mode

`.dark` tokens exist in `theme.css` but currently use the **generic shadcn neutral (oklch) palette**,
not the navy/gold brand — and **no theme toggle is wired up**. Treat dark mode as unfinished: if it
ships, the dark tokens should be re-mapped to branded navy/gold values.

---

## 3. Typography

Loaded from Google Fonts in [`fonts.css`](../src/styles/fonts.css).

| Token | Stack | Use |
|---|---|---|
| `--font-display` | `'Crimson Pro', Georgia, serif` | Headings, hero, pull quotes, card titles |
| `--font-body` | `'DM Sans', system-ui, sans-serif` | Body copy, labels, buttons, inputs |

- **Base size:** `--font-size: 16px` on `html`. Body uses DM Sans via `body { font-family: var(--font-body) }`.
- **Weights:** `--font-weight-normal: 400`, `--font-weight-medium: 500`. Display headings often go to
  **600** (and 700 for the drop-cap accent letter on the About page).
- **Applying the display font:** components set it inline —
  `style={{ fontFamily: "var(--font-display)" }}` — rather than via a utility class.

### Type scale

Base element sizes are set in `@layer base` (so Tailwind utilities still override them):

| Element | Size | Weight |
|---|---|---|
| `h1` | `text-2xl` | medium |
| `h2` | `text-xl` | medium |
| `h3` | `text-lg` | medium |
| `h4` / `label` / `button` | `text-base` | medium |
| `input` | `text-base` | normal |

In practice, marketing pages override these with explicit display sizes, e.g.:

- **Hero heading:** `fontSize: clamp(2.5rem, 5vw, 4rem)`, weight 600, `line-height: 1.1`
- **Section heading (`h2`):** `fontSize: 2rem`, weight 600
- **Card title (`h3`):** `~1.05–1.15rem`, weight 600

---

## 4. Shape, Spacing & Elevation

- **Radius:** `--radius: 0.375rem`, with a scale: `sm` (−4px), `md` (−2px), `lg` (= radius),
  `xl` (+4px). Cards use `rounded-lg`; pills/avatars use `rounded-full`.
- **Section padding:** major sections use `py-20`; horizontal gutters are `px-6`.
- **Container widths:** `max-w-7xl` (wide grids), `max-w-4xl` (prose / history / lists),
  `max-w-lg`–`max-w-md` (forms, confirmations).
- **Elevation:** flat by default. Depth comes from borders and subtle hovers
  (`hover:shadow-md`, `hover:border-accent/30`), not heavy shadows.

---

## 5. Iconography

- **Library:** [`lucide-react`](https://lucide.dev). Standard sizes `w-4 h-4` (inline) to
  `w-6 h-6` (feature). The **`Cross`** icon is the church's logo mark.
- **Icon chip pattern:** a circular tinted background holds the icon —
  `w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center` with an
  `text-accent` icon inside. On navy surfaces use `bg-accent/20`.

---

## 6. Component Patterns

These are the repeating building blocks. Reuse them rather than inventing new ones.

### Section eyebrow + heading
A gold uppercase label with a short rule, above a serif heading:

```tsx
<div className="text-accent text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
  <div className="w-6 h-px bg-accent" /> Section Label
</div>
<h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 600 }}>
  Section Title
</h2>
```

### Card
```tsx
<div className="bg-card border border-border rounded-lg p-5 hover:border-accent/30 transition-colors">
  …
</div>
```

### Buttons
| Variant | Classes |
|---|---|
| Primary | `bg-primary text-white hover:bg-primary/90 rounded` |
| Accent / CTA | `bg-accent text-white hover:bg-accent/90 rounded` |
| Outline (on light) | `border border-accent/60 text-accent hover:bg-accent hover:text-white rounded` |
| Ghost (on navy) | `bg-white/10 text-white hover:bg-white/20 rounded` |

Standard padding: `px-4 py-1.5` (compact) to `py-3` (full-width form submit).

### Form fields
```tsx
<label className="block text-sm font-medium mb-1.5">Label <span className="text-accent">*</span></label>
<input className="w-full px-4 py-2.5 rounded bg-input-background border border-border text-sm
  focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all" />
```
Error state swaps the border to `border-destructive` and shows `text-xs text-destructive mt-1`.

### Pill / badge
```tsx
<span className="text-xs uppercase tracking-wider text-accent bg-accent/10 rounded-full px-3 py-1">
  Label
</span>
```

### Hero
`bg-primary` section, background photo at `opacity-20` (`object-cover`, absolutely positioned),
centred content with a gold eyebrow and a large `clamp()` display heading in white.

### Navbar
`sticky top-0 z-50 bg-primary/95 backdrop-blur-sm`, white links with `text-accent` + `bg-white/10`
for the active page. Hidden on the admin route so the dashboard renders full-screen.

### List rows (directories / groups)
`divide-y divide-border` inside a bordered, `rounded-lg overflow-hidden` container; each row is
`bg-card hover:bg-secondary/30`.

---

## 7. shadcn/ui

Reusable primitives live in [`src/app/components/ui/`](../src/app/components/ui/) (Radix-based
shadcn/ui). They already consume the tokens above, so they inherit the theme automatically.
Compose class names with the `cn()` helper (`clsx` + `tailwind-merge`) from
[`ui/utils.ts`](../src/app/components/ui/utils.ts). Prefer these primitives over hand-rolling
dialogs, dropdowns, tabs, etc.

---

## 8. Imagery & Data Visualisation

- **Photography:** warm, candid, community-focused (congregation, hands, gathering). Hero images
  sit under a navy wash at low opacity so white text stays legible.
- **Charts:** Recharts, coloured from the `--chart-*` palette (gold + navy lead). Keep charts
  minimal — no heavy gridlines — to match the flat aesthetic.

---

## 9. Localisation Notes (affects display)

- Currency is **PHP (₱)**; amounts in the admin dashboard are Philippine Peso.
- Dates/times are presented in **Asia/Manila (UTC+8)**.
- Phone numbers use Philippine formats (`+63 …`).

See [`PRD.md`](PRD.md) for the full product spec and [`../CLAUDE.md`](../CLAUDE.md) for how the
prototype relates to the planned Next.js build.
