"use client";

import Link from "next/link";
import { Course } from "@/types/course";
import CoursesCard from "./coursesCard";

interface CategorySectionProps {
  name: string;
  courses: Course[];
}

export default function CategorySection({
  name,
  courses,
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
          <CoursesCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
