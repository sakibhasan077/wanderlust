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
  Trash2,
} from "lucide-react";
import { Destination } from "@/types/destination";
import EditDialog from "@/components/destination/EditButtonDialog";
import { getStableRatingAndReviews } from "@/lib/utils";
import { DeleteDialog } from "@/components/destination/DeleteDestination";

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

// Sample traveler reviews
const sampleReviews = [
  {
    name: "Sophia Martinez",
    date: "October 2026",
    rating: 5,
    comment:
      "Hands down one of the best trips we've ever taken! Everything from the itinerary to the local guide was seamless and unforgettable.",
  },
  {
    name: "Marcus Vance",
    date: "September 2026",
    rating: 5,
    comment:
      "Spectacular experience. The views were breathtaking and Wanderlust took care of every small detail. Will definitely book again!",
  },
  {
    name: "Amina Al-Mansoor",
    date: "August 2026",
    rating: 4,
    comment:
      "A wonderfully curated journey. Great pacing, fantastic local cuisine, and comfortable accommodations throughout.",
  },
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

  // Stable random rating & review count derived from destination id
  const { rating: stableRating, reviews: stableReviews } =
    getStableRatingAndReviews(data._id);
  const rating = data.rating ?? stableRating;
  const reviewsCount = data.reviews ?? stableReviews;

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
          <span>
            <EditDialog destinationData={data} />
          </span>
          <span>
            <DeleteDialog destinationData={data}></DeleteDialog>
          </span>
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
                <span className="font-semibold text-zinc-900">{rating}</span>{" "}
                <span className="text-zinc-400">
                  ({reviewsCount} reviews)
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

            {/* Traveler Reviews */}
            <div className="mt-8 border-t border-zinc-100 pt-6">
              <div className="flex items-center justify-between">
                <SectionHeading>Traveler Reviews</SectionHeading>
                <span className="text-xs font-medium text-brand">
                  {reviewsCount} verified reviews
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {sampleReviews.map((rev) => (
                  <div
                    key={rev.name}
                    className="rounded-lg border border-zinc-100 bg-zinc-50/60 p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">
                          {rev.name}
                        </p>
                        <p className="text-xs text-zinc-400">{rev.date}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3.5 ${
                              i < rev.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-zinc-200 text-zinc-200"
                            }`}
                            aria-hidden
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
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
