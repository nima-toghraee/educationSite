import FilteredCoursesClient from "@/components/course/FilteredCoursesClient";
import { getFilteredCourses } from "@/services/courseService";
import { Course } from "@/types/course";

interface PageProps {
  searchParams: { base?: string; field?: string };
  params: { category: string };
}

export default async function Page({ params, searchParams }: PageProps) {
  const categoryId = CATEGORY_SLUG_TO_ID[params.category];
  if (!categoryId) throw new Error("دسته‌بندی نامعتبر");

  const base = searchParams.base?.replace(/-/g, " ");
  const field = searchParams.field?.replace(/-/g, " ");

  let courses: Course[] = [];
  if (base && field) {
    courses = await getFilteredCourses(categoryId, base, field);
  }

  return <FilteredCoursesClient courses={courses} category={params.category} />;
}

// map slug به id
const CATEGORY_SLUG_TO_ID: Record<string, number> = {
  math: 1,
  physics: 2,
};
