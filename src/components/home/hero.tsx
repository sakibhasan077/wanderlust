import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Placeholder hero image — swap for a local asset in public/ when available.
const HERO_IMAGE =
  "/image/Banner.png";

export function Hero() {
  return (
    // Navbar is fixed (out of flow), so the hero owns the full viewport.
    // svh avoids mobile browser chrome inflating 100vh.
    <section className="relative flex min-h-svh flex-col">
      <Image
        src={HERO_IMAGE}
        alt="Aerial view of a turquoise bay surrounded by green hills"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      {/* pt clears the fixed navbar; pb clears the stacked mobile SearchBar (~170px) */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-56 text-center md:pb-32">
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 drop-shadow sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="group inline-flex text-center items-center gap-2   bg-brand text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand/90 mr-4 px-8 py-4"
          >
            Explore Now
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex text-center items-center  border border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            View Destination
          </Link>
        </div>
      </div>
    </section>
  );
}
