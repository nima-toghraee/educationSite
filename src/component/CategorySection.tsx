"use client";

import Link from "next/link";
import CoursesCard from "./CoursesCard";
import { Course } from "@/types/course";

interface CategorySectionProps {
  name: string;
  courses: Course[];
  category: string; // ✅ اضافه کردن پراپ category
}

export default function CategorySection({
  name,
  courses,
  category, // ✅ دریافت category از پراپ‌ها
}: CategorySectionProps) {
  if (!courses.length) return null;

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <Link href="#" className="text-blue-600 text-sm hover:underline">
          مشاهده همه
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        {courses.map((course) => (
          <CoursesCard
            key={course.id}
            course={course}
            category={category} // ✅ پاس دادن category به CoursesCard
          />
        ))}
      </div>
    </section>
  );
}
