"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { id: "home", label: "خانه", href: "/" },
  {
    id: "videos",
    label: "ویدیوهای آموزشی",
    href: "/videos",
    sub: [
      { label: "فیزیک", href: "/videos/physics" },
      { label: "توانمندی ذهن", href: "/videos/mindset" },
    ],
  },
  {
    id: "articles",
    label: "مقالات",
    href: "/articles",
    sub: [
      { label: "فیزیک", href: "/articles/physics" },
      { label: "توانمندی ذهن", href: "/articles/mindset" },
    ],
  },
  { id: "free-videos", label: "ویدیوهای رایگان", href: "/videos/free" },
  { id: "about", label: "درباره من", href: "/aboutPage" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      {/* Desktop Navigation */}
      <ul className="container mx-auto hidden md:flex justify-center gap-8 py-3 text-gray-700">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="relative"
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <Link
              href={item.href}
              className={`px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition ${
                pathname === item.href ? "bg-blue-600 text-white" : ""
              }`}
            >
              {item.label}
            </Link>
            {/* Dropdown for items with submenus */}
            {item.sub && hovered === item.id && (
              <ul className="absolute left-0 w-40 bg-white rounded-lg shadow-lg mt-2 z-50 border py-2 space-y-2">
                {item.sub.map((sub, i) => (
                  <li key={i}>
                    <Link
                      href={sub.href}
                      className="block px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-700 transition"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile / Tablet Menu Button */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <span className="text-lg font-bold text-gray-800">منو</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <ul className="flex flex-col text-gray-700">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <Link
                  href={item.href}
                  className={`block px-6 py-3 hover:bg-blue-50 transition ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {/* Mobile sub-menu, if exists */}
                {item.sub && (
                  <ul className="mt-1 space-y-1">
                    {item.sub.map((sub, i) => (
                      <li key={i}>
                        <Link
                          href={sub.href}
                          className="block px-8 py-2 text-sm hover:bg-blue-100 hover:text-blue-700 transition"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
