"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Article = {
  id: string;
  title: string;
  summary: string;
};

const mindsetArticles: Article[] = [
  {
    id: "mind-habits",
    title: "عادات ذهنی قدرتمند",
    summary: "چطور ذهن خود را برای موفقیت آماده کنیم...",
  },
  {
    id: "stress-control",
    title: "کنترل استرس در نوجوانان",
    summary: "توانمندسازی ذهن برای شرایط استرس‌زا...",
  },
];

export default function MindsetArticlesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-900 text-center">
        مقالات توانمندی ذهن
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mindsetArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300"
          >
            <Link
              href={`/articles/${article.id}`}
              className="text-lg md:text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
            >
              {article.title}
            </Link>

            <p className="mt-2 text-gray-600 text-sm md:text-base line-clamp-2">
              {article.summary}
            </p>

            <Link
              href={`/articles/${article.id}`}
              className="mt-3 inline-block text-blue-600 text-sm font-medium"
            >
              ادامه مطلب →
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
