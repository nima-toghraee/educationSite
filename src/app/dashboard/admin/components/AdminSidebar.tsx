"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  MessageSquare,
  CalendarCheck,
  UserRound,
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
  { label: "کاربران", href: "/dashboard/admin/users", icon: UserRound },
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
    <aside
      className="w-64 h-screen sticky top-0 hidden md:flex flex-col 
bg-gradient-to-b from-slate-50 to-white 
border-r border-slate-200/70 shadow-sm"
    >
      {/* HEADER SMALL BRAND AREA */}
      <div className="px-4 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">پنل مدیریت</h2>
            <p className="text-[11px] text-slate-400">Dashboard System</p>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
          
          ${
            active
              ? "bg-blue-600 text-white shadow-md shadow-blue-200/40"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
            >
              {/* ACTIVE LEFT BAR */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all
            ${active ? "bg-white" : "bg-transparent group-hover:bg-blue-500"}`}
              />

              <Icon
                className={`w-5 h-5 transition-transform duration-200
            ${active ? "scale-110" : "group-hover:scale-105"}`}
              />

              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-slate-100 bg-white/60 backdrop-blur">
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Admin Panel v1.0
          </p>

          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>
    </aside>
  );
}
