import React from "react";
import { headers } from "next/headers";
import { Plane, Globe, TrendingUp, DollarSign } from "lucide-react";
import { auth } from "@/lib/auth";
import ProfileCard from "@/components/profile/ProfileCard";

// Server Component
const ProfilePage = async () => {
  // ১. সেশন থেকে লগইন করা ইউজারের ডাটা নেওয়া
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ২. বুকিং ডাটা ফেচ করা (টোটাল বুকিং সংখ্যা বের করার জন্য)
  let totalBookingsCount = 12; // ডিফল্ট বা ফলব্যাক ভ্যালু
  if (session?.user?.email) {
    try {
      const res = await fetch(
        `http://localhost:8000/bookings/${session.user.email}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const bookings = await res.json();
        if (Array.isArray(bookings) && bookings.length > 0) {
          totalBookingsCount = bookings.length;
        }
      }
    } catch {
      // ব্যাকএন্ড অফলাইন থাকলে ফলব্যাক ভ্যালু থাকবে
    }
  }

  // ৩. ইউজারের প্রাথমিক ইনফরমেশন (সেশন থাকলে সেশনের নাম, বাকিগুলো সিম্পল ফলব্যাক ডাটা)
  const initialUser = {
    name: session?.user?.name || "Sarah Mitchell",
    location: "San Francisco, CA",
    image:
      session?.user?.image ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
    memberSince: "Mar 2024",
    nationality: "United States",
  };

  // ৪. ট্রাভেল স্ট্যাটিস্টিকস কার্ডের ডাটা
  const stats = [
    {
      title: "Total Bookings",
      value: totalBookingsCount,
      icon: Plane,
      iconColor: "text-sky-500",
      bgColor: "bg-sky-50",
    },
    {
      title: "Countries Visited",
      value: "18",
      icon: Globe,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Upcoming Trips",
      value: "2",
      icon: TrendingUp,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Total Spent",
      value: "$15,750",
      icon: DollarSign,
      iconColor: "text-fuchsia-500",
      bgColor: "bg-fuchsia-50",
    },
  ];

  return (
    <main className="min-h-screen bg-white px-4 pt-28 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* হেডার সেকশন */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your account settings and travel preferences
          </p>
        </div>

        {/* মেইন লেআউট গ্রিড: বামে প্রোফাইল কার্ড, ডানে ট্রাভেল স্ট্যাটিস্টিকস */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {/* বামের প্রোফাইল কার্ড (Client Component যাতে সহজেই Edit করা যায়) */}
          <div className="lg:col-span-1">
            <ProfileCard initialUser={initialUser} />
          </div>

          {/* ডানের Travel Statistics */}
          <div className="lg:col-span-2">
            <h2 className="text-base font-semibold text-zinc-900">
              Travel Statistics
            </h2>

            {/* ৪টি স্ট্যাট কার্ডের ২-কলাম গ্রিড */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={stat.title}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-xs"
                  >
                    <div>
                      <p className="text-xs font-medium text-zinc-400">
                        {stat.title}
                      </p>
                      <p className="mt-1.5 text-2xl font-bold text-zinc-900">
                        {stat.value}
                      </p>
                    </div>

                    <div
                      className={`flex size-11 items-center justify-center rounded-full ${stat.bgColor} ${stat.iconColor}`}
                    >
                      <IconComponent className="size-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
