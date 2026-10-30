"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookingType } from "@/types/bookingType";
import { Calendar, CheckCircle2, Clock, CloudCog, Eye, MapPin, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingCartProps {
  cartData: BookingType;
}

const BookingCart = ({ cartData }: BookingCartProps) => {
  const router = useRouter()
  const {
    _id,
    name,
    price,
    departureDate,
    image,
  } = cartData;

  // LOGIC NOTE: ডেটের সুন্দর ডিসপ্লে ফরম্যাট তৈরি করা (যেমন: May 15, 2026)
  const formatDepartureDate = (dateString?: string) => {
    if (!dateString) return "Flexible Date";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // LOGIC NOTE: ছোট Booking ID প্রদর্শনের জন্য (যেমন b1 অথবা id এর শেষের অংশ)
  const displayBookingId = _id ? `b_${_id.slice(-4)}` : "b1";

  // LOGIC NOTE: যদি স্ট্যাটাস ফিল্ড ডাটায় থাকে (যেমন: 'Confirmed' | 'Pending'), সেটি অনুযায়ী কালার/আইকন ডায়নামিক হতে পারে
  // ডিফল্ট হিসেবে 'Confirmed' রাখা হয়েছে
  const status: "Confirmed" | "Pending" = "Confirmed";

  const handleCancelBooking = async () => {
    // LOGIC NOTE: এখানে বুকিং ক্যানসেল করার জন্য API কল করতে হবে:
    const res = await fetch(`http://localhost:8000/bookings/${_id}`, { method: "DELETE" });
    const data = await res.json();
    router.refresh()

  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm sm:flex-row sm:items-center sm:gap-6 sm:p-5">
      {/* Destination Image */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg sm:aspect-[4/3] sm:w-56 md:w-64">
        <Image
          src={image || "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80"}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 256px"
          className="object-cover"
        />
      </div>

      {/* Booking Details & Actions */}
      <div className="mt-4 flex flex-1 flex-col justify-between gap-4 sm:mt-0 sm:flex-row sm:items-center">
        {/* Info Left */}
        <div className="space-y-2">
          {/* Status Badge */}
          <div>
            {status === "Confirmed" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600">
                <CheckCircle2 className="size-3" />
                Confirmed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-600">
                <Clock className="size-3" />
                Pending
              </span>
            )}
          </div>

          {/* Package Title */}
          <h2 className="text-xl font-serif font-medium tracking-tight text-zinc-900 sm:text-2xl">
            {name}
          </h2>

          {/* Meta Details: Departure & Booking ID */}
          <div className="space-y-1 text-xs text-zinc-500">
            <p className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-zinc-400" />
              <span>Departure: {formatDepartureDate(departureDate)}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-zinc-400" />
              <span>Booking ID: {displayBookingId}</span>
            </p>
          </div>

          {/* Price */}
          <p className="pt-1 text-xl font-bold text-brand sm:text-2xl">
            ${price}
          </p>
        </div>

        {/* Action Buttons Right */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancelBooking}
            className="inline-flex items-center gap-1.5 rounded-none border border-red-200 bg-white px-3.5 py-2 text-xs font-medium text-red-500 transition-colors hover:border-red-300 hover:bg-red-50"
          >
            <Trash2 className="size-3.5 text-red-500" />
            <span>Cancel</span>
          </button>

          {/* View Details Button */}
          {/* LOGIC NOTE: ডিটেইলস পেজের রাউটে নেভিগেট করতে destination id অথবা booking id অনুযায়ী লিঙ্ক দেওয়া যেতে পারে */}
          <Link
            href={`/destinations/${cartData._id}`}
            className="inline-flex items-center gap-1.5 rounded-none bg-brand px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand/90"
          >
            <Eye className="size-3.5" />
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingCart;
