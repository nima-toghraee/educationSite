"use client";

import ArticleGrid from "@/component/ArticleGrid";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Article {
  id: number;
  title: string;
  summary: string;
  category: string;
  thumbnail: string;
}

// mapping از URL انگلیسی به نام فارسی دسته‌بندی
const categoryMap: Record<string, string> = {
  math: "ریاضی",
  physics: "فیزیک",
  mindset: "توانمندی ذهن",
};

export default function ArticlesCategoryPage() {
  const params = useParams();
  const category = params?.category;

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categoryInDb = categoryMap[category as string] || category; // نام دسته‌بندی برای API

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    setError(null);

    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `https://backendeducation-production-6623.up.railway.app/api/articles?category=${encodeURIComponent(
            categoryInDb as string
          )}`
        );
        if (!res.ok) throw new Error("خطا در دریافت داده‌ها");
        const data: Article[] = await res.json();
        setArticles(data);
      } catch (err: unknown) {
        console.error(err);
        if (err instanceof Error) setError(err.message);
        else setError("مشکلی در بارگذاری مقالات رخ داد.");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, categoryInDb]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        مقالات {categoryMap[category as string] || category}
      </h1>

      {loading && <p>در حال بارگذاری...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && articles.length === 0 && (
        <p>هیچ مقاله‌ای در این دسته‌بندی یافت نشد.</p>
      )}

      {!loading && !error && articles.length > 0 && (
        <ArticleGrid articles={articles} loading={loading} />
      )}
    </div>
  );
}
