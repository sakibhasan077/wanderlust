import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  Check,
  Clock,
  MapPin,
  Star,
  Users,
  Edit2,
  Trash2,
} from "lucide-react";
import { Destination } from "@/types/destination";

// TODO: replace with real data from the backend once the API provides it.
const highlights = [
  "Private beach access",
  "Traditional dance performance",
  "Sunrise trek at Mount Batur",
  "Luxury beach-front experience",
  "Island hopping tour",
  "Spa and wellness session",
];

// TODO: replace with real data from the backend once the API provides it.
const inclusions = [
  "Accommodation included",
  "Travel insurance required",
  "24/7 customer support",
  "All meals included",
  "Airport transfers",
  "Professional tour guide",
];

// Reusable small section heading.
function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-zinc-900">{children}</h2>;
}

// Small labeled feature with an icon (used by Highlights + Inclusions).
function CheckItem({
  text,
  icon,
}: {
  text: string;
  icon: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2 text-sm text-zinc-600">
      <span className="mt-0.5 shrink-0 text-brand">{icon}</span>
      {text}
    </li>
  );
}

const DestinationDetails = async ({
  params,
}: {
  params: { destinationId: string };
}) => {
  const { destinationId } = await params;
  const res = await fetch(
    `http://localhost:8000/destinations/${destinationId}`
  );
  const data: Destination = await res.json();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-24 pb-16">
      {/* Top bar: back link + share / save / cancel actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <Edit2 className="size-3.5" aria-hidden />
            Edit
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 className="size-3.5" aria-hidden />
            Delete
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-4 aspect-[16/7] overflow-hidden rounded-xl">
        <Image
          src={data.image}
          alt={data.name}
          fill
          priority
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover"
        />
      </div>

      {/* Main content */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: details */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            {/* Title + rating */}
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {data.name}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-600">
              <span className="inline-flex items-center gap-1.5">
                <Star
                  className="size-4 fill-amber-400 text-amber-400"
                  aria-hidden
                />
                {data.rating}{" "}
                <span className="text-zinc-400">
                  ({data.reviews} reviews)
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden />
                {data.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" aria-hidden />
                {data.country}
              </span>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <SectionHeading>Overview</SectionHeading>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {data.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-6">
              <SectionHeading>Highlights</SectionHeading>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {highlights.map((item) => (
                  <CheckItem
                    key={item}
                    text={item}
                    icon={<Check className="size-4" />}
                  />
                ))}
              </ul>
            </div>

            {/* What's Included */}
            <div className="mt-6">
              <SectionHeading>What&apos;s Included</SectionHeading>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {inclusions.map((item) => (
                  <CheckItem
                    key={item}
                    text={item}
                    icon={<BadgeCheck className="size-4" />}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: booking card */}
        <div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            {/* Price */}
            <p className="text-sm text-zinc-500">
              Starting from
              <span className="ml-2 text-3xl font-bold text-brand">
                ${data.price}
              </span>
            </p>
            <p className="mt-1 text-xs text-zinc-400">per person</p>

            {/* Trip facts */}
            <div className="mt-4 space-y-2 border-t border-zinc-100 pt-4 text-sm text-zinc-600">
              <p className="flex items-center gap-2">
                <Calendar className="size-4 text-brand" aria-hidden />
                {data.departureDate}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="size-4 text-brand" aria-hidden />
                {data.duration}
              </p>
              <p className="flex items-center gap-2">
                <Users className="size-4 text-brand" aria-hidden />
                Max 15 travelers
              </p>
            </div>

            {/* Book now */}
            <button
              type="button"
              className="mt-5 w-full bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
            >
              Book Now
            </button>

            {/* Perks */}
            <ul className="mt-5 space-y-2 border-t border-zinc-100 pt-4 text-sm text-zinc-600">
              {inclusions.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="size-4 text-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
