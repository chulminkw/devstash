import { Star, Pin } from "lucide-react";
import { mockItemTypes } from "@/lib/mock-data";

interface Item {
  id: string;
  title: string;
  typeId: string;
  isFavorite: boolean;
  isPinned: boolean;
  tags: string[];
  lastUsedAt: string | null;
  createdAt: string;
}

export function ItemCard({ item }: { item: Item }) {
  const type = mockItemTypes.find((t) => t.id === item.typeId);
  const date = new Date(item.lastUsedAt ?? item.createdAt).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric" }
  );

  return (
    <div className="rounded-lg border border-border bg-card p-4 hover:border-foreground/20 transition-colors cursor-pointer">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted text-foreground text-xs font-mono shrink-0">
            {type?.icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-medium text-sm">{item.title}</h3>
              {item.isFavorite && (
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
              )}
              {item.isPinned && (
                <Pin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              )}
            </div>
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted text-muted-foreground rounded px-1.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <span className="text-xs text-muted-foreground shrink-0">{date}</span>
      </div>
    </div>
  );
}
