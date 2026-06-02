"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Lesson = {
  id: number;
  title: string;
  order?: number;
};

export default function LessonList({
  lessons,
  courseId,
  token,
}: {
  lessons: Lesson[];
  courseId: number;
  token: string | null;
}) {
  const router = useRouter();

  const handleDelete = async (lessonId: number) => {
    if (!confirm("حذف این لسن مطمئنی؟")) return;

    const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      alert("حذف لسن ناموفق بود");
      return;
    }

    router.refresh();
  };

  if (!lessons || lessons.length === 0) {
    return (
      <div className="border border-dashed rounded-xl p-10 text-center bg-white">
        <p className="text-gray-500 mb-3">هنوز لسنی برای این دوره ثبت نشده</p>
        <Link
          href={`/dashboard/admin/courses/${courseId}/lessons/new`}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          افزودن اولین لسن
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {lessons
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white border rounded-xl px-4 py-3 flex items-center justify-between hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              {lesson.order !== undefined && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                  {lesson.order}
                </span>
              )}
              <p className="font-medium text-gray-900">{lesson.title}</p>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`/dashboard/admin/courses/${courseId}/lessons/${lesson.id}`}
                className="text-blue-600 hover:text-blue-700"
              >
                ویرایش
              </Link>

              <button
                onClick={() => handleDelete(lesson.id)}
                className="text-red-600 hover:text-red-700"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
