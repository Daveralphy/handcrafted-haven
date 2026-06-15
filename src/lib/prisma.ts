interface PrismaPlaceholder {
  user: {
    findMany: () => Promise<unknown[]>;
  };
}

export const prisma = null as unknown as PrismaPlaceholder;
