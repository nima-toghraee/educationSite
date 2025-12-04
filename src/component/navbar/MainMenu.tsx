"use client";

import Link from "next/link";
import { useState } from "react";
import MenuItem from "./MenuItem";
import { getMainCategories } from "@/lib/categories";

export default function MainMenu() {
  // فقط یکی از منوها باز باشه
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleToggle = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <nav className="w-full bg-white shadow-sm border-t border-gray-100">
      <ul className="flex justify-center gap-8 py-3 text-gray-700 text-sm font-medium">
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

        <li className="mt-2">
          <Link href="/about" className="hover:text-blue-600 transition">
            درباره ما
          </Link>
        </li>
      </ul>
    </nav>
  );
}
