"use client";

import { useEffect, useState } from "react";

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

interface Props {
  params: {
    category: string;
    id: string;
  };
}

export default function ArticleDetailPage({ params }: Props) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/articles/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (!article) return <div>مقاله‌ای پیدا نشد.</div>;

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
