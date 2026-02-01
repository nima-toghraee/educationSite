"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

import { Course } from "@/types/course";
import { getFreeCoursesByFilter } from "@/services/courseService";

export default function FilteredCoursesPage() {
  const searchParams = useSearchParams();
  const { category } = useParams();
  const categorySlug = category as string;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const base = searchParams.get("base")?.replace(/-/g, " ");
  const field = searchParams.get("field")?.replace(/-/g, " ");

  useEffect(() => {
    if (!base || !field) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const categoryId = CATEGORY_SLUG_TO_ID[categorySlug];
        if (!categoryId) throw new Error("دسته‌بندی نامعتبر است");

        const data = await getFreeCoursesByFilter({
          categoryId,
          grade: base,
          field,
        });

        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطا در دریافت دوره‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [base, field, categorySlug]);

  if (loading) return <p className="text-center mt-6">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (courses.length === 0)
    return <p className="text-center mt-6">دوره‌ای پیدا نشد.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Link
          key={course.id}
          href={`/free-courses/${categorySlug}/filter/${course.id}`}
          className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-2">{course.title}</h2>
            <p className="text-sm text-gray-600">
              {course.grade} - {course.field}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

const CATEGORY_SLUG_TO_ID: Record<string, number> = {
  math: 1,
  physics: 2,
};
