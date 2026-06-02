/* Designed by Porter Luke Frazier */

import ProductGrid from "../ui/ProductGrid";

// Catalog/Products page
export default function ProductsPage() {
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
            fontSize: "2.5rem",
            fontWeight: "bold",
            margin: "0 0 2rem",
            textAlign: "center",
          }}
        >
          Explore Our Handcrafted Collection
        </h1>

        <ProductGrid />
      </section>
    </main>
  );
}
