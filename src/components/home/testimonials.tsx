"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Placeholder portraits from Unsplash (allowed in next.config.ts) —
// swap for local assets in public/image when available.
const testimonials = [
  {
    quote:
      "The Bali trip was absolutely magical. Every detail was perfectly planned. The resorts were luxurious and the cultural experiences were unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    imageAlt: "Portrait of Michael Chen",
  },
  {
    quote:
      "Swiss Alps adventure exceeded all expectations. The mountain views were breathtaking and our guide was incredibly knowledgeable. Highly recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    imageAlt: "Portrait of Sarah Johnson",
  },
  {
    quote:
      "Kyoto in spring was a dream come true. Cherry blossoms everywhere, serene temples and the food — every meal felt like a celebration.",
    name: "David Okafor",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    imageAlt: "Portrait of David Okafor",
  },
  {
    quote:
      "The Santorini sunset cruise was the highlight of our honeymoon. Seamless booking, friendly crew and views we will never forget.",
    name: "Emily Rodriguez",
    location: "Toronto, Canada",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    imageAlt: "Portrait of Emily Rodriguez",
  },
];

export function Testimonials() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <div className="flex items-center justify-between gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
              What Travelers Say
            </h2>
            <div className="flex shrink-0 gap-2">
              <CarouselPrevious size="icon-lg" className="static rounded-full" />
              <CarouselNext size="icon-lg" className="static rounded-full" />
            </div>
          </div>
          <p className="mt-3 text-sm text-zinc-600 md:text-base">
            Real experiences from our happy travelers
          </p>

          <CarouselContent className="mt-10">
            {testimonials.map(({ quote, name, location, image, imageAlt }) => (
              <CarouselItem key={name} className="basis-full md:basis-1/2">
                <figure className="flex h-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
                  <div className="flex flex-1 flex-col justify-between p-6 md:p-7">
                    <blockquote className="text-sm font-medium leading-relaxed text-zinc-800 md:text-base">
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-6">
                      <p className="text-sm font-semibold text-brand">
                        <span aria-hidden>&mdash;</span> {name}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">{location}</p>
                    </figcaption>
                  </div>
                  <div className="relative w-2/5 shrink-0 sm:w-44 md:w-52">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 40vw, 208px"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
