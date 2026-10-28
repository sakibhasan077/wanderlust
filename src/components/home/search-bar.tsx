import { cn } from "cn";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function SearchBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20">
      {/* Mobile: 2-col grid (shorter panel). Desktop: single row. */}
      <div className=" grid grid-cols-2 bg-[rgba(255,255,255,0.42)] text-white backdrop-blur-sm md:flex md:items-stretch">
        {searchFields.map((field, index) => (
          <div
            key={field.label}
            className={cn(
              "border-white/15 px-4 py-3 md:flex-1 md:px-6 md:py-4",
              // Mobile grid: column divider on the right cell, row divider on the bottom row
              index % 2 === 1 && "border-l",
              index >= 2 && "border-t md:border-t-0",
              // Desktop row: dividers between all fields
              index === 2 && "md:border-l"
            )}
          >
            <p className="text-[20px] font-medium">{field.label}</p>
            <p className="mt-0.5 text-sm text-white/70">{field.value}</p>
          </div>
        ))}
        <button
          type="button"
          className="col-span-2 border-t border-white/15 px-10 py-4 text-[20px] font-semibold text-white transition-colors bg-brand/80 md:col-span-1 md:border-t-0 md:self-stretch"
        >
          Search
        </button>
      </div>
    </div>
  );
}
