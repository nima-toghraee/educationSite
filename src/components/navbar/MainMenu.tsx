"use client";

import Link from "next/link";
import { useState } from "react";
import MenuItem from "./MenuItem";
import { getMainCategories } from "@/lib/categories";
import { FaBars, FaTimes } from "react-icons/fa";

export default function MainMenu() {
  // فقط یکی از زیرمنوها باز باشد
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // موبایل: منو باز/بسته
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <nav className="w-full bg-white shadow-sm border-t border-gray-100 relative">
      {/* دکمه همبرگر موبایل */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <span className="font-bold text-gray-700">منو</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-gray-700 text-xl focus:outline-none"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* منو اصلی */}
      <ul
        className={`flex-col md:flex md:flex-row md:justify-center md:gap-8 py-3 text-gray-700 text-sm font-medium bg-white md:bg-transparent absolute md:static w-full md:w-auto left-0 md:left-auto transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-screen" : "max-h-0 md:max-h-full"
        }`}
      >
        <MenuItem
          title="دوره‌ها"
          fetchMain={getMainCategories}
          basePath="/courses"
          isOpen={openMenu === "courses"}
          onToggle={() => handleToggle("courses")}
        />

        <MenuItem
          title="مقالات"
          fetchMain={getMainCategories}
          basePath="/articles"
          isOpen={openMenu === "articles"}
          onToggle={() => handleToggle("articles")}
        />

        <MenuItem
          title="دوره‌های رایگان"
          fetchMain={getMainCategories}
          basePath="/free-courses"
          isOpen={openMenu === "free"}
          onToggle={() => handleToggle("free")}
        />

        <li className="mt-2 md:mt-0 text-center md:text-left">
          <Link
            href="/about"
            className="hover:text-blue-600 transition block px-4 py-2 md:p-0"
          >
            درباره ما
          </Link>
        </li>
      </ul>
    </nav>
  );
}
