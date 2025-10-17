"use client";

import CategorySection from "@/component/CategorySection";
import { useFreeCourses } from "@/hooks/useCourses";

export default function FreeCoursesPage() {
  const { courses, loading, error } = useFreeCourses();

  if (loading) return <p className="text-center py-10">در حال بارگذاری...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        🎓 دوره‌های رایگان
      </h1>

      <CategorySection name="دوره‌های رایگان" courses={courses} />
    </main>
  );
}
