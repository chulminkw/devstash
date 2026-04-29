import { Package, FolderOpen, Star, Layers } from "lucide-react";
import { mockCollections, mockItems, mockTypeCounts } from "@/lib/mock-data";

export function StatsCards() {
  const totalItems = Object.values(mockTypeCounts).reduce((a, b) => a + b, 0);
  const totalCollections = mockCollections.length;
  const favoriteItems = mockItems.filter((i) => i.isFavorite).length;
  const favoriteCollections = mockCollections.filter((c) => c.isFavorite).length;

  const stats = [
    { label: "Total Items",          value: totalItems,          icon: Package    },
    { label: "Collections",          value: totalCollections,    icon: FolderOpen },
    { label: "Favorite Items",       value: favoriteItems,       icon: Star       },
    { label: "Favorite Collections", value: favoriteCollections, icon: Layers     },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map(({ label, value, icon: Icon }) => (
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
