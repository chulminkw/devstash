# Current Feature

Prisma + Neon PostgreSQL Setup

## Status

In Progress

## Goals

- Install and configure Prisma 7 (has breaking changes — read upgrade guide before implementing)
- Set up Neon PostgreSQL (serverless) as the database
- Create initial schema based on data models in `@context/project-overview.md`
- Include NextAuth required models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Always create migrations (`prisma migrate dev`), never push directly to the database

## Notes

- Prisma 7 upgrade guide: https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7
- Prisma quickstart: https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- `DATABASE_URL` = Neon development branch connection string
- Production will use a separate Neon branch
- Full spec: `@context/features/database-spec.md`

## History

<!-- Keep this updated. Earliest to latest -->

### 2026-04-28 — Initial Next.js Setup
- Bootstrapped project with Create Next App (Next.js 16.2.4, React 19, TypeScript, Tailwind CSS v4)
- Added CLAUDE.md, AGENTS.md, and context documentation files
- Cleaned up default boilerplate (removed demo SVGs, reset page.tsx, stripped default globals.css)
- Committed to `master` and remote set to `git@github.com:chulminkw/devstash.git`

### 2026-04-28 — Dashboard UI Phase 1
- Initialized ShadCN UI (Tailwind v4 compatible), added Button and Input components
- Enabled dark mode by default via `dark` class on `<html>`
- Created `/dashboard` route with layout and page
- Implemented top bar with DevStash logo, search input (display only), "New Collection" and "+ New Item" buttons
- Added sidebar and main area placeholders

### 2026-04-28 — Dashboard UI Phase 2
- Added collapsible sidebar (desktop: icon-only at w-12, expanded at w-56)
- Item types list with Lucide icons and counts, each linking to `/items/[slug]`
- Favorite collections (yellow star) and all collections (folder icon + count) in sidebar
- User avatar area at the bottom with name, email, and settings icon
- `PanelLeft` toggle button in topbar controls sidebar open/close
- Mobile: sidebar always renders as a ShadCN Sheet drawer
- Fixed ShadCN dark mode bug: changed `@custom-variant dark (&:is(.dark *))` to `(&:where(.dark, .dark *))` so `html.dark` activates dark CSS variables correctly

### 2026-04-28 — Dashboard UI Phase 3
- Added stats cards (total items, collections, favorite items, favorite collections)
- Collections grid with CollectionCard component (name, item count, description, type icons)
- Pinned items and recent items sections with ItemCard component
- Refactored page.tsx into a server component; extracted interactive topbar + sidebar into DashboardShell client component
