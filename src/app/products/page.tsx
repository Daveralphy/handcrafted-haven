import ProductGrid from "../ui/ProductGrid";
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let rawConnectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL || "";
  
  // Scrub the strict SSL tags here as well
  const connectionString = rawConnectionString
    .replace('?sslmode=require', '?')
    .replace('&sslmode=require', '')
    .replace('?sslmode=verify-full', '?')
    .replace('&sslmode=verify-full', '');

  let products: any[] = [];

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
    <main style={{ backgroundColor: "var(--color-background)", minHeight: "100vh", padding: "3rem 2rem" }}>
      <section style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <h1 style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)", fontSize: "3rem", fontWeight: "bold", margin: "0 0 2rem", textAlign: "center" }}>
          Explore Our Handcrafted Collection
        </h1>
        <ProductGrid initialProducts={products} />
      </section>
    </main>
  );
}