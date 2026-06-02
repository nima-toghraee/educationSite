"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  MessageSquare,
  CalendarCheck,
  BarChart3,
} from "lucide-react";

const menu = [
  { label: "داشبورد", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "دوره‌ها", href: "/dashboard/admin/courses", icon: BookOpen },
  { label: "مقالات", href: "/dashboard/admin/articles", icon: FileText },
  { label: "نظرات", href: "/dashboard/admin/comments", icon: MessageSquare },
  {
    label: "مشاوره‌ها",
    href: "/dashboard/admin/consultations",
    icon: CalendarCheck,
  },
  { label: "آمار", href: "/dashboard/admin/stats", icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard/admin") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className=" w-64 bg-slate-50 border-r border-slate-200 hidden md:flex flex-col h-screen sticky top-0">
      <nav className="mt-4 flex-1 px-3 space-y-1">
        {menu.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 font-medium
              ${
                active
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* فوتر کوچک سایدبار */}
      <div className="p-4 border-t border-slate-200">
        <p className="text-[10px] text-slate-400 text-center uppercase tracking-wider">
          مدیریت محتوا v1.0
        </p>
      </div>
    </aside>
  );
}
