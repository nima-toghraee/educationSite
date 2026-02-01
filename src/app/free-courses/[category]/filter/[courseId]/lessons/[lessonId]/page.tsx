"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Lesson } from "@/types/lesson";
import { getLessonById } from "@/services/lessonsService";

export default function LessonDetailPage() {
  const { lessonId } = useParams() as { lessonId: string };
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!lessonId) return;

    const loadLesson = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getLessonById(lessonId);
        setLesson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطا در دریافت درس");
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId]);

  if (loading) return <p>در حال بارگذاری درس...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!lesson) return <p>درس پیدا نشد.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
      {lesson.order && <p className="text-gray-500 mb-2">درس {lesson.order}</p>}
      {lesson.duration && (
        <p className="text-gray-600 mb-4">مدت: {lesson.duration}</p>
      )}
      {lesson.description && (
        <div className="prose mb-6">{lesson.description}</div>
      )}
      {lesson.video_url ? (
        <video
          src={lesson.video_url}
          controls
          className="w-full rounded-lg shadow-lg"
        />
      ) : (
        <p className="text-gray-500">ویدیویی برای این درس موجود نیست.</p>
      )}
    </div>
  );
}
