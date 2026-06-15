/* Designed by Porter Luke Frazier */

import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductReviews from "../../ui/ProductReviews";
import StarRating from "../../ui/StarRating";

export const dynamic = "force-dynamic";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      artisan: {
        select: {
          name: true,
        },
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          customer: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const categoryTags: string[] = product.category
    ? product.category
      .split(",")
      .map((category: string) => category.trim())
      .filter(Boolean)
    : ["Uncategorized"];
  const reviewCount = product.reviews.length;
  const averageRating =
    reviewCount > 0
      ? product.reviews.reduce(
          (total: number, review: { rating: number }) => total + review.rating,
          0
        ) / reviewCount
      : null;
  const reviews = product.reviews.map(
    (review: {
      id: string;
      rating: number;
      comment: string | null;
      createdAt: Date;
      customer: { name: string | null };
    }) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      reviewerName: review.customer.name || "Verified customer",
      createdAt: review.createdAt.toISOString(),
    })
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
        padding: "clamp(1.5rem, 5vw, 4rem) 1.25rem",
        fontFamily: "var(--font-body)",
      }}
    >
      <article
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(2rem, 5vw, 4rem)",
          alignItems: "center",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "clamp(1.5rem, 4vw, 3rem)",
          backgroundColor: "#ffffff",
          border: "1px solid rgba(75, 0, 130, 0.12)",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(75, 0, 130, 0.08)",
        }}
      >
        <div
          style={{
            width: "100%",
            minWidth: 0,
            minHeight: "clamp(240px, 45vw, 420px)",
            aspectRatio: "4 / 3",
            display: "grid",
            placeItems: "center",
            padding: "2rem",
            backgroundColor: "var(--color-background)",
            borderRadius: "12px",
            color: "var(--color-primary)",
            textAlign: "center",
            fontWeight: 600,
            overflow: "hidden",
          }}
        >
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.title}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ) : (
            <span>{product.category ?? "Handcrafted"} product image</span>
          )}
        </div>

        <section style={{ display: "flex", minWidth: 0, flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {categoryTags.map((category) => (
              <span
                key={category}
                style={{
                  padding: "0.4rem 0.75rem",
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-primary)",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                {category}
              </span>
            ))}
          </div>

          <h1
            style={{
              margin: 0,
              color: "var(--color-primary)",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
            }}
          >
            {product.title}
          </h1>

          <p style={{ margin: 0, color: "#334155", fontSize: "1.05rem", lineHeight: 1.7 }}>
            {product.description || "No product description is available yet."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <span style={{ color: "#334155", fontSize: "0.95rem" }}>
              Crafted by{" "}
              <strong style={{ color: "var(--color-primary)" }}>
                {product.artisan.name || "Independent artisan"}
              </strong>
            </span>
            <StarRating rating={averageRating} reviewCount={reviewCount} />
          </div>

          <strong style={{ color: "var(--color-primary)", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>
            {price}
          </strong>

          <span style={{ color: "#334155", fontWeight: 600 }}>
            Availability: {product.availability}
          </span>

          <Link
            href="/products"
            style={{
              alignSelf: "flex-start",
              padding: "0.75rem 1rem",
              color: "var(--color-primary)",
              backgroundColor: "var(--color-accent)",
              border: "none",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 700,
              fontFamily: "var(--font-body)",
            }}
          >
            Back to products
          </Link>
        </section>
      </article>
      <ProductReviews reviews={reviews} />
    </main>
  );
}
