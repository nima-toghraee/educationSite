import api from "@/lib/api";

export async function fetchCoursesByCategory(category: string) {
  try {
    const res = await api.get("/courses");
    return res.data.filter((course: any) => course.category === category);
  } catch (error) {
    console.error("❌ خطا در دریافت کورس‌ها:", error);
    return [];
  }
}
