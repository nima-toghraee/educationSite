"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { slugify } from "@/lib/slugify";
import { getMainCategories, getSubCategories } from "@/lib/categories";

interface Course {
  id: number;
  title: string;
  description?: string;
  thumbnail_url?: string;
  teacher?: string;
  total_duration?: string;
}

interface Category {
  id: number;
  name: string;
}

export default function SubCategoryPage() {
  const { category, subSlug } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        // دریافت کتگوری اصلی
        const mainCategories: Category[] = await getMainCategories();
        const targetCategory = mainCategories.find(
          (c) => slugify(c.name) === category
        );

        if (!targetCategory) {
          setError("کتگوری پیدا نشد");
          return;
        }

        // دریافت زیردسته‌ها
        const subCategories: Category[] = await getSubCategories(
          targetCategory.id
        );
        const targetSub = subCategories.find(
          (s) => slugify(s.name) === subSlug
        );

        if (!targetSub) {
          setError("زیردسته پیدا نشد");
          return;
        }

        // دریافت دوره‌ها بر اساس زیردسته
        const res = await fetch(
          `https://backend-education-x5ta.onrender.com/api/courses/by-category/${targetSub.id}`
        );

        if (!res.ok) throw new Error("خطا در دریافت اطلاعات از سرور");

        const data: Course[] = await res.json();
        setCourses(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("خطا در دریافت دوره‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category, subSlug]);
  const subSlugStr = Array.isArray(subSlug) ? subSlug[0] : subSlug;

  if (loading) return <p className="text-center p-10">در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500 text-center p-10">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        دوره‌های زیردسته: {subSlugStr?.replace(/-/g, " ")}
      </h1>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white/60 backdrop-blur-md shadow-lg rounded-2xl p-4 hover:shadow-2xl transition-all border border-gray-200"
            >
              {course.thumbnail_url && (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="rounded-xl w-full h-40 object-cover mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                {course.description || "بدون توضیح"}
              </p>
              {course.teacher && (
                <p className="text-sm text-gray-500 mb-2">
                  مدرس: {course.teacher}
                </p>
              )}
              <p className="text-sm text-gray-500 mb-3">
                مدت زمان: {course.total_duration || "نامشخص"}
              </p>
              <Link
                href={`/courses/${category}/${subSlug}/${course.id}`}
                className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
              >
                مشاهده جزئیات
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8">
          دوره‌ای برای این زیردسته وجود ندارد.
        </p>
      )}
    </div>
  );
}
