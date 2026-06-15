import ProductGrid from "../ui/ProductGrid";
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

interface ProductRow {
  id: string | number;
  title: string;
  price: number | string;
  category: string;
  availability: string;
}

interface Product {
  id: string | number;
  title: string;
  price: number;
  category: string;
  availability: string;
}

export default async function ProductsPage() {
  const rawConnectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || "";

  const connectionString = rawConnectionString
    .replace('?sslmode=require', '?')
    .replace('&sslmode=require', '')
    .replace('?sslmode=verify-full', '?')
    .replace('&sslmode=verify-full', '');

  let products: Product[] = [];
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
      const productTable = realTableNames.find(t => t.toLowerCase() === 'product' || t.toLowerCase() === 'products');

      if (productTable) {
        const productResult = await pool.query(`SELECT * FROM "${productTable}" LIMIT 50;`);
        products = (productResult.rows as ProductRow[]).map((row) => ({
          id: row.id,
          title: row.title,
          price: Number(row.price),
          category: row.category,
          availability: row.availability,
        }));
      }
    } catch (error) {
      console.error("Database connection error:", error);
      loadError = true;
    } finally {
      await pool.end().catch(() => { });
    }
  }

  return (
    <main style={{ backgroundColor: "var(--color-background)", minHeight: "100vh", padding: "3rem 2rem" }}>
      <section style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <h1 style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)", fontSize: "3rem", fontWeight: "bold", margin: "0 0 2rem", textAlign: "center" }}>
          Explore Our Handcrafted Collection
        </h1>
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
              Our marketplace is temporarily unavailable. Please check back in a few minutes.
            </p>
          </div>
        ) : (
          <ProductGrid initialProducts={products} />
        )}
      </section>
    </main>
  );
}
