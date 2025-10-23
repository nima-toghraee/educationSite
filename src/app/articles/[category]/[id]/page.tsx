"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Article {
  id: number;
  title: string;
  content: string;
  summary: string;
  category: string;
  thumbnail: string;
  publish_date: string;
  view_count: number;
}

export default function ArticleDetailPage() {
  const params = useParams(); // می‌گیریم پارام‌ها رو از hook
  const articleId = params?.id;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://backend-education-x5ta.onrender.com/api/articles/${articleId}`
        );
        if (!res.ok) throw new Error("خطا در دریافت مقاله");
        const data: Article = await res.json();
        setArticle(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("خطای ناشناخته رخ داد");
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading)
    return <div className="text-center py-20">در حال بارگذاری...</div>;
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!article)
    return <div className="text-center py-20">مقاله‌ای پیدا نشد.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-6">
        دسته‌بندی: {article.category} | بازدید: {article.view_count}
      </p>

      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full rounded-lg mb-6"
        />
      )}

      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}
