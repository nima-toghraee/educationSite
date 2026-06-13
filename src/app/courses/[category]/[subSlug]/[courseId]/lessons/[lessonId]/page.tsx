"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Lesson } from "@/types/lesson";
import { getLessonById } from "@/services/lessonsService";
import LessonClient from "@/components/lesson/LessonClient";

export default function LessonPage() {
  const params = useParams();

  const lessonId = Array.isArray(params.lessonId)
    ? params.lessonId[0]
    : params.lessonId;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("🧠 params:", params);
    console.log("🧩 lessonId:", lessonId);

    if (!lessonId) return;

    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("خطا در دریافت درس");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (loading)
    return <p className="text-center text-gray-500 p-10">در حال بارگذاری...</p>;

  if (error) return <p className="text-center text-red-500 p-10">{error}</p>;

  if (!lesson)
    return <p className="text-center text-gray-500 p-10">درسی یافت نشد</p>;

  return <LessonClient lesson={lesson} />;
}
