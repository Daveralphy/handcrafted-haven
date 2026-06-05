import React from 'react';
import Hero from './ui/Hero';
import ProductGrid from './ui/ProductGrid';
import ArtisanSpotlight from './ui/ArtisanSpotlight';
import Footer from './ui/Footer';
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // FIX: Using POSTGRES_URL (Port 6543) so Vercel's IPv4 servers can actually reach Supabase
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  let artisans: any[] = [];
  let products: any[] = [];

  if (connectionString) {
    const pool = new Pool({ 
      connectionString,
      ssl: { rejectUnauthorized: false }
    });
    
    try {
      // 1. Safely fetch Artisans
      const artisanResult = await pool.query(`SELECT * FROM "User" WHERE "role" = 'artisan' OR role = 'artisan' LIMIT 3;`).catch(() => null);
      if (artisanResult && artisanResult.rows) {
        artisans = artisanResult.rows.map((row: any) => ({
          id: row.id,
          name: row.name || row.username || 'Anonymous Artisan',
          bio: row.bio || row.description || 'Specializing in unique handcrafted design items.',
          role: row.role
        }));
      }

      // 2. Safely fetch Products (Checking both uppercase and lowercase table names)
      let productResult = await pool.query(`SELECT * FROM "Product" LIMIT 12;`).catch(() => null);
      if (!productResult || productResult.rows.length === 0) {
        productResult = await pool.query(`SELECT * FROM "products" LIMIT 12;`).catch(() => null);
      }

      if (productResult && productResult.rows) {
        products = productResult.rows.map((row: any) => ({
          id: row.id,
          title: row.title || row.name || 'Untitled Craft Item',
          price: row.price !== undefined ? Number(row.price) : 0,
          category: row.category || 'Handcrafted',
          availability: row.availability || (row.in_stock ? 'In Stock' : 'Custom Order Only')
        }));
      }
    } catch (error) {
      console.error("Vercel Database Connection Error:", error);
    } finally {
      await pool.end().catch(() => {});
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-body)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>
        <Hero />
        <ProductGrid initialProducts={products} />
        <ArtisanSpotlight artisans={artisans} />
      </main>
      <Footer />
    </div>
  );
}