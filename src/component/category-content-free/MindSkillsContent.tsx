"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/slugify";
import { getMainCategories, getSubCategories } from "@/lib/categories";

interface MainCategory {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

interface SubCategory {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

interface ContentProps {
  categorySlug: string;
}

export default function MindSkillsContentFree({ categorySlug }: ContentProps) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubCategories() {
      try {
        setLoading(true);
        setError(null);

        const mainCategories: MainCategory[] = await getMainCategories();
        const targetCategory = mainCategories.find(
          (cat) => slugify(cat.name) === categorySlug
        );

        if (!targetCategory) {
          setError(`دسته‌ای با اسلاگ "${categorySlug}" یافت نشد.`);
          return;
        }

        const subs: SubCategory[] = await getSubCategories(targetCategory.id);
        setSubCategories(subs);
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setError("خطا در دریافت زیر‌دسته‌ها");
      } finally {
        setLoading(false);
      }
    }

    fetchSubCategories();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-64" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center p-10">{error}</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-600 text-center">
        توانمندی ذهن
      </h1>

      <p className="text-gray-700 leading-relaxed mb-8 text-justify">
        این بخش شامل دوره‌های مربوط به تمرکز، حافظه و رشد مهارت‌های ذهنی است.
      </p>

      {subCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subCategories.map((sub) => {
            const subSlug = sub.name ? slugify(sub.name) : "sub-category";
            return (
              <div
                key={sub.id}
                className="bg-white/60 backdrop-blur-md shadow-lg rounded-2xl p-4 hover:shadow-2xl transition-all border border-gray-200"
              >
                {sub.image && (
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="rounded-xl w-full h-40 object-cover mb-3"
                  />
                )}

                <h2 className="text-lg font-semibold text-blue-700 mb-2">
                  {sub.name}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {sub.description || "بدون توضیحات"}
                </p>

                <Link
                  href={`/free-courses/${categorySlug}/${subSlug}`}
                  className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
                >
                  مشاهده دوره‌ها
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8">
          زیردسته‌ای برای نمایش وجود ندارد.
        </p>
      )}
    </div>
  );
}
