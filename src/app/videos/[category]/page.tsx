"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCoursesByCategory } from "@/lib/apiCourses";
import CoursesCard from "@/component/CoursesCard";
import { Course } from "@/types/course";

// نگاشت دسته‌بندی‌های انگلیسی به فارسی برای API
const categoryMap: Record<string, string> = {
  math: "ریاضی",
  physics: "فیزیک",
  mindset: "توانمندی ذهن",
};

export default function CategoryVideos() {
  const params = useParams();
  const rawCategory = params?.category;

  const categorySlug = Array.isArray(rawCategory)
    ? rawCategory[0]
    : rawCategory;
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // مقدار فارسی برای API
  function getApiCategory(slug?: string): string {
    if (!slug) return "";
    return categoryMap[slug as keyof typeof categoryMap] || "";
  }

  const apiCategory = getApiCategory(categorySlug);

  useEffect(() => {
    console.log("📌 Category slug:", categorySlug);
    console.log("📌 API category:", apiCategory);
    console.log("📌 API URL env:", process.env.NEXT_PUBLIC_API_URL);

    if (!categorySlug || !apiCategory) {
      console.error("!!! ERROR: Category parameter is missing or invalid !!!");
      setLoading(false);
      return;
    }

    const loadCourses = async () => {
      setLoading(true);

      // ارسال مقدار فارسی به API
      const filtered: Course[] = await fetchCoursesByCategory(apiCategory);
      console.log("📌 Courses received:", filtered);

      setCourses(filtered);

      if (filtered.length === 0) {
        console.warn(
          "⚠️ هیچ دوره‌ای برای این دسته‌بندی پیدا نشد:",
          apiCategory
        );
      } else {
        console.log(`✅ تعداد دوره‌های دریافت شده: ${filtered.length}`);
      }

      setLoading(false);
    };

    loadCourses();
  }, [categorySlug, apiCategory]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-900 text-center">
        ویدیوهای آموزشی: {apiCategory}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">در حال بارگذاری...</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CoursesCard
              key={course.id}
              course={course}
              category={categorySlug as string} // برای لینک‌ها و مسیرها انگلیسی بمونه
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          هیچ ویدیویی در این دسته‌بندی موجود نیست.
        </p>
      )}
    </main>
  );
}
