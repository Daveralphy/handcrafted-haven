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

export async function POST(request: NextRequest) {
  const pool = getPool();
  try {
    const body = await request.json();
    const { id, email, name, role, bio, description } = body;
    const profileDescription = typeof description === 'string' ? description : bio;

    if (!id || !email || !name || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await pool.query(`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "bio" TEXT;`);

    await pool.query(
      `INSERT INTO "User" (id, email, name, role, bio, "createdAt")
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (id) DO UPDATE SET bio = COALESCE(EXCLUDED.bio, "User".bio);`,
      [id, email, name, role, profileDescription || null]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  } finally {
    await pool.end().catch(() => {});
  }
}
