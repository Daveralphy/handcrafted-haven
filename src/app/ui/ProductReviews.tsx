/* Designed by Porter Luke Frazier */

import StarRating from "./StarRating";

export interface ProductReview {
  id: string;
  rating: number;
  comment: string | null;
  reviewerName: string;
  createdAt: string;
}

interface ProductReviewsProps {
  reviews: ProductReview[];
}

export default function ProductReviews({
  reviews,
}: ProductReviewsProps) {
  return (
    <section
      aria-labelledby="product-reviews-heading"
      style={{
        maxWidth: "1100px",
        margin: "2rem auto 0",
        padding: "clamp(1.5rem, 4vw, 3rem)",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(75, 0, 130, 0.12)",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(75, 0, 130, 0.08)",
      }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          id="product-reviews-heading"
          style={{
            margin: 0,
            color: "var(--color-primary)",
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
          }}
        >
          Customer Reviews
        </h2>
        <p style={{ margin: "0.5rem 0 0", color: "#64748b" }}>
          {reviews.length > 0
            ? `${reviews.length} ${reviews.length === 1 ? "review" : "reviews"} from our community`
            : "Be the first to share your experience with this product."}
        </p>
      </div>

      {reviews.length === 0 ? (
        <div
          style={{
            padding: "2rem",
            backgroundColor: "var(--color-background)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <StarRating rating={null} reviewCount={0} />
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {reviews.map((review) => (
            <article
              key={review.id}
              style={{
                padding: "1.25rem",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: "0 0 0.35rem",
                      color: "var(--color-primary)",
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.15rem",
                    }}
                  >
                    {review.reviewerName}
                  </h3>
                  <StarRating rating={review.rating} showSummary={false} />
                </div>
                <time
                  dateTime={review.createdAt}
                  style={{ color: "#64748b", fontSize: "0.85rem" }}
                >
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(review.createdAt))}
                </time>
              </div>

              <p style={{ margin: 0, color: "#334155", lineHeight: 1.65 }}>
                {review.comment || "This customer left a rating without a written review."}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
