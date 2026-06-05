import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or POSTGRES_URL_NON_POOLING environment variable is not set");
}

// For Supabase with self-signed certificates in development, allow insecure TLS
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    log: ['query', 'error', 'warn']
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;