import { prisma } from "@/lib/prisma";

export type CollectionWithMeta = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  types: { id: string; icon: string | null; color: string | null }[];
  accentColor: string | null;
};

export type DashboardStats = {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
};

export async function getCollections(): Promise<CollectionWithMeta[]> {
  const collections = await prisma.collection.findMany({
    include: {
      items: {
        include: { type: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return collections.map((col) => {
    const typeCounts = new Map<
      string,
      { count: number; type: { id: string; icon: string | null; color: string | null } }
    >();

    for (const item of col.items) {
      const entry = typeCounts.get(item.typeId);
      if (entry) {
        entry.count++;
      } else {
        typeCounts.set(item.typeId, {
          count: 1,
          type: { id: item.type.id, icon: item.type.icon, color: item.type.color },
        });
      }
    }

    const sortedTypes = [...typeCounts.values()].sort((a, b) => b.count - a.count);
    const types = sortedTypes.map((t) => t.type);

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col.items.length,
      types,
      accentColor: types[0]?.color ?? null,
    };
  });
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [totalItems, totalCollections, favoriteItems, favoriteCollections] =
    await Promise.all([
      prisma.item.count(),
      prisma.collection.count(),
      prisma.item.count({ where: { isFavorite: true } }),
      prisma.collection.count({ where: { isFavorite: true } }),
    ]);

  return { totalItems, totalCollections, favoriteItems, favoriteCollections };
}
