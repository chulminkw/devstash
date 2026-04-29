import { Star, MoreHorizontal } from "lucide-react";
import { mockItems, mockItemTypes } from "@/lib/mock-data";

interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  isFavorite: boolean;
}

export function CollectionCard({ collection }: { collection: Collection }) {
  const typeIds = [
    ...new Set(
      mockItems.filter((i) => i.collectionId === collection.id).map((i) => i.typeId)
    ),
  ];
  const types = typeIds
    .map((id) => mockItemTypes.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <div className="rounded-lg border border-border bg-card p-4 hover:border-foreground/20 transition-colors cursor-pointer">
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
        {collection.itemCount} items
      </p>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {collection.description}
      </p>
      <div className="flex items-center gap-1.5">
        {types.map((type) => (
          <span
            key={type!.id}
            className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5 font-mono"
          >
            {type!.icon}
          </span>
        ))}
      </div>
    </div>
  );
}
