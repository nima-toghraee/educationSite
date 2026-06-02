import { getActivities } from "@/services/dashboard.service";

export default async function LatestActivities() {
  const data = await getActivities();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">آخرین فعالیت‌ها</h2>

      <ul className="space-y-4">
        {data.activities.map((a, i) => (
          <li key={i} className="flex gap-3 border-b pb-3">
            <div>
              <p className="font-semibold">{a.title}</p>
              <p className="text-sm text-gray-600">{a.description}</p>
              <p className="text-xs text-gray-400">{a.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
