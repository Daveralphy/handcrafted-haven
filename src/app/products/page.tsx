import ProductGrid from "../ui/ProductGrid";
import { Pool } from 'pg';

/* Designed by Porter Luke Frazier - Powered by Live Database Data */

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;
  let products: any[] = [];

  if (connectionString) {
    const pool = new Pool({ 
      connectionString,
      ssl: { rejectUnauthorized: false }
    });

    try {
      const systemTablesResult = await pool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public';
      `);
      
      const realTableNames = systemTablesResult.rows.map(r => r.table_name);
      const productTableName = realTableNames.find(t => t.toLowerCase() === 'product' || t.toLowerCase() === 'products') || 'Product';

      const productResult = await pool.query(`SELECT * FROM "${productTableName}" LIMIT 50;`);
      products = productResult.rows.map((row: any) => ({
        id: row.id,
        title: row.title || row.name || 'Untitled Craft Item',
        price: row.price !== undefined ? Number(row.price) : 0,
        category: row.category || 'Handcrafted',
        availability: row.availability || (row.in_stock ? 'In Stock' : 'Custom Order Only')
      }));
    } catch (error) {
      console.error("Database catalog product mapping pipeline error:", error);
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