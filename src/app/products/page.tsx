import ProductGrid from "../ui/ProductGrid";
import { Pool } from 'pg';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // FIX: Using POSTGRES_URL (Port 6543) for IPv4 support on Vercel
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  let products: any[] = [];

  if (connectionString) {
    const pool = new Pool({ 
      connectionString,
      ssl: { rejectUnauthorized: false }
    });

    try {
      let productResult = await pool.query(`SELECT * FROM "Product" LIMIT 50;`).catch(() => null);
      if (!productResult || productResult.rows.length === 0) {
        productResult = await pool.query(`SELECT * FROM "products" LIMIT 50;`).catch(() => null);
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