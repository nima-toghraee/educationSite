import { Lesson } from "@/types/lesson";
const BASE_URL = "http://localhost:5000/api";

export async function getLessonById(lessonId: string): Promise<Lesson> {
  const res = await fetch(`${BASE_URL}/lessons/${lessonId}`);

  console.log("🌐 REQUEST URL:", `${BASE_URL}/lessons/${lessonId}`);
  console.log("📡 STATUS:", res.status);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.message || "خطا در دریافت اطلاعات درس";
    throw new Error(message);
  }

  const data: Lesson = await res.json();
  return data;
}
