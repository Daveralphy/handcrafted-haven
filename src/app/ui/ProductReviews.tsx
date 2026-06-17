/* Designed by Porter Luke Frazier */

"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { addReview } from "@/app/actions/reviewActions";
import StarRating from "./StarRating";

export interface ProductReview {
  id: string;
  rating: number;
  comment: string | null;
  reviewerName: string;
  createdAt: string;
}

interface ProductReviewsProps {
  productId: string;
  reviews: ProductReview[];
  canAddReview: boolean;
}

export default function ProductReviews({
  productId,
  reviews,
  canAddReview,
}: ProductReviewsProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const parsedRating = Number(rating);
    if (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      setError("Choose a star rating from 1 to 5.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addReview({
        productId,
        rating: parsedRating,
        comment: comment.trim(),
      });

      if (result.error) {
        setError(result.error);
        return;
      }
    } finally {
      setIsSubmitting(false);
    }

    setRating("5");
    setComment("");
    setIsFormOpen(false);
    startTransition(() => router.refresh());
  }

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
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
        {canAddReview && (
          <button
            type="button"
            onClick={() => {
              setError("");
              setIsFormOpen((current) => !current);
            }}
            style={{
              padding: "0.75rem 1rem",
              color: "var(--color-primary)",
              backgroundColor: "var(--color-accent)",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontFamily: "var(--font-body)",
              cursor: "pointer",
            }}
          >
            {isFormOpen ? "Cancel" : "Add Review"}
          </button>
        )}
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gap: "1.15rem",
            marginBottom: "1.75rem",
            padding: "clamp(1rem, 3vw, 1.5rem)",
            backgroundColor: "rgba(255, 253, 208, 0.45)",
            border: "1px solid rgba(75, 0, 130, 0.14)",
            borderRadius: "8px",
            boxShadow: "0 6px 18px rgba(75, 0, 130, 0.07)",
          }}
        >
          <label
            style={{
              display: "grid",
              gap: "0.55rem",
              color: "var(--color-primary)",
              fontWeight: 700,
              fontSize: "0.95rem",
            }}
          >
            Star rating
            <select
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              required
              style={{
                width: "100%",
                minHeight: "2.75rem",
                padding: "0.65rem 2.75rem 0.65rem 0.75rem",
                color: "#334155",
                backgroundColor: "#ffffff",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%234b0082' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                backgroundPosition: "right 1rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.1rem",
                border: "1px solid rgba(75, 0, 130, 0.18)",
                borderRadius: "8px",
                font: "inherit",
                boxShadow: "0 1px 3px rgba(15, 23, 42, 0.06)",
                appearance: "none",
                WebkitAppearance: "none",
              }}
            >
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </label>

          <label
            style={{
              display: "grid",
              gap: "0.55rem",
              color: "var(--color-primary)",
              fontWeight: 700,
              fontSize: "0.95rem",
            }}
          >
            Review
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={3}
              placeholder="Optional"
              style={{
                width: "100%",
                minHeight: "7rem",
                padding: "0.8rem 0.85rem",
                color: "#334155",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(75, 0, 130, 0.18)",
                borderRadius: "8px",
                font: "inherit",
                lineHeight: 1.55,
                resize: "vertical",
                boxShadow: "0 1px 3px rgba(15, 23, 42, 0.06)",
              }}
            />
          </label>

          {error && (
            <p
              style={{
                margin: 0,
                color: "#b91c1c",
                fontSize: "0.95rem",
                fontWeight: 700,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            style={{
              justifySelf: "start",
              minHeight: "2.75rem",
              padding: "0.7rem 1rem",
              color: "#ffffff",
              backgroundColor: "var(--color-primary)",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontFamily: "var(--font-body)",
              cursor: isSubmitting || isPending ? "not-allowed" : "pointer",
              opacity: isSubmitting || isPending ? 0.7 : 1,
            }}
          >
            {isSubmitting || isPending ? "Adding..." : "Submit Review"}
          </button>
        </form>
      )}

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
