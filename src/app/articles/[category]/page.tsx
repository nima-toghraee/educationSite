"use client";

import ArticleGrid from "@/component/ArticleGrid";
import { useState, useEffect } from "react";

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

interface Props {
  params: {
    category: string; // انگلیسی از URL
  };
}

export default function ArticlesCategoryPage({ params }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { category } = params;
  const categoryInDb = categoryMap[category] || category; // نام دسته‌بندی برای API

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      `http://localhost:5000/api/articles?category=${encodeURIComponent(
        categoryInDb
      )}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("خطا در دریافت داده‌ها");
        return res.json();
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("مشکلی در بارگذاری مقالات رخ داد.");
        setLoading(false);
      });
  }, [categoryInDb]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        مقالات {categoryMap[category] || category}
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
