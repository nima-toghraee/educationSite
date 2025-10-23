import api from "@/lib/api"; // یا استفاده مستقیم از fetch




export async function fetchCoursesByCategory(category: string) {
  try {
    const res = await api.get(`/courses?category=${encodeURIComponent(category)}`);
    
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("❌ خطا در دریافت دوره‌ها بر اساس دسته:", error);
    

    return [];
  }
}