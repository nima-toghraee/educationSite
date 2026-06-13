"use client";

import { useEffect, useState } from "react";
import ArticleTable from "./ArticleTable";
import { Article } from "@/types/article";
import { getArticles } from "@/lib/articles";

type Props = {
  initialArticles: Article[];
  categories: {
    id: number;
    name: string;
  }[];
};

export default function ArticlesContent({
  initialArticles,
  categories,
}: Props) {
  const [articles, setArticles] = useState(initialArticles);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [search, setSearch] = useState("");

  // debounce search + filter
  useEffect(() => {
    const handler = setTimeout(async () => {
      const data = await getArticles({
        q: search || undefined,
        categoryId: selectedCategory ? Number(selectedCategory) : undefined,
      });

      setArticles(data);
    }, 400);

    return () => clearTimeout(handler);
  }, [search, selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      {/* FILTER + SEARCH */}
      <div className="flex flex-col md:flex-row gap-3 justify-between mb-5">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="جستجو در عنوان یا توضیحات..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 rounded-xl border border-gray-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* CATEGORY */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full md:w-1/3 rounded-xl border border-gray-200 px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">همه دسته‌بندی‌ها</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <ArticleTable
        articles={articles}
        onDelete={(id) => {
          setArticles((prev) => prev.filter((article) => article.id !== id));
        }}
      />
    </>
  );
}
