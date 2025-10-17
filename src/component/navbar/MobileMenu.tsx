"use client";

import { navItems } from "./navItems";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";

export default function MobileMenu() {
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = (id: string) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
    <>
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <span className="text-lg font-bold text-gray-800">منو</span>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "✕" : "☰"}</button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <ul className="flex flex-col text-gray-700">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                {item.sub ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(item.id)}
                      className="w-full flex justify-between items-center px-6 py-3 hover:bg-blue-50 transition"
                    >
                      <span>{item.label}</span>
                      <FiChevronDown
                        className={`transition-transform ${
                          openSubMenu === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openSubMenu === item.id && (
                      <ul className="bg-gray-50 space-y-1 pb-2">
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
                  </>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    className={`block px-6 py-3 hover:bg-blue-50 transition ${
                      pathname === item.href
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
