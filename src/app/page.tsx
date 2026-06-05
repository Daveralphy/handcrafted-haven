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
    const pool = new Pool({ 
      connectionString,
      ssl: { rejectUnauthorized: false }
    });
    
    try {
      // 1. Inspect the hidden PostgreSQL system catalog to find the exact case style of your tables
      const systemTablesResult = await pool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public';
      `);
      
      const realTableNames = systemTablesResult.rows.map(r => r.table_name);
      console.log("Discovered real database table layout signatures:", realTableNames);

      // 2. Locate the user/accounts table regardless of capitalization (User, user, users)
      const userTableName = realTableNames.find(t => t.toLowerCase() === 'user' || t.toLowerCase() === 'users') || 'User';
      
      // 3. Locate the product listings table regardless of capitalization (Product, product, products)
      const productTableName = realTableNames.find(t => t.toLowerCase() === 'product' || t.toLowerCase() === 'products') || 'Product';

      // 4. Safely execute the queries using the exact database string matching format discovered
      const artisanResult = await pool.query(`SELECT * FROM "${userTableName}" WHERE "role" = 'artisan' OR role = 'artisan' LIMIT 3;`);
      artisans = artisanResult.rows.map((row: any) => ({
        id: row.id,
        name: row.name || row.username || 'Anonymous Artisan',
        bio: row.bio || row.description || 'Specializing in unique handcrafted design items and sustainable creation.',
        role: row.role
      }));

      const productResult = await pool.query(`SELECT * FROM "${productTableName}" LIMIT 12;`);
      products = productResult.rows.map((row: any) => ({
        id: row.id,
        title: row.title || row.name || 'Untitled Craft Item',
        price: row.price !== undefined ? Number(row.price) : 0,
        category: row.category || 'Handcrafted',
        availability: row.availability || (row.in_stock ? 'In Stock' : 'Custom Order Only')
      }));

    } catch (error) {
      console.error("Automated system catalog discovery query failed:", error);
    } finally {
      await pool.end().catch(() => {});
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-body)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>
        <Hero />
        
        {/* Completely dynamic payload strings passed directly */}
        <ProductGrid initialProducts={products} />
        
        <ArtisanSpotlight artisans={artisans} />
      </main>
      <Footer />
    </div>
  );
}