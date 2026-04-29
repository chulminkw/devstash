import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CollectionCard } from "@/components/dashboard/collection-card";
import { ItemCard } from "@/components/dashboard/item-card";
import { getCollections, getDashboardStats } from "@/lib/db/collections";
import { mockItems } from "@/lib/mock-data";

export default async function DashboardPage() {
  const [collections, stats] = await Promise.all([
    getCollections(),
    getDashboardStats(),
  ]);

  const pinnedItems = mockItems.filter((i) => i.isPinned);
  const recentItems = [...mockItems]
    .sort((a, b) =>
      new Date(b.lastUsedAt ?? b.createdAt).getTime() -
      new Date(a.lastUsedAt ?? a.createdAt).getTime()
    )
    .slice(0, 10);

  return (
    <DashboardShell>
      <div className="max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your developer knowledge hub</p>
        </div>

        <StatsCards stats={stats} />

        {/* Collections */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Collections</h2>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
          </div>
        </section>

        {/* Pinned */}
        {pinnedItems.length > 0 && (
          <section className="mb-8">
            <h2 className="font-semibold mb-4">Pinned</h2>
            <div className="flex flex-col gap-3">
              {pinnedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Recent */}
        <section>
          <h2 className="font-semibold mb-4">Recent</h2>
          <div className="flex flex-col gap-3">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
