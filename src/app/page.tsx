import React from 'react';
import Hero from './ui/Hero';
import ProductGrid from './ui/ProductGrid';
import ArtisanSpotlight from './ui/ArtisanSpotlight';
import Footer from './ui/Footer';
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let rawConnectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || "";

  const connectionString = rawConnectionString
    .replace('?sslmode=require', '?')
    .replace('&sslmode=require', '')
    .replace('?sslmode=verify-full', '?')
    .replace('&sslmode=verify-full', '');

  let artisans: any[] = [];
  let products: any[] = [];
  let loadError = false;

  if (connectionString) {
    const pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false }
    });

    try {
      const tablesResult = await pool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public';
      `);
      const realTableNames = tablesResult.rows.map(r => r.table_name);

      if (realTableNames.length > 0) {
        const userTable = realTableNames.find(t => t.toLowerCase() === 'user' || t.toLowerCase() === 'users');
        const productTable = realTableNames.find(t => t.toLowerCase() === 'product' || t.toLowerCase() === 'products');

        if (productTable) {
          const productResult = await pool.query(`SELECT * FROM "${productTable}" LIMIT 12;`);
          products = productResult.rows.map((row: any) => ({
            id: row.id,
            title: row.title,
            price: Number(row.price),
            category: row.category,
            availability: row.availability,
          }));
        }

        if (userTable) {
          const artisanResult = await pool.query(`SELECT * FROM "${userTable}" WHERE role = 'artisan' LIMIT 3;`);
          artisans = artisanResult.rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            role: row.role,
            email: row.email,
            createdAt: row.createdAt,
          }));
        }
      }
    } catch (error: any) {
      console.error("Database pipeline error:", error);
      loadError = true;
    } finally {
      await pool.end().catch(() => {});
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-body)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>
        <Hero />
        {loadError ? (
          <div style={{
            margin: '3rem 0',
            padding: '4rem 2rem',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠️</div>
            <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              We are tidying things up
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
              Our marketplace is temporarily unavailable. Please check back in a few minutes.
            </p>
          </div>
        ) : (
          <ProductGrid initialProducts={products} />
        )}
        <ArtisanSpotlight artisans={artisans} />
      </main>
      <Footer />
    </div>
  );
}