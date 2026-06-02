import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function TestDB() {
  try {
    const users = await prisma.user.findMany();

    return (
      <div>
        <h1>Database Connected ✅</h1>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
    );
  } catch (error: any) {
    return (
      <div>
        <h1>Database Error ❌</h1>
        <pre>{error.message}</pre>
      </div>
    );
  }
}
