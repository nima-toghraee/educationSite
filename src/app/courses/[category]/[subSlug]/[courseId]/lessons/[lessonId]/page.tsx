"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommentsSection from "@/component/comments/CommentSection";

interface Lesson {
  id: number;
  title: string;
  description?: string;
  duration?: string;
  video_url?: string;
}

export default function LessonPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://backend-education-x5ta.onrender.com/api/lessons/${lessonId}`
        );
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات درس");

        const data: Lesson = await res.json();
        setLesson(data);
      } catch (err) {
        setError("خطایی در دریافت اطلاعات درس رخ داد");
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) fetchLesson();
  }, [lessonId]);

  if (loading)
    return <p className="text-center text-gray-500 p-10">در حال بارگذاری...</p>;

  if (error) return <p className="text-center text-red-500 p-10">{error}</p>;

  if (!lesson)
    return <p className="text-center text-gray-500 p-10">درسی یافت نشد.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg mt-6">
      {/* عنوان درس */}
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{lesson.title}</h1>

      {/* ویدیو درس */}
      {lesson.video_url ? (
        <div className="mb-6">
          <video
            src={lesson.video_url}
            controls
            className="w-full rounded-xl shadow-md"
          />
        </div>
      ) : (
        <p className="text-gray-500 mb-4">ویدیویی برای این درس موجود نیست.</p>
      )}

      {/* توضیحات درس */}
      {lesson.description && (
        <p className="text-gray-700 leading-relaxed">{lesson.description}</p>
      )}

      {/* مدت زمان درس */}
      {lesson.duration && (
        <p className="text-sm text-gray-500 mt-3">
          مدت زمان: {lesson.duration}
        </p>
      )}

      {/* 👇 بخش کامنت‌ها پایین صفحه 👇 */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <CommentsSection videoId={lesson.id} />
      </div>
    </div>
  );
}
