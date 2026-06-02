import type { Course } from "@/types/course";
import { Lesson } from "@/types/lesson";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// تابع کمکی برای هندل کردن امن Fetch
async function safeFetch<T>(url: string, defaultValue: T): Promise<T> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return defaultValue;
    return await res.json();
  } catch (error) {
    console.error(`Fetch failed for URL: ${url}`, error);
    return defaultValue;
  }
}

export async function getCoursesBySubCategory(subCategoryId: number): Promise<Course[]> {
  return safeFetch(`${BASE_URL}/courses/by-category/${subCategoryId}`, []);
}

export async function getCourseById(courseId: string): Promise<Course | null> {
  return safeFetch<Course | null>(`${BASE_URL}/courses/${courseId}`, null);
}

export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  return safeFetch(`${BASE_URL}/lessons/by-course/${courseId}`, []);
}

export async function checkCourseAccess(courseId: string, token?: string) {
  if (!token) return { is_purchased: false, locked: true };
  try {
    const res = await fetch(`${BASE_URL}/courses/${courseId}/check-access`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { is_purchased: false, locked: true };
    return await res.json();
  } catch {
    return { is_purchased: false, locked: true };
  }
}

// اصلاح تابعی که باعث ارور شده بود
export async function getFilteredCourses(
  categoryId: number,
  grade: string,
  field: string
): Promise<Course[]> {
  const url = `${BASE_URL}/courses/by-category/${categoryId}?grade=${encodeURIComponent(grade)}&field=${encodeURIComponent(field)}`;
  
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return []; // اگر سرور ۴۰۴ یا ۵۰۰ داد، آرایه خالی برگردان
    return await res.json();
  } catch (error) {
    // اگر کلاً API خاموش بود (Fetch failed)، اینجا هندل می‌شود
    console.error("API is down:", error);
    return []; // برگرداندن آرایه خالی به جای کرش کردن
  }
}

export async function getCourseWithLessons(courseId: string) {
  try {
    const course = await getCourseById(courseId);
    if (!course) return null;

    const lessons = await getLessonsByCourse(courseId);
    return { course, lessons };
  } catch {
    return null;
  }
}

export async function getFreeCoursesByFilter(params: {
  categoryId: number;
  grade: string;
  field: string;
}): Promise<Course[]> {
  const { categoryId, grade, field } = params;
  const url = `${BASE_URL}/courses/free?categoryId=${categoryId}&grade=${encodeURIComponent(grade)}&field=${encodeURIComponent(field)}`;
  
  return safeFetch(url, []);
}
