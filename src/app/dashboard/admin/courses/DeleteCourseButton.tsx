"use client";

import { useRouter } from "next/navigation";

export default function DeleteCourseButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("حذف این دوره مطمئنی؟")) return;

    const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("حذف دوره ناموفق بود");
      return;
    }

    router.refresh(); // 🔥 لیست دوباره لود میشه
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline ml-4"
    >
      حذف
    </button>
  );
}
