"use client";

import { useEffect, useState } from "react";
import { getCourses } from "@/lib/api";
import CourseCard from "@/component/CourseCard";

export default function VideosPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("❌ خطا در دریافت کورس‌ها:", error);
      }
    })();
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-20">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 text-center">
          موضوعات ویدیوهای آموزشی
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </section>
  );
}
