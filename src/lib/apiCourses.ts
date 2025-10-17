import api from "@/lib/api";
import { Course } from "@/types/course";

const categoryMap: Record<string, string> = {
  math: "ریاضی",
  physics: "فیزیک",
  mindset: "توانمندی ذهن",
};

export async function fetchCoursesByCategory(category: string): Promise<Course[]> {
  try {
    const res = await api.get("/courses");
    const filtered = res.data.filter((course: Course) => course.category === category);
    return filtered;
  } catch (error) {
    console.error("❌ خطا در دریافت کورس‌ها:", error);
    return [];
  }
}

// برای نمایش عنوان فارسی در فرانت‌اند
export function getFaCategory(category: string) {
  return categoryMap[category] || category;
}
