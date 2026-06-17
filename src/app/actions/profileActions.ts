/* Designed by Porter Luke Frazier */

"use server";

import { revalidatePath } from "next/cache";
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

export async function updateProfileDescription({
  description,
  artisanId,
}: {
  description: string;
  artisanId: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "artisan") {
    return { error: "Unauthorized" };
  }

  if (typeof description !== "string") {
    return { error: "Profile description must be text." };
  }

  const targetArtisanId =
    process.env.NODE_ENV !== "production" && typeof artisanId === "string"
      ? artisanId
      : user.id;
  const pool = getPool();

  try {
    await pool.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "bio" TEXT;`);

    const result = await pool.query(
      `UPDATE "User"
       SET bio = $1
       WHERE id = $2 AND role = 'artisan'
       RETURNING id, bio;`,
      [description.trim() || null, targetArtisanId]
    );

    if (result.rowCount === 0) {
      return { error: "Profile not found." };
    }

    revalidatePath("/dashboard");
    revalidatePath(`/artisans/${targetArtisanId}`);

    return { profile: result.rows[0] };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "Failed to update profile." };
  } finally {
    await pool.end().catch(() => { });
  }
}

export async function updateProfileImage({
  imageUrl,
  artisanId,
}: {
  imageUrl: string;
  artisanId: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "artisan") {
    return { error: "Unauthorized" };
  }

  if (typeof imageUrl !== "string") {
    return { error: "Image URL must be text." };
  }

  const targetArtisanId =
    process.env.NODE_ENV !== "production" && typeof artisanId === "string"
      ? artisanId
      : user.id;

  const pool = getPool();

  try {
    await pool.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;`);

    const result = await pool.query(
      `UPDATE "User"
       SET "imageUrl" = $1
       WHERE id = $2 AND role = 'artisan'
       RETURNING id, "imageUrl";`,
      [imageUrl.trim() || null, targetArtisanId]
    );

    if (result.rowCount === 0) {
      return { error: "Profile not found." };
    }

    revalidatePath("/dashboard");
    revalidatePath(`/artisans`);
    revalidatePath(`/artisans/${targetArtisanId}`);

    return { profile: result.rows[0] };
  } catch (error) {
    console.error("Profile image update error:", error);
    return { error: "Failed to update profile image." };
  } finally {
    await pool.end().catch(() => { });
  }
}