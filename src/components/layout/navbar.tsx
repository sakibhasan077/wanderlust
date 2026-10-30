"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navLink =<>
  {/* Home */}
    <Link href={"/"} onClick={() => setOpen(false)} className={`${pathname === "/" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand":"text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}>Home</Link>
    {/* Destinations */}
    <Link href = "/destinations" onClick={() => setOpen(false)} className={`${pathname === "/destinations" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand":"text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}>Destinations</Link>
    {/* My Bookings */}
    <Link href = "/bookings" onClick={() => setOpen(false)} className={`${pathname === "/bookings" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand":"text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}>My Bookings</Link>
    {/* Admin */}
    <Link href = "/admin" onClick={() => setOpen(false)} className={`${pathname === "/admin" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand":"text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}>Admin</Link>
  </>


  return (
    <header className="fixed inset-x-0 top-0 z-50 p-4">
      <div className="border-b border-black/5 bg-white shadow-xs">
        <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Desktop nav links */}
          <nav className="hidden items-center gap-6 md:gap-3 lg:gap-6 md:flex">
            {
              navLink
            }
          </nav>

          {/* Mobile: menu toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center text-zinc-700 transition-colors hover:text-brand md:hidden"
            onClick={() => setOpen((wasOpen) => !wasOpen)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-xl font-black text-brand sm:text-2xl"
          >
            Wanderlust
          </Link>

          {/* Desktop auth links */}
          <div className="hidden items-center gap-5 text-sm font-medium text-zinc-700 md:flex">
            <Link
              href="/profile"
              className={`flex items-center gap-1.5 ${pathname === "/profile" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand":"text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}
            >
              <User className="size-4" aria-hidden />
              Profile
            </Link>
            <Link href="/login" className={`${pathname === "/login" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand":"text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}>
              Login
            </Link>
            <Link href="/sign-up" className={`${pathname === "/signup" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand":"text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}>
              Sign Up
            </Link>
          </div>

          {/* Mobile: login shortcut (full auth list lives in the dropdown) */}
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand md:hidden"
          >
            Login
          </Link>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="border-t border-black/5 px-4 py-2 md:hidden "
          >
            <div className="w-fit flex flex-col gap-6">
              {navLink}
            </div>
            <div className="mt-3 flex gap-5 border-t border-black/5 pt-3 pb-2 text-sm font-medium text-zinc-700">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 transition-colors hover:text-brand"
              >
                <User className="size-4" aria-hidden />
                Profile
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-brand"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
