import React from 'react';
import Hero from './ui/Hero';
import ProductGrid from './ui/ProductGrid';
import ArtisanSpotlight from './ui/ArtisanSpotlight';
import Footer from './ui/Footer';
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // FIX: Using POSTGRES_PRISMA_URL which contains the verified password and pgbouncer=true flag
  const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  let artisans: any[] = [];
  let products: any[] = [];
  let debugMessage = "Connecting to database pipeline...";

  if (!connectionString) {
    debugMessage = "⚠️ No connection strings found! Please check Vercel variables.";
  } else {
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

      if (realTableNames.length === 0) {
        debugMessage = "🔗 Connected to Supabase successfully! But your database has 0 tables.";
      } else {
        debugMessage = `🔗 Connected! Discovered tables: [ ${realTableNames.join(', ')} ]. `;
        
        const userTable = realTableNames.find(t => t.toLowerCase() === 'user' || t.toLowerCase() === 'users');
        const productTable = realTableNames.find(t => t.toLowerCase() === 'product' || t.toLowerCase() === 'products');

        if (productTable) {
          const productResult = await pool.query(`SELECT * FROM "${productTable}" LIMIT 12;`);
          products = productResult.rows.map((row: any) => ({
            id: row.id,
            title: row.title || row.name || 'Untitled Craft Item',
            price: row.price !== undefined ? Number(row.price) : 0,
            category: row.category || 'Handcrafted',
            availability: row.availability || (row.in_stock ? 'In Stock' : 'Custom Order Only')
          }));
        }

        if (userTable) {
          const artisanResult = await pool.query(`SELECT * FROM "${userTable}" WHERE "role" = 'artisan' OR role = 'artisan' LIMIT 3;`);
          artisans = artisanResult.rows.map((row: any) => ({
            id: row.id,
            name: row.name || row.username || 'Anonymous Artisan',
            bio: row.bio || row.description || 'Professional creator profile.',
            role: row.role
          }));
        }
      }
    } catch (error: any) {
      debugMessage = `❌ Database Error context: ${error.message || error}`;
    } finally {
      await pool.end().catch(() => {});
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-body)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>
        
        {/* Diagnostic Banner */}
        <div style={{ backgroundColor: '#f1f5f9', border: '1px dashed #cbd5e1', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', fontSize: '0.9rem', color: '#1e293b', fontFamily: 'monospace' }}>
          <strong>System Diagnostic Readout:</strong> <br />
          {debugMessage}
        </div>

        <Hero />
        <ProductGrid initialProducts={products} />
        <ArtisanSpotlight artisans={artisans} />
      </main>
      <Footer />
    </div>
  );
}