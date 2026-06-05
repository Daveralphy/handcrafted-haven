import ProductGrid from "../ui/ProductGrid";
import { Pool } from 'pg';

/* Designed by Porter Luke Frazier - Powered by Live Database Data */

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;
  let products: any[] = [];

  if (connectionString) {
    const pool = new Pool({ connectionString });
    try {
      // Fetch live stock listings directly from your database product rows table
      const productResult = await pool.query(`SELECT * FROM "Product" LIMIT 50;`);
      products = productResult.rows;
    } catch (error) {
      console.error("Database fetch failed on products catalog subroute pipeline:", error);
    } finally {
      await pool.end().catch(() => {});
    }
  }

  return (
    <main
      style={{
        backgroundColor: "var(--color-background)",
        minHeight: "100vh",
        padding: "3rem 2rem",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: "var(--color-primary)",
            fontFamily: "var(--font-heading)",
            fontSize: "3rem",
            fontWeight: "bold",
            margin: "0 0 2rem",
            textAlign: "center",
          }}
        >
          Explore Our Handcrafted Collection
        </h1>

        {/* The ProductGrid component now receives live items directly from your database */}
        <ProductGrid initialProducts={products} />
      </section>
    </main>
  );
}