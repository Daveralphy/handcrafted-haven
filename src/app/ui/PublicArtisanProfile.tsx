import ProductGrid from "./ProductGrid";

interface PublicArtisanProduct {
  id: string | number;
  title: string;
  price: number;
  category: string;
  availability: string;
  imageUrl?: string | null;
}

interface PublicArtisanProfileProps {
  artisan: {
    name: string | null;
    email: string;
    bio: string | null;
  };
  products: PublicArtisanProduct[];
}

export default function PublicArtisanProfile({ artisan, products }: PublicArtisanProfileProps) {
  const displayName = artisan.name || "Independent Artisan";
  const biography = artisan.bio?.trim()
    || `${displayName} is part of the Handcrafted Haven maker community, sharing thoughtfully crafted pieces with shoppers who value personal, handmade work.`;

  return (
    <>
      <section style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        padding: "2rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        marginBottom: "2rem",
      }}>
        <p style={{
          color: "var(--color-accent)",
          fontSize: "0.8rem",
          fontWeight: "700",
          letterSpacing: "0.5px",
          margin: "0 0 0.75rem",
          textTransform: "uppercase",
        }}>
          Artisan Profile
        </p>
        <h1 style={{
          color: "var(--color-primary)",
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2rem, 6vw, 3rem)",
          fontWeight: "bold",
          lineHeight: 1.1,
          margin: "0 0 1rem",
        }}>
          {displayName}
        </h1>
        <p style={{
          color: "#475569",
          fontSize: "1.05rem",
          lineHeight: 1.8,
          margin: 0,
          maxWidth: "800px",
        }}>
          {biography}
        </p>
      </section>

      <ProductGrid initialProducts={products} />
    </>
  );
}
