"use client";
import { useEffect, useState } from "react";
import { fetchCoursesByCategory } from "@/lib/apiCourses";
import CoursesCard from "@/component/coursesCard";

type Props = {
  params: { category: string };
};

export default function CategoryVideos({ params }: Props) {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const loadCourses = async () => {
      const filtered = await fetchCoursesByCategory(params.category);
      setCourses(filtered);
    };
    loadCourses();
  }, [params.category]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-900 text-center">
        ویدیوهای آموزشی: {params.category}
      </h1>

      {courses.length > 0 ? (
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
