"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getArticlesByCategory } from "@/lib/articles";

interface Article {
  id: number;
  title: string;
  summary: string;
  image?: string; // URL عکس مقاله
}

export default function CategoryPage() {
  const { category } = useParams(); // slug دسته
  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  // اطمینان از اینکه category یک رشته است
  const categorySlug = Array.isArray(category) ? category[0] : category;

  useEffect(() => {
    if (categorySlug) {
      getArticlesByCategory(categorySlug)
        .then((data) => {
          console.log("Articles fetched:", data);
          setArticles(data);
        })
        .catch((err) => {
          console.error("Error fetching articles:", err);
        });
    }
  }, [categorySlug]);

  // mapping نام فارسی دسته
  const categoryNameMap: Record<string, string> = {
    math: "ریاضی",
    physics: "فیزیک",
    "mind-skills": "توانمندی ذهن",
    // بقیه دسته‌ها
  };

  const categoryName = categoryNameMap[categorySlug || ""] || categorySlug;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* عنوان دسته وسط صفحه */}
      <h1 className="text-3xl font-bold text-center mb-8">
        مقالات {categoryName}
      </h1>

      {/* لیست مقالات */}
      {articles.length === 0 ? (
        <p className="text-center text-gray-500">هیچ مقاله‌ای پیدا نشد.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles.map((a) => (
            <div
              key={a.id}
              onClick={() => router.push(`/articles/${categorySlug}/${a.id}`)}
              className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              {/* عکس مقاله */}
              {a.image ? (
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                  بدون تصویر
                </div>
              )}

              {/* متن کارت */}
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2">{a.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {a.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
