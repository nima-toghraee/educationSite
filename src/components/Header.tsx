"use client";

import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";

function Header() {
  const { user } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // قبل Hydration چیزی نمایش نده

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-[120px] sm:w-[160px] h-[40px] sm:h-[60px] overflow-hidden rounded-md transition-transform duration-300 hover:scale-105">
            <Image
              src="/lampe.svg"
              alt="Logo"
              fill
              className="object-contain hover:opacity-90 transition-opacity duration-300"
            />
          </div>
        </Link>

        {/* Search bar (desktop) */}
        <div className="hidden md:block flex-1 mx-4">
          <SearchInput />
        </div>

        {/* Navigation & Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard/user
              "
              >
                <FiUser
                  size={22}
                  className="hover:text-blue-600 transition cursor-pointer"
                />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                ورود
              </Link>
              <Link
                href="/auth/register"
                className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                ثبت‌نام
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Search bar (mobile) */}
      <div className="md:hidden px-3 pb-2">
        <SearchInput />
      </div>
    </header>
  );
}

export default Header;
