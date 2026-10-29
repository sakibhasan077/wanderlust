export { cn } from "cn";

/**
 * Derives a stable pseudo-random rating (4.2 - 4.9) and review count (25 - 180)
 * from an id string, ensuring SSR and client renders match deterministically.
 */
export function getStableRatingAndReviews(id: string = "") {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);
  const rating = Number((4.2 + (abs % 8) * 0.1).toFixed(1));
  const reviews = 25 + (abs % 155);
  return { rating, reviews };
}
