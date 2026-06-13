"use client";

type Consultation = {
  id: number;
  name: string;
  phone: string;
  email: string;
  grade_level: string;
  description: string;
  contacted: number;
  created_at: string;
};

type Props = {
  data: Consultation[];
  onToggle: (id: number, value: number) => void;
};

export default function ConsultationTable({ data, onToggle }: Props) {
  return (
    <div className="w-full">
      {/* ================= TABLE DESKTOP / TABLET ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-sm">
            <thead className="bg-gray-50 text-right text-gray-600">
              <tr className="border-b">
                <th className="p-4 font-medium">نام</th>
                <th className="p-4 font-medium">موبایل</th>
                <th className="p-4 font-medium">ایمیل</th>
                <th className="p-4 font-medium">وضعیت</th>
                <th className="p-4 font-medium">تاریخ</th>
                <th className="p-4 font-medium text-center">عملیات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{item.name}</td>

                  <td className="p-4 text-gray-700">{item.phone}</td>

                  <td className="p-4 text-gray-500 max-w-[200px] truncate">
                    {item.email}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.contacted
                          ? "bg-green-50 text-green-600 border border-green-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}
                    >
                      {item.contacted ? "تماس گرفته" : "جدید"}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(item.created_at).toLocaleDateString("fa-IR")}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          onToggle(item.id, item.contacted ? 0 : 1)
                        }
                        className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition"
                      >
                        تغییر وضعیت
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{item.name}</h3>

                <p className="text-sm text-gray-500 mt-1">{item.phone}</p>

                <p className="text-sm text-gray-400 truncate max-w-[220px]">
                  {item.email}
                </p>
              </div>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.contacted
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}
              >
                {item.contacted ? "تماس گرفته" : "جدید"}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-xs text-gray-500">
                {new Date(item.created_at).toLocaleDateString("fa-IR")}
              </span>

              <button
                onClick={() => onToggle(item.id, item.contacted ? 0 : 1)}
                className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition"
              >
                تغییر وضعیت
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
