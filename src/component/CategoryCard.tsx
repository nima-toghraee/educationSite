"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  category: string;
  title: string;
}

interface Category {
  name: string;
  slug: string;
  count: number;
}

export default function CategoryCards() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(
          "https://backendeducation-production-6623.up.railway.app/api/courses"
        );
        const data: Course[] = await res.json();

        // استخراج دسته‌بندی‌ها و شمارش تعداد کورس‌ها
        const counts: Record<string, number> = {};
        data.forEach((course) => {
          const slug = course.category.toLowerCase();
          counts[slug] = (counts[slug] || 0) + 1;
        });

        // تبدیل به آرایه Category
        const cats: Category[] = Object.keys(counts).map((slug) => ({
          slug,
          name: slug.charAt(0).toUpperCase() + slug.slice(1), // اسم با حرف اول بزرگ
          count: counts[slug],
        }));

        setCategories(cats);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        دسته‌بندی ویدیوهای آموزشی 🎓
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
          >
            <Link href={`/videos/${cat.slug}`}>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                  {cat.name[0]}
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500">{cat.count} دوره موجود</p>

                <span className="text-blue-600 text-sm mt-2 hover:underline">
                  مشاهده ویدیوها →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
