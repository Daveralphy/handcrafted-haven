import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const rawConnectionString =
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_URL_NON_POOLING;

  if (!rawConnectionString) {
    throw new Error("A PostgreSQL connection string is required.");
  }

  const connectionString = rawConnectionString
    .replace("?sslmode=require", "?")
    .replace("&sslmode=require", "")
    .replace("?sslmode=verify-full", "?")
    .replace("&sslmode=verify-full", "");

  const adapter = new PrismaPg({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  const client = new PrismaClient({
    adapter,
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export function getPrisma() {
  return globalForPrisma.prisma ?? createPrismaClient();
}
