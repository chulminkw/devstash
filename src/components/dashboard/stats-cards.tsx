import { Package, FolderOpen, Star, Layers } from "lucide-react";
import type { DashboardStats } from "@/lib/db/collections";

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const items = [
    { label: "Total Items",          value: stats.totalItems,          icon: Package    },
    { label: "Collections",          value: stats.totalCollections,    icon: FolderOpen },
    { label: "Favorite Items",       value: stats.favoriteItems,       icon: Star       },
    { label: "Favorite Collections", value: stats.favoriteCollections, icon: Layers     },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {items.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Icon className="w-4 h-4" />
            <span className="text-xs">{label}</span>
          </div>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}
