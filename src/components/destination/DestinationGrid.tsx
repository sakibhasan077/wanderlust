"use client";

import { useMemo, useState } from "react";
import { FilterBar, type Filters } from "./FilterBar";
import { DestinationCard } from "./DestinationCard";
import type { Destination } from "@/types/destination";

interface DestinationGridProps {
  destinations: Destination[];
}

export function DestinationGrid({ destinations }: DestinationGridProps) {
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    priceRange: "all",
    sortBy: "default",
  });

  // Apply the three controls in one pass: filter, then sort.
  const visible = useMemo(() => {
    let result = destinations.filter((d) => {
      const matchesCategory =
        filters.category === "all" || d.category === filters.category;

      const matchesPrice =
        filters.priceRange === "all" ||
        (filters.priceRange === "budget" && d.price < 1000) ||
        (filters.priceRange === "mid" &&
          d.price >= 1000 &&
          d.price < 2000) ||
        (filters.priceRange === "luxury" && d.price >= 2000);

      return matchesCategory && matchesPrice;
    });

    // Copy before sorting so we never mutate the original prop array.
    if (filters.sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [destinations, filters]);

  const categories = useMemo(
    () => Array.from(new Set(destinations.map((d) => d.category))),
    [destinations]
  );

  return (
    <div>
      {/* Heading, subheading + dropdowns (updates this component's state) */}
      <FilterBar filters={filters} categories={categories} onChange={setFilters} />

      {/* Results count */}
      <p className="mt-6 text-sm text-zinc-600">
        Showing {visible.length} destinations
      </p>

      {visible.length === 0 ? (
        <p className="mt-10 text-zinc-500">No destinations found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((d) => (
            <DestinationCard key={d._id} destination={d} />
          ))}
        </div>
      )}
    </div>
  );
}
