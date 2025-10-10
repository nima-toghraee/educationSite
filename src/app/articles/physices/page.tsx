import Link from "next/link";
import { motion } from "framer-motion";

const physicsArticles = [
  {
    id: "physics-1",
    title: "آشنایی با مفاهیم فیزیک",
    summary: "آغاز یادگیری مفاهیم پایه فیزیک...",
  },
];

export default function PhysicsArticlesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-extrabold mb-8 text-gray-900 text-center">
        مقالات فیزیک
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {physicsArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all duration-300"
          >
            <Link
              href={`/articles/${article.id}`}
              className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
            >
              {article.title}
            </Link>
            <p className="mt-2 text-gray-600">{article.summary}</p>
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
