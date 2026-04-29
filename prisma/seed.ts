import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...\n");

  // Clear existing data (reverse dependency order)
  await prisma.itemTag.deleteMany();
  await prisma.item.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.itemType.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  console.log("✓ Cleared existing data");

  // ─── User ────────────────────────────────────────────────────────────────
  const user = await prisma.user.create({
    data: {
      email: "demo@devstash.io",
      name: "Demo User",
      password: await bcrypt.hash("12345678", 12),
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`✓ Created user: ${user.email}`);

  // ─── System Item Types ────────────────────────────────────────────────────
  const [snippet, prompt, command, , , , link] = await Promise.all([
    prisma.itemType.create({ data: { name: "Snippet", icon: "Code",       color: "#3b82f6", isSystem: true } }),
    prisma.itemType.create({ data: { name: "Prompt",  icon: "Sparkles",   color: "#8b5cf6", isSystem: true } }),
    prisma.itemType.create({ data: { name: "Command", icon: "Terminal",   color: "#f97316", isSystem: true } }),
    prisma.itemType.create({ data: { name: "Note",    icon: "StickyNote", color: "#fde047", isSystem: true } }),
    prisma.itemType.create({ data: { name: "File",    icon: "File",       color: "#6b7280", isSystem: true } }),
    prisma.itemType.create({ data: { name: "Image",   icon: "Image",      color: "#ec4899", isSystem: true } }),
    prisma.itemType.create({ data: { name: "Link",    icon: "Link",       color: "#10b981", isSystem: true } }),
  ]);
  console.log("✓ Created 7 system item types");

  // ─── React Patterns ───────────────────────────────────────────────────────
  const reactPatterns = await prisma.collection.create({
    data: { name: "React Patterns", description: "Reusable React patterns and hooks", userId: user.id },
  });

  await prisma.item.createMany({
    data: [
      {
        title: "useDebounce Hook",
        contentType: "text",
        language: "typescript",
        typeId: snippet.id,
        collectionId: reactPatterns.id,
        userId: user.id,
        isPinned: true,
        content: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
      },
      {
        title: "Context Provider Pattern",
        contentType: "text",
        language: "typescript",
        typeId: snippet.id,
        collectionId: reactPatterns.id,
        userId: user.id,
        content: `import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === "dark" ? "light" : "dark") }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}`,
      },
      {
        title: "Utility Functions",
        contentType: "text",
        language: "typescript",
        typeId: snippet.id,
        collectionId: reactPatterns.id,
        userId: user.id,
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" })
    .format(new Date(date));
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "…" : str;
}`,
      },
    ],
  });
  console.log("✓ Seeded React Patterns (3 snippets)");

  // ─── AI Workflows ─────────────────────────────────────────────────────────
  const aiWorkflows = await prisma.collection.create({
    data: { name: "AI Workflows", description: "AI prompts and workflow automations", userId: user.id },
  });

  await prisma.item.createMany({
    data: [
      {
        title: "Code Review Prompt",
        contentType: "text",
        typeId: prompt.id,
        collectionId: aiWorkflows.id,
        userId: user.id,
        isFavorite: true,
        content: `You are an expert software engineer performing a thorough code review. Analyze the following code and provide feedback on:

1. **Correctness** — bugs, edge cases, off-by-one errors
2. **Security** — injection risks, exposed secrets, unsafe operations
3. **Performance** — unnecessary re-renders, N+1 queries, memory leaks
4. **Readability** — naming, structure, and clarity
5. **Best practices** — patterns, idioms, and standards for the language/framework

Be specific. Include line references and improved code examples where relevant.`,
      },
      {
        title: "Documentation Generator",
        contentType: "text",
        typeId: prompt.id,
        collectionId: aiWorkflows.id,
        userId: user.id,
        content: `Generate clear, concise documentation for the following code. Include:

- A one-line summary
- Parameter descriptions with types
- Return value description
- Usage example
- Any important notes or edge cases

Format as JSDoc/TSDoc comments suitable for placing directly above the function.`,
      },
      {
        title: "Refactoring Assistant",
        contentType: "text",
        typeId: prompt.id,
        collectionId: aiWorkflows.id,
        userId: user.id,
        content: `Refactor the following code to improve its quality without changing its behaviour. Focus on:

1. Reducing duplication (DRY)
2. Simplifying complex conditionals
3. Extracting well-named helper functions
4. Improving variable and function names
5. Applying relevant design patterns where appropriate

Show the refactored version and briefly explain each significant change.`,
      },
    ],
  });
  console.log("✓ Seeded AI Workflows (3 prompts)");

  // ─── DevOps ───────────────────────────────────────────────────────────────
  const devops = await prisma.collection.create({
    data: { name: "DevOps", description: "Infrastructure and deployment resources", userId: user.id },
  });

  await prisma.item.createMany({
    data: [
      {
        title: "Next.js Dockerfile",
        contentType: "text",
        language: "dockerfile",
        typeId: snippet.id,
        collectionId: devops.id,
        userId: user.id,
        content: `FROM node:22-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]`,
      },
      {
        title: "Deploy to Vercel",
        contentType: "text",
        language: "bash",
        typeId: command.id,
        collectionId: devops.id,
        userId: user.id,
        content: "vercel --prod",
      },
      {
        title: "Docker Documentation",
        contentType: "text",
        typeId: link.id,
        collectionId: devops.id,
        userId: user.id,
        url: "https://docs.docker.com",
        description: "Official Docker documentation — engine, compose, and registry guides",
      },
      {
        title: "GitHub Actions Docs",
        contentType: "text",
        typeId: link.id,
        collectionId: devops.id,
        userId: user.id,
        url: "https://docs.github.com/en/actions",
        description: "Automate, customize, and execute workflows directly in your repository",
      },
    ],
  });
  console.log("✓ Seeded DevOps (1 snippet, 1 command, 2 links)");

  // ─── Terminal Commands ────────────────────────────────────────────────────
  const terminalCmds = await prisma.collection.create({
    data: { name: "Terminal Commands", description: "Useful shell commands for everyday development", userId: user.id },
  });

  await prisma.item.createMany({
    data: [
      {
        title: "Git — interactive rebase last N commits",
        contentType: "text",
        language: "bash",
        typeId: command.id,
        collectionId: terminalCmds.id,
        userId: user.id,
        content: "git rebase -i HEAD~N",
      },
      {
        title: "Docker — remove all stopped containers and unused images",
        contentType: "text",
        language: "bash",
        typeId: command.id,
        collectionId: terminalCmds.id,
        userId: user.id,
        content: "docker system prune -af",
      },
      {
        title: "Kill process on port",
        contentType: "text",
        language: "bash",
        typeId: command.id,
        collectionId: terminalCmds.id,
        userId: user.id,
        content: "lsof -ti:<PORT> | xargs kill -9",
      },
      {
        title: "npm — list outdated packages",
        contentType: "text",
        language: "bash",
        typeId: command.id,
        collectionId: terminalCmds.id,
        userId: user.id,
        content: "npm outdated",
      },
    ],
  });
  console.log("✓ Seeded Terminal Commands (4 commands)");

  // ─── Design Resources ─────────────────────────────────────────────────────
  const designResources = await prisma.collection.create({
    data: { name: "Design Resources", description: "UI/UX resources and references", userId: user.id },
  });

  await prisma.item.createMany({
    data: [
      {
        title: "Tailwind CSS Docs",
        contentType: "text",
        typeId: link.id,
        collectionId: designResources.id,
        userId: user.id,
        url: "https://tailwindcss.com/docs",
        description: "Utility-first CSS framework documentation",
      },
      {
        title: "shadcn/ui",
        contentType: "text",
        typeId: link.id,
        collectionId: designResources.id,
        userId: user.id,
        url: "https://ui.shadcn.com",
        description: "Beautifully designed components built with Radix UI and Tailwind CSS",
      },
      {
        title: "Radix UI Primitives",
        contentType: "text",
        typeId: link.id,
        collectionId: designResources.id,
        userId: user.id,
        url: "https://www.radix-ui.com/primitives",
        description: "Unstyled, accessible UI primitives for building high-quality design systems",
      },
      {
        title: "Lucide Icons",
        contentType: "text",
        typeId: link.id,
        collectionId: designResources.id,
        userId: user.id,
        url: "https://lucide.dev/icons",
        description: "Beautiful and consistent open-source icon library",
        isFavorite: true,
      },
    ],
  });
  console.log("✓ Seeded Design Resources (4 links)");

  const totalItems = await prisma.item.count();
  console.log(`\nDone. ${totalItems} items seeded across 5 collections.`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
