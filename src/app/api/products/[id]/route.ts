import { Pool } from 'pg';
import { NextRequest, NextResponse } from 'next/server';

function getPool() {
  const rawConnectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || "";
  const connectionString = rawConnectionString
    .replace('?sslmode=require', '?')
    .replace('&sslmode=require', '')
    .replace('?sslmode=verify-full', '?')
    .replace('&sslmode=verify-full', '');
  return new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const pool = getPool();
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, price, category, availability, description } = body;

    if (!title || !price || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE "Product"
       SET title = $1, price = $2, category = $3, availability = $4, description = $5
       WHERE id = $6
       RETURNING *;`,
      [title, price, category, availability, description, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  } finally {
    await pool.end().catch(() => {});
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const pool = getPool();
  try {
    const { id } = await params;

    const result = await pool.query(
      `DELETE FROM "Product" WHERE id = $1 RETURNING id;`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  } finally {
    await pool.end().catch(() => {});
  }
}