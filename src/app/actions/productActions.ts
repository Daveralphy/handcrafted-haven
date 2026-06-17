/* Designed by Porter Luke Frazier */

"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { Pool } from "pg";

type ProductInput = {
  title: string;
  price: number;
  category: string;
  availability: string;
  description: string;
  imageUrl: string;
  artisanId: string;
};

function getPool() {
  const rawConnectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || "";
  const connectionString = rawConnectionString
    .replace("?sslmode=require", "?")
    .replace("&sslmode=require", "")
    .replace("?sslmode=verify-full", "?")
    .replace("&sslmode=verify-full", "");

  return new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
}

function revalidateProductViews(productId?: string) {
  revalidatePath("/dashboard");
  revalidatePath("/products");

  if (productId) {
    revalidatePath(`/products/${productId}`);
  }
}

export async function createProduct(input: ProductInput) {
  const pool = getPool();

  try {
    if (!input.title || !input.price || !input.category || !input.artisanId) {
      return { error: "Missing required fields" };
    }

    const result = await pool.query(
      `INSERT INTO "Product" (id, title, price, category, availability, description, "imageUrl", "artisanId", "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       RETURNING *;`,
      [
        randomUUID(),
        input.title,
        input.price,
        input.category,
        input.availability || "In Stock",
        input.description || null,
        input.imageUrl || null,
        input.artisanId,
      ]
    );

    revalidateProductViews(result.rows[0].id);

    return { product: result.rows[0] };
  } catch (error) {
    console.error("Create product error:", error);
    return { error: "Failed to create product" };
  } finally {
    await pool.end().catch(() => { });
  }
}

export async function updateProduct(productId: string, input: Omit<ProductInput, "artisanId">) {
  const pool = getPool();

  try {
    if (!productId || !input.title || !input.price || !input.category) {
      return { error: "Missing required fields" };
    }

    const result = await pool.query(
      `UPDATE "Product"
       SET title = $1, price = $2, category = $3, availability = $4, description = $5, "imageUrl" = $6
       WHERE id = $7
       RETURNING *;`,
      [
        input.title,
        input.price,
        input.category,
        input.availability,
        input.description,
        input.imageUrl || null,
        productId,
      ]
    );

    if (result.rows.length === 0) {
      return { error: "Product not found" };
    }

    revalidateProductViews(productId);

    return { product: result.rows[0] };
  } catch (error) {
    console.error("Update product error:", error);
    return { error: "Failed to update product" };
  } finally {
    await pool.end().catch(() => { });
  }
}

export async function deleteProduct(productId: string) {
  const pool = getPool();

  try {
    if (!productId) {
      return { error: "Product not found" };
    }

    const result = await pool.query(
      `DELETE FROM "Product" WHERE id = $1 RETURNING id;`,
      [productId]
    );

    if (result.rows.length === 0) {
      return { error: "Product not found" };
    }

    revalidateProductViews(productId);

    return { success: true };
  } catch (error) {
    console.error("Delete product error:", error);
    return { error: "Failed to delete product" };
  } finally {
    await pool.end().catch(() => { });
  }
}
