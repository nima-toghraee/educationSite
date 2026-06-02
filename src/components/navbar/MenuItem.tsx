"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categorySlugMap } from "@/lib/slugify";

interface Category {
  id: number;
  name: string;
}

interface MenuItemProps {
  title: string;
  fetchMain: () => Promise<Category[]>;
  basePath: string;
  isOpen: boolean;
  onToggle: () => void;
}

// تبدیل نام دسته به slug-friendly
function toSlug(name: string) {
  return (
    categorySlugMap[name] || name.trim().replace(/\s+/g, "-").toLowerCase()
  );
}

export default function MenuItem({
  title,
  fetchMain,
  basePath,
  isOpen,
  onToggle,
}: MenuItemProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const menuRef = useRef<HTMLLIElement>(null);

  // useEffect(() => {
  //   if (isOpen && categories.length === 0) {
  //     fetchMain()
  //       .then(setCategories)
  //       .catch((err) => console.error(`Error fetching ${title}:`, err));
  //   }
  // }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetchMain().then((data) => {
        console.log("Data loaded:", data); // این را اضافه کنید تا در کنسول (F12) ببینید دیتا می‌آید یا نه
        setCategories(data);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (isOpen) onToggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <li ref={menuRef} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 hover:text-blue-500 bg-white/80 backdrop-blur-md rounded-md px-4 py-2 transition-all hover:shadow-lg"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white shadow-2xl rounded-xl border border-gray-200 p-3 z-[9999]"
          >
            {categories.map((cat) => (
              <motion.a
                key={cat.id}
                href={`${basePath}/${toSlug(cat.name)}`}
                whileHover={{ scale: 1.03 }}
                className="block px-3 py-2 rounded-md text-right text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                {cat.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
