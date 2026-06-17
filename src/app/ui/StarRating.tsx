/* Designed by Porter Luke Frazier */

interface StarRatingProps {
  rating: number | null;
  reviewCount?: number;
  showSummary?: boolean;
}

function RatingStars({ filledCount }: { filledCount: number }) {
  return (
    <span aria-hidden="true" style={{ letterSpacing: "0.12rem" }}>
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < filledCount;

        return (
          <span
            key={index}
            style={{
              color: "var(--color-primary)",
            }}
          >
            {isFilled ? "★" : "☆"}
          </span>
        );
      })}
    </span>
  );
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
        <RatingStars filledCount={0} />
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
      <RatingStars filledCount={roundedRating} />
      {showSummary && (
        <span>
          {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
