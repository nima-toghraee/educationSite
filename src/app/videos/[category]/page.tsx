"use client";
import { useEffect, useState } from "react";
import { fetchCoursesByCategory } from "@/lib/apiCourses";
import CoursesCard from "@/component/CoursesCard";

type Props = {
  params: { category: string };
};

// مپ انگلیسی به فارسی برای نمایش در عنوان
const categoryMap: Record<string, string> = {
  math: "ریاضی",
  physics: "فیزیک",
  mindset: "توانمندی ذهن",
};

export default function CategoryVideos({ params }: Props) {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const filtered = await fetchCoursesByCategory(params.category);
      setCourses(filtered);
      setLoading(false);
    };
    loadCourses();
  }, [params.category]);

  const faCategory = categoryMap[params.category] || params.category;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-900 text-center">
        ویدیوهای آموزشی: {faCategory}
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">در حال بارگذاری...</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CoursesCard
              key={course.id}
              course={course}
              category={params.category}
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
