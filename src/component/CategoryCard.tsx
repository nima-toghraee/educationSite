"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getMainCategories } from "@/lib/categories";
import { slugify } from "@/lib/slugify";

interface Category {
  id: number;
  name: string;
  course_count?: number;
}

const colors = [
  "bg-blue-400",
  "bg-green-400",
  "bg-red-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
];

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMainCategories()
      .then((data: Category[]) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-white text-center mt-10">در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {categories.map((cat, idx) => {
        const color = colors[idx % colors.length];
        return (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl shadow-lg backdrop-blur-md bg-white/10 border border-white/20 cursor-pointer overflow-hidden"
          >
            <Link
              href={`/courses/${slugify(cat.name)}`}
              className="flex flex-col items-center justify-center p-6 gap-3"
            >
              <div
                aria-label={`دسته ${cat.name}`}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl ${color}`}
              >
                {cat.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-center text-black">
                {cat.name}
              </h3>
              <span
                className="px-2 py-1 text-xs font-medium bg-white/20 rounded-full text-black"
                aria-label={`${cat.course_count ?? 0} دوره`}
              >
                {cat.course_count ?? 0} دوره
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
