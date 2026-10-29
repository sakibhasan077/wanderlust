"use client";

// The three dropdown values the page needs to filter/sort by.
export interface Filters {
  category: string;
  priceRange: string;
  sortBy: string;
}

interface FilterBarProps {
  filters: Filters;
  categories: string[];
  onChange: (filters: Filters) => void;
}

const selectClass =
  "w-full appearance-none border border-zinc-200 bg-white px-4 py-3 pr-10 text-sm uppercase tracking-wide text-zinc-600 focus:border-brand focus:outline-none";

// Small wrapper so each select gets its own custom arrow.
function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-zinc-400">
        ▾
      </span>
    </div>
  );
}

export function FilterBar({ filters, categories, onChange }: FilterBarProps) {
  // Update one field, then tell the parent about the new filters.
  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div>
      {/* Heading + subheading */}
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Explore All Destinations
      </h1>
      <p className="mt-2 text-sm text-zinc-600 md:text-base">
        Find your perfect travel experience from our curated collection
      </p>

      {/* Filter dropdowns */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SelectWrapper>
          <select
            aria-label="Filter by category"
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
            className={selectClass}
          >
            <option value="all">Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </SelectWrapper>

        <SelectWrapper>
          <select
            aria-label="Filter by price range"
            value={filters.priceRange}
            onChange={(e) => update("priceRange", e.target.value)}
            className={selectClass}
          >
            <option value="all">Price Range</option>
            <option value="budget">Under $1,000</option>
            <option value="mid">$1,000 – $2,000</option>
            <option value="luxury">$2,000+</option>
          </select>
        </SelectWrapper>

        <SelectWrapper>
          <select
            aria-label="Sort destinations"
            value={filters.sortBy}
            onChange={(e) => update("sortBy", e.target.value)}
            className={selectClass}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A – Z</option>
          </select>
        </SelectWrapper>
      </div>
    </div>
  );
}
