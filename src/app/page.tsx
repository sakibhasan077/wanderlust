import { Hero } from "@/components/home/hero";
import { SearchBar } from "@/components/home/search-bar";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <SearchBar />
    </main>
  );
}
