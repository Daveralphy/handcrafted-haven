import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TestDB() {
  try {
    // Reusing the global client instance resolves the Turbopack SSR environment parsing block
    const users = await prisma.user.findMany();

    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1 style={{ color: "#16a34a" }}>Database Connected ✅</h1>
        <p>User records fetched successfully from Supabase:</p>
        <pre style={{ background: "#f4f4f5", padding: "1rem", borderRadius: "6px" }}>
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>
    );
  } catch (error: any) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1 style={{ color: "#dc2626" }}>Database Error ❌</h1>
        <p>Runtime connection failure:</p>
        <pre style={{ background: "#fef2f2", color: "#991b1b", padding: "1rem", borderRadius: "6px" }}>
          {error.message || JSON.stringify(error)}
        </pre>
      </div>
    );
  }
}