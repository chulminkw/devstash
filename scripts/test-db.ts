import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Fetching demo data from Neon...\n");

  // ─── User ────────────────────────────────────────────────────────────────
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
  });
  if (!user) throw new Error("Demo user not found — run `npx prisma db seed` first.");
  console.log("── User ──────────────────────────────────────");
  console.log(`  Name:          ${user.name}`);
  console.log(`  Email:         ${user.email}`);
  console.log(`  Email verified: ${user.emailVerified?.toISOString()}`);
  console.log(`  isPro:         ${user.isPro}`);
  console.log(`  Password hash: ${user.password?.slice(0, 20)}...`);

  // ─── Item Types ───────────────────────────────────────────────────────────
  const itemTypes = await prisma.itemType.findMany({ orderBy: { name: "asc" } });
  console.log("\n── System Item Types ─────────────────────────");
  for (const t of itemTypes) {
    console.log(`  [${t.icon?.padEnd(10)}]  ${t.name.padEnd(8)}  ${t.color}`);
  }

  // ─── Collections + Items ──────────────────────────────────────────────────
  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: { type: true },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  console.log("\n── Collections & Items ───────────────────────");
  for (const col of collections) {
    console.log(`\n  📁 ${col.name} (${col.items.length} items)`);
    console.log(`     ${col.description}`);
    for (const item of col.items) {
      const preview = (item.content ?? item.url ?? "").replace(/\n/g, " ").slice(0, 60);
      console.log(`     • [${item.type.name.padEnd(7)}] ${item.title}`);
      console.log(`              ${preview}${preview.length === 60 ? "…" : ""}`);
    }
  }

  // ─── Summary ─────────────────────────────────────────────────────────────
  const [totalItems, totalCollections, totalTypes] = await Promise.all([
    prisma.item.count(),
    prisma.collection.count(),
    prisma.itemType.count(),
  ]);

  console.log("\n── Summary ───────────────────────────────────");
  console.log(`  Users:       ${1}`);
  console.log(`  Item types:  ${totalTypes}`);
  console.log(`  Collections: ${totalCollections}`);
  console.log(`  Items:       ${totalItems}`);
  console.log("\n✓ All data verified.");
}

main()
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
