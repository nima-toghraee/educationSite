import DashboardStats from "./components/DashboardStats";
import QuickActions from "./components/QuickActions";
import LatestActivities from "./components/LatestActivities";

export default function AdminDashboardPage() {
  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActions />
      </div>
    </div>
  );
}
