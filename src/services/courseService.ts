import type { Course } from "@/types/course";
import { Lesson } from "@/types/lesson";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCoursesBySubCategory(
  subCategoryId: number
): Promise<Course[]> {
  const res = await fetch(`${BASE_URL}/courses/by-category/${subCategoryId}`);
  if (!res.ok) throw new Error("خطا در دریافت دوره‌ها");
  return res.json();
}

export async function getCourseById(courseId: string): Promise<Course> {
  const res = await fetch(`${BASE_URL}/courses/${courseId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("خطا در دریافت اطلاعات دوره");
  return res.json();
}

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  const res = await fetch(`${BASE_URL}/lessons/by-course/${courseId}`, { cache: "no-store" });
  return res.json();
}

export async function checkCourseAccess(courseId: string, token?: string) {
  if (!token) return { is_purchased: false, locked: true };
  const res = await fetch(`${BASE_URL}/courses/${courseId}/check-access`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return { is_purchased: false, locked: true };
  return res.json();
}

export async function getFilteredCourses(
  categoryId: number,
  grade: string,
  field: string
): Promise<Course[]> {
  const res = await fetch(
    `${BASE_URL}/courses/by-category/${categoryId}?grade=${encodeURIComponent(
      grade
    )}&field=${encodeURIComponent(field)}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "خطا در دریافت دوره‌ها");
  }
  return res.json();
}

export async function getCourseWithLessons(courseId: string) {
  const courseRes = await fetch(`${BASE_URL}/courses/${courseId}`);
  if (!courseRes.ok) return null;
  const course: Course = await courseRes.json();

  const lessonsRes = await fetch(`${BASE_URL}/lessons/by-course/${courseId}`);
  const lessons: Lesson[] = lessonsRes.ok ? await lessonsRes.json() : [];

  return { course, lessons };
}

export async function getFreeCoursesByFilter(params: {
  categoryId: number;
  grade: string;
  field: string;
}): Promise<Course[]> {
  const { categoryId, grade, field } = params;
  const res = await fetch(
    `${BASE_URL}/courses/free?categoryId=${categoryId}&grade=${encodeURIComponent(
      grade
    )}&field=${encodeURIComponent(field)}`
  );
  if (!res.ok) {
    if (res.status === 404) throw new Error("هیچ دوره‌ای پیدا نشد");
    throw new Error("خطا در دریافت دوره‌ها");
  }
  return res.json();
}
