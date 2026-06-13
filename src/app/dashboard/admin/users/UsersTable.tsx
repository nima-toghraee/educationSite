import { User } from "@/types/article";
import UserRow from "./UserRow";

type Props = {
  users: User[];
  loading: boolean;
  onToggle: (id: number) => void;
};

export default function UsersTable({ users, loading, onToggle }: Props) {
  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div className="w-full">
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-right">
            <tr className="border-b">
              <th className="p-4 font-medium">نام</th>
              <th className="p-4 font-medium">ایمیل</th>
              <th className="p-4 font-medium">نقش</th>
              <th className="p-4 font-medium">وضعیت</th>
              <th className="p-4 font-medium">آخرین ورود</th>
              <th className="p-4 font-medium text-center">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <UserRow key={user.id} user={user} onToggle={onToggle} />
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm active:scale-[0.99] transition"
          >
            {/* header */}
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-gray-800">{user.name}</div>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  user.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user.is_active ? "فعال" : "غیرفعال"}
              </span>
            </div>

            {/* email */}
            <div className="text-sm text-gray-500 mb-2">{user.email}</div>

            {/* meta */}
            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span>{user.role_id === 1 ? "ادمین" : "کاربر"}</span>

              <span>
                {user.last_login
                  ? new Date(user.last_login).toLocaleDateString("fa-IR")
                  : "-"}
              </span>
            </div>

            {/* actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onToggle(user.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium transition ${
                  user.is_active
                    ? "bg-yellow-500 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {user.is_active ? "غیرفعال" : "فعال"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
