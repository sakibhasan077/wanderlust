"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Edit3, MapPin } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileCardProps {
  initialUser: {
    name: string;
    location: string;
    image: string;
    memberSince: string;
    nationality: string;
  };
}

export default function ProfileCard({ initialUser }: ProfileCardProps) {
  // ১. ইউজারের প্রোফাইল ডাটা স্টেট (এডিট করার পর যাতে সরাসরি স্ক্রিনে আপডেট দেখা যায়)
  const [user, setUser] = useState(initialUser);
  const [open, setOpen] = useState(false);

  // ২. এডিট ফর্মের জন্য আলাদা ফিল্ড স্টেট
  const [formData, setFormData] = useState({
    name: initialUser.name,
    location: initialUser.location,
    nationality: initialUser.nationality,
  });

  // ৩. ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ৪. ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // স্ক্রিনের ডাটা আপডেট করা
    setUser((prev) => ({
      ...prev,
      name: formData.name,
      location: formData.location,
      nationality: formData.nationality,
    }));

    // ডায়ালগ বন্ধ করা
    setOpen(false);

    // LOGIC NOTE: ভবিষ্যতে ডাটাবেজে সেভ করতে চাইলে এখানে API কল করতে পারেন:
    // await fetch("/api/user/update", { method: "PUT", body: JSON.stringify(formData) });
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs">
      {/* প্রোফাইল ছবি ও ক্যামেরা আইকন */}
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="relative size-28 overflow-hidden rounded-full border-2 border-zinc-100 shadow-xs">
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>

          {/* ফটো আপলোড/ক্যামেরা ব্যাজ বাটন */}
          <button
            type="button"
            className="absolute bottom-1 right-1 flex size-7 items-center justify-center rounded-full bg-brand text-white shadow-sm transition-transform hover:scale-105"
            aria-label="Change profile photo"
          >
            <Camera className="size-3.5" />
          </button>
        </div>

        {/* নাম ও লোকেশন */}
        <h2 className="mt-4 text-xl font-bold tracking-tight text-zinc-900">
          {user.name}
        </h2>
        <p className="mt-1 flex items-center justify-center gap-1 text-xs text-zinc-500">
          <MapPin className="size-3.5 text-zinc-400" />
          <span>{user.location}</span>
        </p>
      </div>

      {/* মেম্বারশিপ ও জাতীয়তা ইনফো */}
      <div className="mt-6 space-y-2 border-t border-zinc-100 pt-4 text-xs">
        <div className="flex items-center justify-between text-zinc-500">
          <span>Member since</span>
          <span className="font-semibold text-zinc-800">{user.memberSince}</span>
        </div>
        <div className="flex items-center justify-between text-zinc-500">
          <span>Nationality</span>
          <span className="font-semibold text-zinc-800">{user.nationality}</span>
        </div>
      </div>

      {/* এডিট প্রোফাইল বাটন ও shadcn Dialog */}
      <div className="mt-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-none bg-brand py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand/90"
              >
                <Edit3 className="size-3.5" />
                <span>Edit Profile</span>
              </button>
            }
          />

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-zinc-900">
                Edit Profile
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="mt-3 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-brand focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-brand focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="w-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-brand focus:bg-white"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <DialogClose
                  render={
                    <button
                      type="button"
                      className="border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                    >
                      Cancel
                    </button>
                  }
                />
                <button
                  type="submit"
                  className="bg-brand px-4 py-2 text-xs font-semibold text-white hover:bg-brand/90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

