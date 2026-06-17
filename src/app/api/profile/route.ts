import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { createClient } from "@/lib/supabase/server";

function getPool() {
  const rawConnectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || "";
  const connectionString = rawConnectionString
    .replace("?sslmode=require", "?")
    .replace("&sslmode=require", "")
    .replace("?sslmode=verify-full", "?")
    .replace("&sslmode=verify-full", "");

  return new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "artisan") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pool = getPool();

  try {
    const { bio, description, artisanId } = await request.json();
    const profileDescription = typeof description === "string" ? description : bio;
    const targetArtisanId = process.env.NODE_ENV !== "production" && typeof artisanId === "string"
      ? artisanId
      : user.id;

    if (typeof profileDescription !== "string") {
      return NextResponse.json({ error: "Profile description must be text." }, { status: 400 });
    }

    await pool.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "bio" TEXT;`);

    const result = await pool.query(
      `UPDATE "User"
       SET bio = $1
       WHERE id = $2 AND role = 'artisan'
       RETURNING id, bio;`,
      [profileDescription.trim() || null, targetArtisanId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Profile not found." }, { status: 404 });
    }

    return NextResponse.json({ profile: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  } finally {
    await pool.end().catch(() => {});
  }
}
