"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface Course {
  id: number;
  title: string;
  description?: string;
  grade?: string;
  field?: string;
  price?: number;
  is_free?: boolean;
}

interface Lesson {
  id: number;
  title: string;
  thumbnail_url?: string;
  duration?: string;
}

interface Access {
  is_purchased: boolean;
  locked: boolean;
}

export default function FilteredCoursePage() {
  const { courseId, category } = useParams() as {
    courseId: string;
    category: string;
  };
  const categorySlug = category;

  const { token } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [accessMap, setAccessMap] = useState<Record<number, Access>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch course + lessons + access
  useEffect(() => {
    if (!courseId) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        // دریافت اطلاعات دوره
        const courseRes = await fetch(
          `http://localhost:5000/api/courses/${courseId}`
        );
        if (!courseRes.ok) throw new Error("خطا در دریافت اطلاعات دوره");
        const courseData: Course = await courseRes.json();
        setCourse(courseData);

        // دریافت درس‌ها
        const lessonsRes = await fetch(
          `http://localhost:5000/api/lessons/by-course/${courseId}`
        );
        if (!lessonsRes.ok) throw new Error("خطا در دریافت درس‌ها");
        const lessonsData: Lesson[] = await lessonsRes.json();
        setLessons(lessonsData);

        // بررسی دسترسی فقط برای دوره‌های پولی
        const newAccessMap: Record<number, Access> = {};
        if (!courseData.is_free && courseData.price && courseData.price > 0) {
          for (const lesson of lessonsData) {
            if (token) {
              const accessRes = await fetch(
                `http://localhost:5000/api/courses/${courseId}/check-access`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              if (accessRes.ok) {
                const accessData: Access = await accessRes.json();
                newAccessMap[lesson.id] = accessData;
              } else {
                newAccessMap[lesson.id] = { is_purchased: false, locked: true };
              }
            } else {
              newAccessMap[lesson.id] = { is_purchased: false, locked: true };
            }
          }
        } else {
          // رایگان → همه باز
          for (const lesson of lessonsData) {
            newAccessMap[lesson.id] = { is_purchased: true, locked: false };
          }
        }
        setAccessMap(newAccessMap);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("خطا در دریافت اطلاعات");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, token]);

  if (loading) return <p className="text-center mt-6">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (!course) return <p className="text-center mt-6">دوره‌ای پیدا نشد.</p>;

  const coursePath = `/courses/${categorySlug}/${courseId}`;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Course Info */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          {course.title}
        </h1>
        <p className="text-gray-500">
          {course.grade} - {course.field}
        </p>
        <p className="text-gray-600 mt-4 leading-relaxed">
          {course.description || "بدون توضیحات"}
        </p>
        <p className="text-lg font-bold text-green-600 mt-2">
          {course.is_free || course.price === 0
            ? "رایگان"
            : `${Number(course.price).toLocaleString()} تومان`}
        </p>
      </div>

      {/* Lessons */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">درس‌های دوره</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => {
          const access = accessMap[lesson.id];
          const isLocked = access?.locked;

          // مسیر درس
          let lessonLink = `${coursePath}/lessons/${lesson.id}`;

          if (isLocked) {
            if (course?.is_free || course?.price === 0) {
              // رایگان → مسیر مستقیم درس
              lessonLink = `${coursePath}/lessons/${lesson.id}`;
            } else {
              // پولی → بررسی توکن
              lessonLink = token
                ? `/checkout/${courseId}` // کاربر لاگین → چک‌اوت
                : `/auth/login?redirect=/checkout/${courseId}`; // مهمان → لاگین و سپس چک‌اوت
            }
          }

          return (
            <Link
              key={lesson.id}
              href={lessonLink}
              className="group relative border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="h-40 bg-gray-100 overflow-hidden">
                <img
                  src={lesson.thumbnail_url || "/placeholder.jpg"}
                  alt={lesson.title}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    isLocked ? "brightness-50" : ""
                  }`}
                />
                {isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold pointer-events-none">
                    🔒
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs text-gray-400">درس {index + 1}</span>
                <h3 className="text-lg font-bold text-gray-800 mt-1 group-hover:text-indigo-600 transition">
                  {lesson.title}
                </h3>
                {lesson.duration && (
                  <p className="text-sm text-gray-500 mt-2">
                    مدت زمان: {lesson.duration}
                  </p>
                )}
                {isLocked && (
                  <p className="text-sm text-yellow-700 mt-1">خرید لازم است</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
