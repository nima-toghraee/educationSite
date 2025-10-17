import api from "@/lib/api";

const categoryMap: Record<string, string> = {
  math: "ریاضی",
  physics: "فیزیک",
  mindset: "توانمندی ذهن",
};

export async function fetchCoursesByCategory(category: string) {
  try {
    const faCategory = categoryMap[category] || category;

    const res = await api.get("/courses");
    const filtered = res.data.filter(
      (course: any) => course.category === faCategory
    );

    return filtered;
  } catch (error) {
    console.error("❌ خطا در دریافت کورس‌ها:", error);
    return [];
  }
}
