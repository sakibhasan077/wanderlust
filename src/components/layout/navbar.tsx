"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, User, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const { data: season, isPending } = useSession();
  const user = season?.user;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const handleSignOut = async () => {
    let x = await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };
  const navLink = (
    <>
      {/* Home */}
      <Link
        href={"/"}
        onClick={() => setOpen(false)}
        className={`${pathname === "/" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand" : "text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}
      >
        Home
      </Link>
      {/* Destinations */}
      <Link
        href="/destinations"
        onClick={() => setOpen(false)}
        className={`${pathname === "/destinations" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand" : "text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}
      >
        Destinations
      </Link>

      {/* Add Destinations */}
      <Link
        href="/add-destination"
        onClick={() => setOpen(false)}
        className={`${pathname === "/add-destination" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand" : "text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}
      >
        Add Destinations
      </Link>
      {/* My Bookings */}
      <Link
        href="/bookings"
        onClick={() => setOpen(false)}
        className={`${pathname === "/bookings" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand" : "text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}
      >
        My Bookings
      </Link>
      {/* Admin */}
      {/* <Link
        href="/admin"
        onClick={() => setOpen(false)}
        className={`${pathname === "/admin" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand" : "text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}
      >
        Admin
      </Link> */}
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-4">
      <div className="border-b border-black/5 bg-white shadow-xs">
        <div className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Desktop nav links */}
          <nav className="hidden items-center gap-6 md:gap-3 lg:gap-6 md:flex">
            {navLink}
          </nav>

          {/* Mobile: menu toggle */}
          <button
            // nativeButton = {false}
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
              className={`flex items-center gap-1.5 ${pathname === "/profile" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand" : "text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}
            >
              <User className="size-4" aria-hidden />
              Profile
            </Link>
            {user ? (
              <>
                <Popover>
                  <PopoverTrigger
                    nativeButton = {false}
                    render={
                      <Avatar>
                        <AvatarImage
                          src={user?.image || ""}
                          alt="avatar"
                          className=""
                        />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    }
                  />
                  <PopoverContent align="start">
                    <PopoverHeader>
                      <PopoverTitle>{user.name}</PopoverTitle>
                      <PopoverDescription>{user.email}</PopoverDescription>
                      <Button
                        type="button"
                        onClick={handleSignOut}
                        variant={"destructive"}
                      >
                        Sign Out <LogOut></LogOut>{" "}
                      </Button>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`${pathname === "/login" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand" : "text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className={`${pathname === "/signup" ? "border-b-2 border-brand pb-0.5 text-sm font-medium text-brand" : "text-sm font-medium text-zinc-700 transition-colors hover:text-brand"}`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile: login shortcut (full auth list lives in the dropdown) */}
          <div className="md:hidden">
            {user ? (
              <>
                <Popover>
                  <PopoverTrigger
                    nativeButton = {false}
                    render={
                      <Avatar>
                        <AvatarImage
                          src={user?.image || ""}
                          alt="avatar"
                          className=""
                        />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    }
                  />
                  <PopoverContent align="start">
                    <PopoverHeader>
                      <PopoverTitle>{user.name}</PopoverTitle>
                      <PopoverDescription>{user.email}</PopoverDescription>
                      <Button
                        type="button"
                        onClick={handleSignOut}
                        variant={"destructive"}
                      >
                        Sign Out <LogOut></LogOut>{" "}
                      </Button>
                    </PopoverHeader>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand md:hidden"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium text-zinc-700 transition-colors hover:text-brand"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="border-t border-black/5 px-4 py-2 md:hidden "
          >
            <div className="w-fit flex flex-col gap-6">{navLink}</div>
            <div className="mt-3 flex gap-5 border-t border-black/5 pt-3 pb-2 text-sm font-medium text-zinc-700">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 transition-colors hover:text-brand"
              >
                <User className="size-4" aria-hidden />
                Profile
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
