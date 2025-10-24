import api from "@/lib/api"; // یا استفاده مستقیم از fetch




export async function fetchCoursesByCategory(category: string) {
    console.log("🔹 fetchCoursesByCategory called with category:", category);


  try {
   const url = `/courses?category=${encodeURIComponent(category)}`;
    console.log("🔹 Axios GET URL:", url);
    
    const res = await api.get(url);

    console.log("🔹 Axios response status:", res.status);
    console.log("🔹 Axios response data:", res.data);
    
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error("❌ خطا در دریافت دوره‌ها بر اساس دسته:", error);
    

    return [];
  }
}