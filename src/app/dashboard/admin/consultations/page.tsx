import AdminLayout from "../layout";
import ConsultationCard from "./components/ConsultationCard";

export default function ConsultationsPage() {
  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">درخواست‌های مشاوره</h2>
      <ConsultationCard />
    </AdminLayout>
  );
}
