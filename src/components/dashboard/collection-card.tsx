import { Star, MoreHorizontal } from "lucide-react";
import type { CollectionWithMeta } from "@/lib/db/collections";

export function CollectionCard({ collection }: { collection: CollectionWithMeta }) {
  return (
    <div
      className="rounded-lg border bg-card p-4 hover:brightness-110 transition-all cursor-pointer"
      style={{ borderColor: collection.accentColor ?? "hsl(var(--border))" }}
    >
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <h3 className="font-medium text-sm">{collection.name}</h3>
          {collection.isFavorite && (
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
          )}
        </div>
        <button className="text-muted-foreground hover:text-foreground -mr-1 p-0.5 rounded">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        {collection.itemCount} {collection.itemCount === 1 ? "item" : "items"}
      </p>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {collection.description}
      </p>
      <div className="flex items-center gap-1.5">
        {collection.types.map((type) => (
          <span
            key={type.id}
            className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5 font-mono"
            style={{ borderColor: type.color ?? undefined, color: type.color ?? undefined }}
          >
            {type.icon}
          </span>
        ))}
      </div>
    </div>
  );
}
