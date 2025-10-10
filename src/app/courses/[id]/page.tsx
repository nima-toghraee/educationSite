"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCourseData = async () => {
      try {
        // فرض کن بک اند این دو مسیر رو داره:
        // /courses/:id برای جزئیات کورس
        // /courses/:id/lessons برای لیست لسن‌ها
        const [courseRes, lessonsRes] = await Promise.all([
          api.get(`/courses/${id}`),
          api.get(`/lessons/course/${id}`),
        ]);

        setCourse(courseRes.data);
        setLessons(lessonsRes.data);
      } catch (error) {
        console.error("❌ خطا در دریافت اطلاعات کورس:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;
  if (!course) return <p className="text-center mt-10">کورس یافت نشد 😔</p>;

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{course.title}</h1>
      <p className="text-gray-600 mb-8">{course.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/lessons/${lesson.id}`}
            className="block bg-white border border-gray-200 p-4 rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {lesson.title}
            </h2>
            <p className="text-gray-500 text-sm">{lesson.duration} دقیقه</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
