/* Designed by Porter Luke Frazier */

interface StarRatingProps {
  rating: number | null;
  reviewCount?: number;
  showSummary?: boolean;
}

export default function StarRating({
  rating,
  reviewCount = 0,
  showSummary = true,
}: StarRatingProps) {
  if (rating === null || (showSummary && reviewCount === 0)) {
    return (
      <div
        aria-label="No reviews yet"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          color: "#64748b",
          fontSize: "0.95rem",
          fontWeight: 600,
        }}
      >
        <span aria-hidden="true" style={{ color: "#cbd5e1", letterSpacing: "0.12rem" }}>
          ☆☆☆☆☆
        </span>
        <span>No reviews yet</span>
      </div>
    );
  }

  const roundedRating = Math.round(rating);

  return (
    <div
      aria-label={
        showSummary
          ? `${rating.toFixed(1)} out of 5 stars from ${reviewCount} ${
              reviewCount === 1 ? "review" : "reviews"
            }`
          : `${rating.toFixed(1)} out of 5 stars`
      }
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.5rem",
        color: "#334155",
        fontSize: "0.95rem",
        fontWeight: 600,
      }}
    >
      <span aria-hidden="true" style={{ color: "var(--color-accent)", letterSpacing: "0.12rem" }}>
        {Array.from({ length: 5 }, (_, index) =>
          index < roundedRating ? "★" : "☆"
        ).join("")}
      </span>
      {showSummary && (
        <span>
          {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
