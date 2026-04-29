"use client";

import Link from "next/link";
import {
  Code2, MessageSquare, Terminal, FileText, File,
  ImageIcon, Link2, Star, Folder, Settings,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { mockUser, mockItemTypes, mockCollections, mockTypeCounts } from "@/lib/mock-data";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  type_snippet: Code2,
  type_prompt:  MessageSquare,
  type_command: Terminal,
  type_note:    FileText,
  type_file:    File,
  type_image:   ImageIcon,
  type_url:     Link2,
};

const typeSlugs: Record<string, string> = {
  type_snippet: "snippets",
  type_prompt:  "prompts",
  type_command: "commands",
  type_note:    "notes",
  type_file:    "files",
  type_image:   "images",
  type_url:     "urls",
};

function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const favorites = mockCollections.filter((c) => c.isFavorite);
  const rest      = mockCollections.filter((c) => !c.isFavorite);

  return (
    <div className="flex flex-col h-full overflow-y-auto py-2">
      {/* Types */}
      <div className={collapsed ? "px-1" : "px-3"}>
        {!collapsed && (
          <p className="text-xs font-medium text-muted-foreground px-2 py-1">Types</p>
        )}
        {mockItemTypes.map((type) => {
          const Icon = typeIcons[type.id];
          return (
            <Link
              key={type.id}
              href={`/items/${typeSlugs[type.id]}`}
              className={`flex items-center gap-2.5 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ${
                collapsed ? "justify-center px-1" : "px-2"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{type.name}s</span>
                  <span className="text-xs tabular-nums">{mockTypeCounts[type.id]}</span>
                </>
              )}
            </Link>
          );
        })}
      </div>

      {/* Collections */}
      <div className={`mt-4 ${collapsed ? "px-1" : "px-3"}`}>
        {!collapsed && (
          <p className="text-xs font-medium text-muted-foreground px-2 py-1">Collections</p>
        )}

        {/* Favorites */}
        {!collapsed && favorites.length > 0 && (
          <p className="text-xs text-muted-foreground/60 px-2 py-0.5">Favorites</p>
        )}
        {favorites.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.id}`}
            className={`flex items-center gap-2.5 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ${
              collapsed ? "justify-center px-1" : "px-2"
            }`}
          >
            <Star className="w-4 h-4 shrink-0 fill-yellow-400 text-yellow-400" />
            {!collapsed && <span className="flex-1 truncate">{col.name}</span>}
          </Link>
        ))}

        {/* All collections (most recent) */}
        {!collapsed && rest.length > 0 && (
          <p className="text-xs text-muted-foreground/60 px-2 py-0.5 mt-2">All Collections</p>
        )}
        {rest.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.id}`}
            className={`flex items-center gap-2.5 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ${
              collapsed ? "justify-center px-1" : "px-2"
            }`}
          >
            <Folder className="w-4 h-4 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 truncate">{col.name}</span>
                <span className="text-xs tabular-nums">{col.itemCount}</span>
              </>
            )}
          </Link>
        ))}
      </div>

      {/* User area */}
      <div className={`mt-auto pt-3 border-t border-border ${collapsed ? "px-1" : "px-3"}`}>
        <div
          className={`flex items-center gap-2.5 px-1 py-1 rounded-md hover:bg-accent transition-colors cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
            {mockUser.name[0]}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight truncate">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
              </div>
              <Settings className="w-4 h-4 text-muted-foreground shrink-0" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface SidebarProps {
  desktopOpen: boolean;
  mobileOpen:  boolean;
  onMobileClose: () => void;
}

export function Sidebar({ desktopOpen, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Desktop: collapsible persistent sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-border overflow-hidden transition-all duration-200 shrink-0 ${
          desktopOpen ? "w-56" : "w-12"
        }`}
      >
        <SidebarContent collapsed={!desktopOpen} />
      </aside>

      {/* Mobile: always a drawer */}
      <Sheet open={mobileOpen} onOpenChange={(open) => !open && onMobileClose()}>
        <SheetContent side="left" className="w-56 p-0 border-r border-border">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
