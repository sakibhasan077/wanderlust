import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTA_IMAGE = "/image/CTA.png";

export function CTA() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={CTA_IMAGE}
        alt="Airplane flying over a tropical island surrounded by turquoise water"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[420px] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center md:min-h-[520px]">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-xl text-sm text-white/90 drop-shadow sm:text-base md:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="group mt-8 inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-zinc-900 transition-colors hover:bg-zinc-100"
        >
          Book Your Trip Today
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
