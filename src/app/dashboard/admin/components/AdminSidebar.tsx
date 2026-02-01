"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "داشبورد", href: "/admin" },
  { label: "دوره‌ها", href: "/admin/courses" },
  { label: "مقالات", href: "/admin/articles" },
  { label: "نظرات", href: "/admin/comments" },
  { label: "مشاوره‌ها", href: "/admin/consultations" },
  { label: "آمار", href: "/admin/stats" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 font-bold text-lg">Admin Panel</div>

      <nav className="space-y-1 px-2">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded px-3 py-2 text-sm transition
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
