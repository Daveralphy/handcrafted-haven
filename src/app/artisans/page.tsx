import { Pool } from 'pg';
import Link from 'next/link';

/* Designed by Raphael */

export const dynamic = 'force-dynamic';

interface ArtisanRow {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  product_count: string;
}

interface Artisan {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  productCount: number;
}

export default async function ArtisansPage() {
  const rawConnectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || "";

  const connectionString = rawConnectionString
    .replace('?sslmode=require', '?')
    .replace('&sslmode=require', '')
    .replace('?sslmode=verify-full', '?')
    .replace('&sslmode=verify-full', '');

  let artisans: Artisan[] = [];
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

      if (userTable) {
        const result = await pool.query(`
          SELECT u.id, u.name, u.email, u."createdAt",
            COUNT(p.id) as product_count
          FROM "${userTable}" u
          LEFT JOIN "Product" p ON p."artisanId" = u.id
          WHERE u.role = 'artisan'
          GROUP BY u.id, u.name, u.email, u."createdAt"
          ORDER BY u.name;
        `);
        artisans = (result.rows as ArtisanRow[]).map((row) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          createdAt: row.createdAt,
          productCount: Number(row.product_count),
        }));
      }
    } catch (error) {
      console.error("Artisans page error:", error);
      loadError = true;
    } finally {
      await pool.end().catch(() => {});
    }
  }

  return (
    <main style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
            Our Artisans
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Meet the talented creators behind every handcrafted piece in our marketplace.
          </p>
        </div>

        {loadError ? (
          <div style={{
            padding: '4rem 2rem',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛠️</div>
            <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              We are tidying things up
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
              Our artisan profiles are temporarily unavailable. Please check back in a few minutes.
            </p>
          </div>
        ) : artisans.length === 0 ? (
          <div style={{
            padding: '4rem 2rem',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
            <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
              No artisans yet
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
              Our community is just getting started. Check back soon to meet our makers.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {artisans.map((artisan) => (
              <div key={artisan.id} style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-background)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(75, 0, 130, 0.2)',
                }}>
                  {artisan.name ? artisan.name.charAt(0).toUpperCase() : '?'}
                </div>

                <div>
                  <h2 style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>
                    {artisan.name}
                  </h2>
                  <p style={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 0.5rem 0' }}>
                    Verified Artisan
                  </p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
                    {artisan.productCount} {artisan.productCount === 1 ? 'product' : 'products'} listed
                  </p>
                </div>

                <Link href={`/products?artisan=${artisan.id}`} style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  marginTop: 'auto',
                }}>
                  View Products
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
