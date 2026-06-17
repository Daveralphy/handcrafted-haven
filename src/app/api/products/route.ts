import { Pool } from "pg";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

function getPool() {
  const rawConnectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || "";
  const connectionString = rawConnectionString
    .replace("?sslmode=require", "?")
    .replace("&sslmode=require", "")
    .replace("?sslmode=verify-full", "?")
    .replace("&sslmode=verify-full", "");

  return new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
}

export async function POST(request: NextRequest) {
  const pool = getPool();

  try {
    const body = await request.json();
    const { title, price, category, availability, description, imageUrl, artisanId } = body;

    if (!title || !price || !category || !artisanId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO "Product" (id, title, price, category, availability, description, "imageUrl", "artisanId", "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *;`,
      [
        randomUUID(),
        title,
        price,
        category,
        availability || "In Stock",
        description || null,
        imageUrl || null,
        artisanId,
      ]
    );

    return NextResponse.json({ product: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  } finally {
    await pool.end().catch(() => {});
  }
}
