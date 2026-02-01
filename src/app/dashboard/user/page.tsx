"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBookOpen, FaCheckCircle } from "react-icons/fa";

interface Course {
  id: number;
  title: string;
  category: string;
  subSlug?: string;
  progress: number;
}

// کامپوننت لینک داینامیک
function CourseLink({
  course,
  children,
  className,
}: {
  course: Course;
  children: React.ReactNode;
  className?: string;
}) {
  const href = course.subSlug
    ? `/courses/${course.category}/${course.subSlug}/${course.id}`
    : `/courses/${course.category}/filter/${course.id}`;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function DashboardPage() {
  const [activeCourses, setActiveCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("کاربر وارد نشده است");
          setActiveCourses([]);
          return;
        }

        const res = await fetch(
          "http://localhost:5000/api/user_courses/active",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error("خطا در دریافت دوره‌ها");

        const data: Course[] = await res.json();

        // حذف دوره‌های تکراری بر اساس id
        const uniqueCourses = Array.from(
          new Map(data.map((course) => [course.id, course])).values()
        );

        setActiveCourses(uniqueCourses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCourses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Overview Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl shadow p-6 flex items-center space-x-4 rtl:space-x-reverse">
          <FaBookOpen className="text-4xl opacity-90" />
          <div>
            <h3 className="text-lg font-semibold">دوره‌های فعال</h3>
            <p className="text-white/90 text-sm">
              {activeCourses.length} دوره فعال
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-2xl shadow p-6 flex items-center space-x-4 rtl:space-x-reverse">
          <FaCheckCircle className="text-4xl opacity-90" />
          <div>
            <h3 className="text-lg font-semibold">پیشرفت درس‌ها</h3>
            <p className="text-white/90 text-sm">
              0/{activeCourses.length * 10} درس کامل شده
            </p>
          </div>
        </div>
      </div>

      {/* لیست دوره‌های فعال */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">دوره‌های شما</h2>

        {loading ? (
          <p className="text-gray-500">در حال بارگذاری دوره‌ها...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : activeCourses.length === 0 ? (
          <p className="text-gray-500">هنوز دوره‌ای فعال ندارید.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activeCourses.map((course) => (
              <CourseLink
                key={course.id}
                course={course}
                className="bg-gray-50 rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col h-full justify-between hover:-translate-y-1"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    دسته‌بندی: {course.category}
                  </p>
                </div>
                <span className="mt-4 inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  مشاهده دوره
                </span>
              </CourseLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
