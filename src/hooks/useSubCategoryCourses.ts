import { useEffect, useState } from "react";
import { slugify } from "@/lib/slugify";
import { getMainCategories, getSubCategories } from "@/lib/categories";
import { getCoursesBySubCategory } from "@/services/courseService";
import type { Course } from "@/types/course";

export function useSubCategoryCourses(category: string, subSlug: string) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const mainCategories = await getMainCategories();
        const targetCategory = mainCategories.find(
          (c) => slugify(c.name) === category
        );
        if (!targetCategory) {
          setError("کتگوری پیدا نشد");
          return;
        }

        const subCategories = await getSubCategories(targetCategory.id);
        const targetSub = subCategories.find(
          (s) => slugify(s.name) === subSlug
        );
        if (!targetSub) {
          setError("زیردسته پیدا نشد");
          return;
        }

        const courses = await getCoursesBySubCategory(targetSub.id);
        setCourses(courses);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("خطا در دریافت دوره‌ها");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [category, subSlug]);

  return { courses, loading, error };
}
