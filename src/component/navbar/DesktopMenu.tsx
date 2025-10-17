"use client";

import { navItems } from "./navItems";
import NavItem from "./NavItem";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function DesktopMenu() {
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);

  // بستن زیرمنو با کلیک بیرون
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenSubMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSubMenu = (id: string) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
    <ul
      ref={navRef}
      className="hidden md:flex justify-center items-center gap-8 py-3 text-gray-700"
    >
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isOpen={openSubMenu === item.id}
          onToggle={toggleSubMenu}
          pathname={pathname}
          onClose={() => setOpenSubMenu(null)}
        />
      ))}
    </ul>
  );
}
