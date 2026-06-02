"use client";

import { useRouter } from "next/navigation";
import { FaBookOpen, FaRegNewspaper, FaRegCommentDots } from "react-icons/fa";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "افزودن دوره",
      icon: <FaBookOpen className="w-5 h-5" />,
      className: "bg-blue-500 hover:bg-blue-600",
      onClick: () => router.push("/dashboard/admin/courses"),
    },
    {
      title: "نوشتن مقاله",
      icon: <FaRegNewspaper className="w-5 h-5" />,
      className: "bg-green-500 hover:bg-green-600",
      onClick: () => router.push("/dashboard/admin/articles"),
    },
    {
      title: "مدیریت نظرات",
      icon: <FaRegCommentDots className="w-5 h-5" />,
      className: "bg-red-500 hover:bg-red-600",
      onClick: () => router.push("/dashboard/admin/comments"),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">اقدامات سریع</h2>

      <div className="flex flex-wrap gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            className={`${action.className} text-white font-bold py-2 px-4 rounded-lg shadow flex items-center gap-2 transition`}
          >
            {action.icon}
            {action.title}
          </button>
        ))}
      </div>
    </div>
  );
}
