# Current Feature

Dashboard Items — Real Data

## Status

In Progress

## Goals

- Create `src/lib/db/items.ts` with data fetching functions
- Fetch pinned and recent items directly in the dashboard server component (replace mock data)
- Item card icon and border color derived from the item type
- Display item type, tags, and all other existing card fields
- If there are no pinned items, the Pinned section should not render
- Keep the current design and layout

## Notes

- Reference screenshot: `@context/screenshots/dashboard-ui-main.png`
- Full spec: `@context/features/dashboard-items-spec.md`

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

### 2026-04-29 — Prisma 7 + Neon PostgreSQL Setup
- Installed Prisma 7 with `@prisma/adapter-pg` driver adapter
- Created `prisma/schema.prisma` with full data model (NextAuth + app models)
- Added `prisma.config.ts` (datasource URL lives here, not in schema — Prisma 7 change)
- Created `src/lib/prisma.ts` global singleton using `PrismaPg` adapter
- Ran initial migration (`20260429021423_init`) against Neon dev branch
- Added `scripts/test-db.ts` to verify connection

### 2026-04-29 — Seed Sample Data
- Installed bcryptjs and tsx
- Created `prisma/seed.ts` with demo user, 7 system item types, and 18 items across 5 collections
- Registered seed in `prisma.config.ts` (`migrations.seed`)
- Updated `scripts/test-db.ts` to display all seeded data for verification

### 2026-04-29 — Dashboard Collections — Real Data
- Created `src/lib/db/collections.ts` with `getCollections()` and `getDashboardStats()` functions
- Replaced mock collections with real Prisma queries in the dashboard server component
- Collection card border color derived from most-used item type color
- Type icons shown with their color, computed from actual items in each collection
- Stats cards now reflect real DB counts
