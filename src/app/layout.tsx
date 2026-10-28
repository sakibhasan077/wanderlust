import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

// variable: "--font-sans" feeds the Tailwind theme (see globals.css
// `--font-sans: var(--font-sans)`), so font-sans/font-heading utilities pick it up.
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Wanderlust — Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${josefinSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
