import AdminLayout from "../layout";
import StatsCard from "./StatsCard";

export default function StatsPage() {
  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">آمار سایت</h2>
      <StatsCard />
    </AdminLayout>
  );
}
