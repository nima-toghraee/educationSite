"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  thumbnail_url: string;
  grade: string;
  field: string;
  price?: number;
  is_free?: boolean;
  subSlug?: string; // اختیاری
}

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
      setLoading(true);
      setError("");

      try {
        const categoryId = CATEGORY_SLUG_TO_ID[categorySlug];
        if (!categoryId) throw new Error("دسته‌بندی نامعتبر است");

        const res = await fetch(
          `http://localhost:5000/api/courses/by-category/${categoryId}?grade=${encodeURIComponent(
            base
          )}&field=${encodeURIComponent(field)}`
        );

        if (!res.ok) {
          if (res.status === 404) throw new Error("هیچ دوره‌ای پیدا نشد");
          throw new Error("خطا در دریافت دوره‌ها");
        }

        const data: Course[] = await res.json();
        setCourses(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("خطا در دریافت دوره‌ها");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [base, field, categorySlug]);

  if (loading) return <p className="text-center mt-6">در حال بارگذاری...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;
  if (courses.length === 0)
    return <p className="text-center mt-6">دوره‌ای با این فیلتر پیدا نشد.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {courses.map((course) => {
        const courseLink = `/courses/${categorySlug}/filter/${course.id}`;
        const priceLabel =
          course.is_free || course.price === 0
            ? "رایگان"
            : `${Number(course.price).toLocaleString()} تومان`;

        return (
          <Link
            key={course.id}
            href={courseLink}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1">{course.title}</h2>
              <p className="text-sm text-gray-600 mb-1">
                {course.grade} - {course.field}
              </p>
              <p className="text-sm font-bold text-green-600">{priceLabel}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// map slug به id (طبق دیتابیس واقعی)
const CATEGORY_SLUG_TO_ID: Record<string, number> = {
  math: 1,
  physics: 2,
};
