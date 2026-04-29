# Current Feature

Dashboard UI — Phase 3

## Status

In Progress

## Goals

- Main area to the right of the sidebar
- 4 stats cards at the top (total items, collections, favorite items, favorite collections)
- Recent collections section
- Pinned items section
- 10 recent items section
- Use mock data from `@src/lib/mock-data.ts` (import directly)

## Notes

- Reference screenshot: `@context/screenshots/dashboard-ui-main.png`
- Stats cards are not in the screenshot — add them at the top of the main area
- Phase 1 and 2 specs in `@context/features/`

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
