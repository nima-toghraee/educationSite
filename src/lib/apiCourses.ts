import api from "@/lib/api"; // یا استفاده مستقیم از fetch
import { Course } from "@/types/course";

// تعریف ساختار داده برای نمایش در ناوبر
interface DynamicNavItem {
  label: string;
  href: string;
}


export async function fetchCoursesByCategory(category: string) {
  try {
    const res = await api.get(`/courses?category=${category}`);
    
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("❌ خطا در دریافت دوره‌ها بر اساس دسته:", error);
    

    return [];
  }
}