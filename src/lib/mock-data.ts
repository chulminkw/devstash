export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: false,
};

export const mockItemTypes = [
  { id: "type_snippet",  name: "Snippet",  icon: "</>", isSystem: true },
  { id: "type_prompt",   name: "Prompt",   icon: "💬",  isSystem: true },
  { id: "type_command",  name: "Command",  icon: ">_",  isSystem: true },
  { id: "type_note",     name: "Note",     icon: "📝",  isSystem: true },
  { id: "type_file",     name: "File",     icon: "📄",  isSystem: true },
  { id: "type_image",    name: "Image",    icon: "🖼️",  isSystem: true },
  { id: "type_url",      name: "URL",      icon: "🔗",  isSystem: true },
];

export const mockCollections = [
  { id: "col_1", name: "React Patterns",   description: "Common React patterns and hooks",         itemCount: 12, isFavorite: true  },
  { id: "col_2", name: "Python Snippets",  description: "Useful Python code snippets",             itemCount: 8,  isFavorite: false },
  { id: "col_3", name: "Context Files",    description: "AI context files for projects",           itemCount: 5,  isFavorite: true  },
  { id: "col_4", name: "Interview Prep",   description: "Technical interview preparation",         itemCount: 24, isFavorite: false },
  { id: "col_5", name: "Git Commands",     description: "Frequently used git commands",            itemCount: 15, isFavorite: true  },
  { id: "col_6", name: "AI Prompts",       description: "Curated AI prompts for coding",           itemCount: 18, isFavorite: false },
];

export const mockItems = [
  {
    id: "item_1",
    title: "useAuth Hook",
    typeId: "type_snippet",
    collectionId: "col_1",
    content: `import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();
  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}`,
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    tags: ["react", "auth", "hooks"],
    lastUsedAt: "2025-01-15",
    createdAt: "2025-01-15",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    typeId: "type_snippet",
    collectionId: "col_1",
    content: `export async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 2 ** i * 1000));
    }
  }
}`,
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    tags: ["api", "error-handling"],
    lastUsedAt: "2025-01-12",
    createdAt: "2025-01-12",
  },
  {
    id: "item_3",
    title: "GPT Code Review Prompt",
    typeId: "type_prompt",
    collectionId: "col_6",
    content: "Review the following code for bugs, performance issues, and security vulnerabilities. Provide specific, actionable feedback with code examples where relevant.",
    language: null,
    isFavorite: true,
    isPinned: false,
    tags: ["gpt", "code-review"],
    lastUsedAt: "2025-01-14",
    createdAt: "2025-01-10",
  },
  {
    id: "item_4",
    title: "Git interactive rebase",
    typeId: "type_command",
    collectionId: "col_5",
    content: "git rebase -i HEAD~n",
    language: "bash",
    isFavorite: false,
    isPinned: false,
    tags: ["git", "rebase"],
    lastUsedAt: "2025-01-13",
    createdAt: "2025-01-08",
  },
  {
    id: "item_5",
    title: "Tailwind v4 Setup Notes",
    typeId: "type_note",
    collectionId: "col_3",
    content: "Tailwind v4 uses CSS-based config. No tailwind.config.ts needed. Add `@import \"tailwindcss\"` to globals.css and use `@theme` directive for custom tokens.",
    language: null,
    isFavorite: false,
    isPinned: false,
    tags: ["tailwind", "css"],
    lastUsedAt: "2025-01-11",
    createdAt: "2025-01-11",
  },
  {
    id: "item_6",
    title: "Next.js Docs",
    typeId: "type_url",
    collectionId: "col_3",
    content: null,
    url: "https://nextjs.org/docs",
    description: "Official Next.js documentation",
    language: null,
    isFavorite: false,
    isPinned: false,
    tags: ["nextjs", "docs"],
    lastUsedAt: "2025-01-10",
    createdAt: "2025-01-09",
  },
];

export const mockTypeCounts: Record<string, number> = {
  type_snippet: 24,
  type_prompt:  18,
  type_command: 15,
  type_note:    12,
  type_file:     5,
  type_image:    3,
  type_url:      8,
};
