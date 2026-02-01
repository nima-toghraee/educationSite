"use client";

import { useSubCategoryCourses } from "@/hooks/useSubCategoryCourses";
import CourseGrid from "@/components/course/CourseGrid";

type Props = {
  category: string;
  subSlug: string;
};

export default function SubCategoryCoursesClient({ category, subSlug }: Props) {
  const { courses, loading, error } = useSubCategoryCourses(category, subSlug);

  const freeCourses = courses.filter((course) => course.is_free === 1);

  if (loading) return <p className="text-center p-10">در حال بارگذاری...</p>;
  if (error) return <p className="text-red-500 text-center p-10">{error}</p>;

  if (freeCourses.length === 0) {
    return (
      <p className="text-center p-10 text-gray-500">
        دوره رایگانی در این دسته وجود ندارد.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        دوره‌های رایگان {subSlug.replace(/-/g, " ")}
      </h1>

      <CourseGrid
        courses={freeCourses}
        categorySlug={category}
        subSlug={subSlug}
      />
    </div>
  );
}
