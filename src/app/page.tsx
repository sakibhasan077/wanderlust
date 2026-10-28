import { CTA } from "@/components/home/cta";
import { Hero } from "@/components/home/hero";
import { SearchBar } from "@/components/home/search-bar";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChoose } from "@/components/home/why-choose";

export default function Home() {
  return (
    <main>
      {/* SearchBar is absolute — needs this wrapper to pin to the hero's bottom */}
      <div className="relative">
        <Hero />
        <SearchBar />
      </div>
      <WhyChoose />
      <Testimonials />
      <CTA />
    </main>
  );
}
