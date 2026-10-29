import { DestinationGrid } from "@/components/destination/DestinationGrid";
import type { Destination } from "@/types/destination";

export default async function AllDestinationPage() {
  const res = await fetch("http://localhost:8000/destinations");
  const destinations: Destination[] = await res.json();

  // Heading, subheading, filters and the card grid (with Add to Cart)
  return (
    <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
      <DestinationGrid destinations={destinations} />
    </div>
  );
}
