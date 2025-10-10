import { useEffect, useState } from "react";
import { getLessonById } from "@/services/lessonsService";

export type Lesson = {
  id: number;
  title: string;
  description: string;
  video_url: string;
  duration?: string;
};

export const useLesson = (lessonId?: string) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!lessonId) return;
    const fetchLesson = async () => {
      try {
        const data = await getLessonById(lessonId);
        setLesson(data);
      } catch (err) {
        console.error("❌ خطا در دریافت لسن:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [lessonId]);

  return { lesson, loading };
};
