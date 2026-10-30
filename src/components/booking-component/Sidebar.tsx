"use client"
import { Destination } from "@/types/destination";
import { Calendar, Check, Clock, Users } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth-client";

const inclusions = [
  "Accommodation included",
  "Travel insurance required",
  "24/7 customer support",
  "All meals included",
  "Airport transfers",
  "Professional tour guide",
];

const Sidebar = ({ data }: { data: Destination }) => {
    const { data: season, isPending } = useSession();
    const user = season?.user;
  const handleBooking = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const {departureDate} = Object.fromEntries(formData.entries())
    const resData = {
      userName: user?.name,
      userEmail: user?.email,
      ...data,
      departureDate: departureDate,
      bookingDate : new Date(),
    }
    const res = await fetch("http://localhost:8000/bookings",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resData)
    })
    const result = await res.json()
  }
  return (
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
        <form onSubmit={handleBooking}>
          {/* Book now */}
          <Input
            aria-label="Departure date"
            name = "departureDate"
            type="date"
            defaultValue={data.departureDate}
            className="mt-4 rounded-none"
          />
          <button
            type="submit"
            className="mt-5 w-full bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
          >
            Book Now
          </button>
        </form>

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
  );
};

export default Sidebar;
