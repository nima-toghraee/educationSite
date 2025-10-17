"use client";

import Link from "next/link";

interface Article {
  id: number;
  title: string;
  summary: string;
  category: string;
  thumbnail: string;
}

interface ArticleGridProps {
  articles?: Article[]; // Optional
  loading: boolean;
}

export default function ArticleGrid({
  articles = [],
  loading,
}: ArticleGridProps) {
  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!articles.length) {
    return <div>مقاله‌ای برای این دسته وجود ندارد.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {articles
        .filter((a) => a) // فقط مقالات معتبر
        .map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.category.toLowerCase()}/${article.id}`} // category هم اضافه شد
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            <div className="relative w-full h-48">
              {article.thumbnail ? (
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  بدون تصویر
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {article.summary}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
