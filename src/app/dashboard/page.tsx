import { Pool } from 'pg';
import InventoryPanel from '../ui/InventoryPanel';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
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
      const userTable = realTableNames.find(t => t.toLowerCase() === 'user' || t.toLowerCase() === 'users');
      const productTable = realTableNames.find(t => t.toLowerCase() === 'product' || t.toLowerCase() === 'products');

      if (userTable) {
        const artisanResult = await pool.query(`SELECT id, name, email FROM "${userTable}" WHERE role = 'artisan' ORDER BY name;`);
        artisans = artisanResult.rows.map((row: any) => ({
          id: row.id,
          name: row.name,
          email: row.email,
        }));
      }

      if (productTable) {
        const productResult = await pool.query(`
          SELECT p.id, p.title, p.price, p.category, p.availability, p.description, p."artisanId", u.name as artisan_name
          FROM "${productTable}" p
          LEFT JOIN "User" u ON p."artisanId" = u.id
          ORDER BY p."createdAt" DESC;
        `);
        products = productResult.rows.map((row: any) => ({
          id: row.id,
          title: row.title,
          price: Number(row.price),
          category: row.category,
          availability: row.availability,
          description: row.description,
          artisanId: row.artisanId,
          artisanName: row.artisan_name,
        }));
      }
    } catch (error: any) {
      console.error("Dashboard database error:", error);
      loadError = true;
    } finally {
      await pool.end().catch(() => {});
    }
  }

  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
            Creator Dashboard
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
            Manage your products, update listings, and track your inventory.
          </p>
        </div>

        {loadError ? (
          <div style={{
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
              The dashboard is temporarily unavailable. Please check back in a few minutes.
            </p>
          </div>
        ) : (
          <InventoryPanel artisans={artisans} initialProducts={products} />
        )}
      </div>
    </main>
  );
}