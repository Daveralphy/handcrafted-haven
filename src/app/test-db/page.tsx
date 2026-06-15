import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TestDB() {
  let users: unknown[] = [];
  let errorMessage: string | null = null;

  try {
    // Reusing the global client instance resolves the Turbopack SSR environment parsing block
    users = await prisma.user.findMany();
  } catch (error: unknown) {
    errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
  }

  if (errorMessage) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1 style={{ color: "#dc2626" }}>Database Error ❌</h1>
        <p>Runtime connection failure:</p>
        <pre style={{ background: "#fef2f2", color: "#991b1b", padding: "1rem", borderRadius: "6px" }}>
          {errorMessage}
        </pre>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#16a34a" }}>Database Connected ✅</h1>
      <p>User records fetched successfully from Supabase:</p>
      <pre style={{ background: "#f4f4f5", padding: "1rem", borderRadius: "6px" }}>
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
  );
}
