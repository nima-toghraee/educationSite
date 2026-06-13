"use client";

import { Article } from "@/types/article";
import { useState } from "react";
import Link from "next/link";

type Props = {
  articles: Article[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const PAGE_SIZE = 5;

export default function ArticleTable({ articles, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(articles.length / PAGE_SIZE);

  const paginated = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("از حذف مقاله مطمئنی؟");

    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "خطا در حذف مقاله");
      }

      onDelete?.(id);

      alert("مقاله حذف شد");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
      {/* HEADER (desktop/tablet only) */}
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] bg-gray-50 px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
        <span>عنوان</span>
        <span>نویسنده</span>
        <span>دسته</span>
        <span>تاریخ</span>
        <span className="text-right">عملیات</span>
      </div>

      {/* ROWS */}
      <div className="divide-y divide-gray-100">
        {paginated.map((article) => (
          <div
            key={article.id}
            className="
          grid 
          grid-cols-1 
          md:grid-cols-[2fr_1fr_1fr_1fr_1fr]
          gap-3 md:gap-0
          px-4 md:px-6 py-4
          hover:bg-blue-50/40 transition
        "
          >
            {/* TITLE */}
            <div className="flex items-center gap-3 min-w-0">
              {article.thumbnail ? (
                <img
                  src={article.thumbnail}
                  className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gray-100" />
              )}

              <div className="min-w-0">
                <div className="font-semibold text-gray-800 truncate">
                  {article.title}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {article.summary}
                </div>
              </div>
            </div>

            {/* AUTHOR */}
            <div className="md:flex md:items-center text-gray-600 text-sm">
              <span className="md:hidden text-gray-400 text-xs">نویسنده: </span>
              {article.author_name ?? "-"}
            </div>

            {/* CATEGORY */}
            <div className="md:flex md:items-center">
              <span className="md:hidden text-gray-400 text-xs">دسته: </span>
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                {article.category_name}
              </span>
            </div>

            {/* DATE */}
            <div className="md:flex md:items-center text-gray-500 text-xs">
              <span className="md:hidden text-gray-400 text-xs">تاریخ: </span>
              {new Date(article.publish_date).toLocaleDateString("fa-IR")}
            </div>

            {/* ACTIONS */}
            <div className="flex md:justify-end gap-2 mt-2 md:mt-0">
              <Link
                href={`/dashboard/admin/articles/${article.id}/edit`}
                className="px-3 py-1.5 text-xs rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
              >
                ویرایش
              </Link>

              <button onClick={() => handleDelete(article.id)}>حذف</button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {articles.length === 0 && (
        <div className="p-10 text-center text-gray-400 text-sm">
          هیچ مقاله‌ای وجود ندارد
        </div>
      )}

      {/* PAGINATION */}
      {articles.length > PAGE_SIZE && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t bg-gray-50/50">
          <span className="text-xs text-gray-500">
            صفحه {page} از {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-1.5 text-xs rounded-lg border bg-white disabled:opacity-40"
            >
              قبلی
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-1.5 text-xs rounded-lg border bg-white disabled:opacity-40"
            >
              بعدی
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
