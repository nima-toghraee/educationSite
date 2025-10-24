import api from "@/lib/api";

export async function fetchCoursesByCategory(category: string) {
  console.log("🔹 fetchCoursesByCategory called with category:", category);

  try {
    const url = `/courses?category=${encodeURIComponent(category)}`;
    console.log("🔹 Axios GET URL:", url);
    
    const res = await api.get(url);

    console.log("🔹 Axios response status:", res.status);
    console.log("🔹 Axios response data:", res.data);

    return Array.isArray(res.data) ? res.data : [];
  } catch (error: any) {
    console.error("❌ Error in fetchCoursesByCategory:", error.message);
    if (error.response) {
      console.error("❌ Response data:", error.response.data);
      console.error("❌ Response status:", error.response.status);
      console.error("❌ Response headers:", error.response.headers);
    }
    return [];
  }
}
