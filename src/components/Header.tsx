"use client";

import Link from "next/link";
import Image from "next/image";
import { FiUser, FiLogOut, FiSettings, FiBook } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import SearchInput from "./SearchInput";
import { useEffect, useRef, useState } from "react";

function Header() {
  const { user, logout } = useAuth();

  // فرض: role داخل user هست
  const isAdmin = user?.role_id === 1;
  const isUser = user?.role === 2;

  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // بستن dropdown با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!hydrated) return null;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-[120px] sm:w-[160px] h-[40px] sm:h-[60px]">
            <Image
              src="/lampe.svg"
              alt="لوگوی پلتفرم آموزشی"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Search (desktop) */}
        <div className="hidden md:block flex-1 mx-4">
          <SearchInput />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4 relative">
          {user ? (
            <div ref={menuRef} className="relative">
              {/* User Icon */}
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-1 rounded-full hover:bg-gray-100 transition"
                aria-label="منوی کاربر"
              >
                <FiUser size={22} />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 text-sm overflow-hidden">
                  {/* پنل کاربر */}
                  <Link
                    href="/dashboard/user"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    <FiUser />
                    پنل کاربری
                  </Link>

                  {!isAdmin && (
                    <Link
                      href="/dashboard/my-courses"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                      onClick={() => setOpen(false)}
                    >
                      <FiBook />
                      دوره‌های من
                    </Link>
                  )}

                  {/* فقط برای ادمین */}
                  {isAdmin && (
                    <a
                      href="/dashboard/admin"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition"
                      onClick={() => setOpen(false)}
                    >
                      <FiSettings />
                      پنل ادمین
                    </a>
                  )}

                  {/* خروج */}
                  <button
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    <FiLogOut />
                    خروج
                  </button>
                </div>
              )}
            </div>
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

      {/* Search (mobile) */}
      <div className="md:hidden px-3 pb-2">
        <SearchInput />
      </div>
    </header>
  );
}

export default Header;
