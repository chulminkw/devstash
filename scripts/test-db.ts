import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Testing database connection...\n");

  const [users, items, collections, itemTypes, tags] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.itemType.count(),
    prisma.tag.count(),
  ]);

  console.log("✓ Connected to Neon PostgreSQL");
  console.log("\nTable counts:");
  console.log(`  users:       ${users}`);
  console.log(`  items:       ${items}`);
  console.log(`  collections: ${collections}`);
  console.log(`  item_types:  ${itemTypes}`);
  console.log(`  tags:        ${tags}`);
  console.log("\nDatabase is ready.");
}

main()
  .catch((err) => {
    console.error("Connection failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
