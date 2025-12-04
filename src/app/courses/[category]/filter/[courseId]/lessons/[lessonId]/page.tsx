"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  video_url?: string;
  order?: number;
}

export default function LessonDetailPage() {
  const { lessonId } = useParams() as { lessonId: string };

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!lessonId) return;

    const fetchLesson = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://localhost:5000/api/lessons/${lessonId}`
        );
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات درس");
        const data: Lesson = await res.json();
        setLesson(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("خطا در دریافت درس");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
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
