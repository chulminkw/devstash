# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types.

## Context Files

Read the following to get the full context of the project

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # ESLint (v9, flat config)
```

No test runner is configured.

## Stack

- **Next.js 16.2.4** with App Router — see AGENTS.md warning
- **React 19.2.4**
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `globals.css`, no `tailwind.config.*` file
- **TypeScript 5**

## Architecture

All source lives under `src/app/` using the App Router convention:

- `layout.tsx` — root layout; loads Geist/Geist Mono fonts via `next/font/google` and applies them as CSS variables
- `page.tsx` — index route (`/`)
- `globals.css` — single Tailwind v4 import; add global styles here

`next.config.ts` is empty — no custom config yet.
