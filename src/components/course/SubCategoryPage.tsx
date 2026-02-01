"use client";

import { useEffect, useState } from "react";
import { getCoursesBySubCategory } from "@/services/courseService";
import CourseGrid from "./CourseGrid";
import type { Course } from "@/types/course";

// Map زیردسته‌ها: slug انگلیسی → id زیردسته
const SUBCATEGORY_SLUG_MAP: Record<string, number> = {
  focus: 6, // کوچینگ و رشد فردی
  "stress-management": 5, // مدیریت استرس و آرامش ذهن
  memory: 4, // یادگیری 360
};

interface Props {
  categorySlug: string;
  subSlug: string;
}

export default function SubCategoryPage({ categorySlug, subSlug }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const subId = SUBCATEGORY_SLUG_MAP[subSlug];
        if (!subId) throw new Error("زیردسته پیدا نشد");

        const courses = await getCoursesBySubCategory(subId);
        setCourses(courses);
      } catch (e) {
        setError(e instanceof Error ? e.message : "خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [subSlug]);

  if (loading) return <p className="p-10 text-center">در حال بارگذاری...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 pb-32">
      <CourseGrid
        courses={courses}
        categorySlug={categorySlug}
        subSlug={subSlug}
      />
    </div>
  );
}
