import BookingCart from "@/components/booking-component/BookingCart";
import { auth } from "@/lib/auth";
import { BookingType } from "@/types/bookingType";
import { headers } from "next/headers";
import React from "react";
import Link from "next/link";

const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // LOGIC NOTE: যদি ইউজার লগইন না থাকে, তাহলে লগইন পেজে রিডাইরেক্ট অথবা ফলব্যাক মেসেজ দেখাতে পারেন
  let resData: BookingType[] = [];

  if (session?.user?.email) {
    try {
      const res = await fetch(
        `http://localhost:8000/bookings/${session.user.email}`,
        {
          cache: "no-store", // লেটেস্ট বুকিং ডাটা ফেচ করার জন্য
        }
      );
      if (res.ok) {
        resData = await res.json();
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  }

  return (
    <main className="min-h-screen bg-white px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-medium tracking-tight text-zinc-900 sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage and view your upcoming travel plans
          </p>
        </div>

        {/* Bookings List Container */}
        {resData && resData.length > 0 ? (
          <div className="space-y-5">
            {resData.map((item) => (
              <BookingCart key={item._id} cartData={item} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 py-16 text-center">
            <p className="text-base font-medium text-zinc-700">
              No bookings found
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              You haven&apos;t booked any travel packages yet.
            </p>
            <Link
              href="/destinations"
              className="mt-4 inline-flex items-center gap-1.5 bg-brand px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand/90"
            >
              Explore Destinations
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBookings;
