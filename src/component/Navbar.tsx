"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "home", label: "خانه", href: "/" },
  { id: "videos", label: "ویدیوهای آموزشی", href: "/videos" },
  { id: "articles", label: "مقالات", href: "/articles" },
  { id: "about", label: "درباره من", href: "/aboutPage" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <ul className="container mx-auto flex justify-center gap-8 py-3 text-gray-700">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className={`px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition ${
                pathname === item.href ? "bg-blue-600 text-white" : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
