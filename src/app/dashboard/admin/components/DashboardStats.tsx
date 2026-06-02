import StatsCard from "./StatsCard";
import { getDashboardStats } from "@/services/dashboard.service";

export default async function DashboardStats() {
  const stats = await getDashboardStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="تعداد دوره‌ها"
        value={stats.courses}
        maxValue={150}
        textColor="text-blue-600"
        gradient="bg-gradient-to-r from-blue-400 to-blue-600"
      />

      <StatsCard
        title="تعداد مقالات"
        value={stats.articles}
        maxValue={70}
        textColor="text-green-600"
        gradient="bg-gradient-to-r from-green-400 to-green-600"
      />

      <StatsCard
        title="نظرات در انتظار"
        value={stats.pendingComments}
        maxValue={30}
        textColor="text-red-600"
        gradient="bg-gradient-to-r from-red-400 to-red-600"
      />
    </div>
  );
}
