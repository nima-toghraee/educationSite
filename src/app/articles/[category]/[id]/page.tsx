"use client";

import { getArticleById } from "@/lib/articles";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, User } from "lucide-react"; // آیکون‌ها از lucide-react

interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  image?: string;
  author_name?: string;
  publish_date?: string;
  category_name?: string;
}

export default function ArticlePage() {
  const { id } = useParams(); // این id مقاله است
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      const articleId = Array.isArray(id)
        ? parseInt(id[0], 10)
        : parseInt(id, 10);
      getArticleById(articleId)
        .then(setArticle)
        .catch(() => setArticle(null));
    }
  }, [id]);

  if (!article) return <p className="text-center mt-8">مقاله یافت نشد.</p>;

  // قالب‌بندی تاریخ (فارسی)
  const formattedDate = article.publish_date
    ? new Date(article.publish_date).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* دسته مقاله */}
      {article.category_name && (
        <p className="text-sm text-blue-600 font-medium mb-2">
          {article.category_name}
        </p>
      )}

      {/* عنوان مقاله */}
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

      {/* عکس مقاله */}
      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-80 object-cover rounded-lg mb-8 shadow-lg"
        />
      ) : (
        <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg mb-8 shadow-inner text-gray-400">
          بدون تصویر
        </div>
      )}

      {/* محتوای مقاله */}
      <div className="prose prose-lg max-w-full mb-8 text-gray-700">
        <p>{article.content}</p>
      </div>

      {/* نویسنده و تاریخ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-500 text-sm">
        {article.author_name && (
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>نویسنده: {article.author_name}</span>
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
