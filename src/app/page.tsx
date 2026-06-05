import React from 'react';
import Hero from './ui/Hero';
import ProductGrid from './ui/ProductGrid';
import ArtisanSpotlight from './ui/ArtisanSpotlight';
import Footer from './ui/Footer';
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;
  let artisans: any[] = [];
  let products: any[] = [];

  if (connectionString) {
    const pool = new Pool({ connectionString });
    try {
      // 1. Fetch live platform creators from the user base accounts table
      const artisanResult = await pool.query(`SELECT * FROM "User" WHERE "role" = 'artisan' LIMIT 3;`);
      artisans = artisanResult.rows;

      // 2. Fetch live stock listings from your database product rows table
      // Note: If your table name uses a lowercase or different plural style (like "products" or "Product"), update this line.
      const productResult = await pool.query(`SELECT * FROM "Product" LIMIT 12;`);
      products = productResult.rows;
    } catch (error) {
      console.error("Database fetch failed on landing page route pipeline:", error);
    } finally {
      await pool.end().catch(() => {});
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-body)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Centralized Page Body Orchestrator */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>

        <Hero />

        {/* Both marketplace subcomponents now utilize live database metrics cleanly */}
        <ProductGrid initialProducts={products} />

        <ArtisanSpotlight artisans={artisans} />

      </main>

      <Footer />

    </div>
  );
}