# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current State

This is a **greenfield project — no application code exists yet.** The repository currently
contains only product requirements documents under [docs/](docs/). The canonical, authoritative
spec is **[docs/PRD_v1.4.md](docs/PRD_v1.4.md)** (highest version wins; v1.1–v1.3 are superseded
history). Read it before implementing any feature — it defines the full database schema, roles,
feature phasing, and architecture.

When scaffolding the project, follow the tech stack and conventions below rather than inventing
new ones, since downstream features in the PRD assume them.

## Project: Church Website & Member Management System

A self-hosted church website plus an integrated member-management database. Two surfaces:
a **public site** (homepage, services, sermons, giving, prayer, visitor form) and an
**admin dashboard / member portal** (member CRUD, giving entry, attendance, visitor inbox).

## Planned Tech Stack (per PRD §6.2)

- **Next.js 14 (App Router)** — frontend + API routes (no separate backend service)
- **Tailwind CSS + shadcn/ui** — styling and components
- **PostgreSQL 16** accessed via **Prisma** (type-safe queries + migrations)
- **NextAuth.js / Auth.js v5** — role-based auth with bcrypt password hashing
- **MinIO** (S3-compatible) — sermon media and profile photo storage
- **n8n** (self-hosted) — visitor-form webhook automation
- **Postal** — transactional email; **PayStack or Stripe** — online giving
- Deployed via **Docker Compose** on a local Ubuntu server, exposed through a **Cloudflare Tunnel**
  behind an **Nginx** reverse proxy

There is no choice yet between PayStack and Stripe (open question in PRD §9.1) — confirm before
implementing the giving gateway.

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

- Default currency is **PHP**; project targets **POPIA/GDPR** compliance and **WCAG 2.1 AA**.
- All primary keys are `UUID` (`gen_random_uuid()`); timestamps are `TIMESTAMPTZ`; soft-deletes use
  `is_active` boolean flags rather than row deletion.
- Match the schema's enum value casing exactly when defining Prisma enums / TS types
  (e.g. `'First Time'`, `'Building Fund'`, `'super_admin'`).
