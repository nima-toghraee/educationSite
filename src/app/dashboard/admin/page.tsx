import StatsCard from "./stats/StatsCard";

export default function AdminHome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard title="دوره‌ها" value={12} />
      <StatsCard title="مقالات" value={34} />
      <StatsCard title="نظرات در انتظار" value={5} />
    </div>
  );
}
