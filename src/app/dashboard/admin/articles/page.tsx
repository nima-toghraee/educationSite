import { getDashboardStats } from "@/services/dashboard.service";
import StatsCard from "../components/StatsCard";
import { getArticles } from "@/lib/articles";
import ArticleTable from "./component/ArticleTable";
import AdminPageHeader from "./component/AdminPageHeader";
import ArticlesContent from "./component/ArticlesContent";
import { getMainCategories } from "@/lib/categories";

export default async function ArticlesPage() {
  const [stats, articles, categories] = await Promise.all([
    getDashboardStats(),
    getArticles(),
    getMainCategories(),
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <AdminPageHeader
        title="مقالات"
        buttonText="+ مقاله جدید"
        buttonHref="/dashboard/admin/articles/new"
      />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="کل مقالات"
          value={stats.articles}
          maxValue={100}
          gradient="bg-gradient-to-r from-blue-500 to-blue-600"
          textColor="text-blue-600"
        />
      </div>
      <ArticlesContent initialArticles={articles} categories={categories} />
    </div>
  );
}
