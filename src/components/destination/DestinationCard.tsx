"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { Destination } from "@/types/destination";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const { _id, name, country, category, price, duration, image } = destination;

  // The backend has no rating field, so derive a stable 3.5–5.0 value
  // from the id. Same destination always shows the same rating.


  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image + rating badge */}
      <div className="relative aspect-[16/10]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Card body */}
      <div className="p-4">
        <p className="flex items-center gap-1 text-xs text-zinc-500">
          <MapPin className="size-3.5" aria-hidden />
          {country}
        </p>

        <div className="mt-1 flex items-start justify-between gap-3">
          <h2 className="text-base font-semibold text-zinc-900">{name}</h2>
          <p className="shrink-0 text-base font-bold text-zinc-900">
            ${price}
            <span className="text-xs font-normal text-zinc-500">/person</span>
          </p>
        </div>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
          <CalendarDays className="size-3.5" aria-hidden />
          {category} • {duration}
        </p>

        {/* Book Now + Add to Cart */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            href={`/destinations/${_id}`}
            className="inline-flex items-center gap-1 text-xs font-bold tracking-wide text-brand uppercase transition-colors hover:text-brand/80"
          >
            Book Now
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
