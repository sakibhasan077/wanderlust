"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Destination } from "@/types/destination";

const FeaturedDestination = () => {
  const [data, setData] = useState<Destination[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/destinations")
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Featured Destinations
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 border border-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand transition-colors hover:bg-brand hover:text-white self-start sm:self-auto"
          >
            <span>ALL DESTINATIONS</span>
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        {/* shadcn Carousel using the `data` array */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {data.map((item) => (
              <CarouselItem
                key={item._id}
                className="basis-full pl-6 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="group flex flex-col">
                  {/* Image with Rating Badge */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 rounded bg-white/95 px-2 py-0.5 text-xs font-bold text-zinc-900 shadow-xs">
                      <span>{item.rating ?? 4.5}</span>
                      <Star
                        className="size-3 fill-black text-black"
                        aria-hidden
                      />
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="mt-3.5 space-y-1">
                    {/* Location */}
                    <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <MapPin
                        className="size-3.5 text-zinc-400 shrink-0"
                        aria-hidden
                      />
                      <span>{item.country}</span>
                    </p>

                    {/* Name & Price */}
                    <div className="flex items-baseline justify-between gap-2 pt-0.5">
                      <h3 className="text-xl font-bold tracking-tight text-zinc-900 truncate">
                        {item.name}
                      </h3>
                      <p className="shrink-0 text-xl font-bold text-zinc-900">
                        ${item.price}
                        <span className="text-xs font-normal text-zinc-500">
                          /Person
                        </span>
                      </p>
                    </div>

                    {/* Duration */}
                    <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <CalendarDays
                        className="size-3.5 text-zinc-400 shrink-0"
                        aria-hidden
                      />
                      <span>{item.duration}</span>
                    </p>

                    {/* Book Now Link */}
                    <div className="pt-2">
                      <Link
                        href={`/destinations/${item._id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand transition-colors hover:text-brand/80"
                      >
                        <span>BOOK NOW</span>
                        <ArrowUpRight className="size-3.5" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Footer Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <div className="h-0.5 flex-1 bg-zinc-200 mr-6 rounded-full" />
            <div className="flex items-center gap-2 shrink-0">
              <CarouselPrevious className="static translate-y-0 size-9 sm:size-10 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900" />
              <CarouselNext className="static translate-y-0 size-9 sm:size-10 rounded-full border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedDestination;
