import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FolderPlus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <header className="flex items-center gap-4 px-4 h-14 border-b border-border shrink-0">
        <div className="flex items-center gap-2 w-44 shrink-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground text-sm font-bold">
            S
          </div>
          <span className="font-semibold text-foreground">DevStash</span>
        </div>

        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-9 bg-muted border-0 focus-visible:ring-1"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-background border border-border rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" className="gap-1.5">
            <FolderPlus className="w-4 h-4" />
            New Collection
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            New Item
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar placeholder */}
        <aside className="w-56 border-r border-border shrink-0 p-4">
          <h2 className="text-muted-foreground text-sm">Sidebar</h2>
        </aside>

        {/* Main area placeholder */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-muted-foreground text-sm">Main</h2>
        </main>
      </div>
    </div>
  );
}
