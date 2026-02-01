"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  category: string;
  subSlug?: string;
  progress: number;
}

export const ActiveCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("توکن JWT پیدا نشد. لطفاً دوباره وارد شوید.");
          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/user_courses/active",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          console.error("Fetch failed:", res.status, text);
          throw new Error(`خطا در دریافت دوره‌ها (${res.status})`);
        }

        const data: Course[] = await res.json();

        // حذف دوره‌های تکراری بر اساس id
        const uniqueCourses = Array.from(
          new Map(data.map((course) => [course.id, course])).values()
        );

        setCourses(uniqueCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-sm">در حال بارگذاری دوره‌ها...</p>;
  }

  if (error) {
    return (
      <p className="text-red-600 bg-red-100 p-3 rounded text-sm">{error}</p>
    );
  }

  if (courses.length === 0) {
    return <p className="text-gray-500">هنوز دوره‌ای فعال ندارید.</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">دوره‌های فعال</h2>

      {courses.map((course) => (
        <Link
          key={course.id}
          href={`/courses/${course.category}/${course.subSlug}/${course.id}`}
          className="block"
        >
          <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">{course.title}</span>
              <span className="text-sm text-gray-500">{course.progress}%</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            {course.progress === 100 && (
              <p className="text-xs text-green-600 mt-2">تکمیل شده</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};
