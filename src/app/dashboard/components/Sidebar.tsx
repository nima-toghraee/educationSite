"use client";

import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 min-h-screen text-right">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="hover:text-green-500">
            خانه
          </Link>
        </li>
        <li>
          <Link href="/dashboard/courses" className="hover:text-green-500">
            دوره‌های من
          </Link>
        </li>
        <li>
          <Link href="/dashboard/activities" className="hover:text-green-500">
            فعالیت‌های اخیر
          </Link>
        </li>
        <li>
          <Link href="/dashboard/resources" className="hover:text-green-500">
            منابع
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/notifications"
            className="hover:text-green-500"
          >
            اعلان‌ها
          </Link>
        </li>
      </ul>
    </aside>
  );
};
