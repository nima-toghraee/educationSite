"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLesson } from "@/hooks/useLesson";
import LessonVideoPlayer from "@/component/LessonVideoPlayer";
import CommentsSection from "@/component/comments/CommentSection";

export default function LessonDetailPage() {
  const params = useParams();
  const category = params?.category;
  const courseId = params?.courseId;
  const lessonIdParam = params?.lessonId;

  // اگر lessonId آرایه باشه، اولین عنصرش رو استفاده می‌کنیم
  const lessonId =
    typeof lessonIdParam === "string"
      ? lessonIdParam
      : Array.isArray(lessonIdParam)
      ? lessonIdParam[0]
      : undefined;

  const { lesson, loading } = useLesson(lessonId ?? "");

  if (loading) return <p className="text-center mt-20">در حال بارگذاری...</p>;
  if (!lesson)
    return <p className="text-center mt-20 text-gray-500">لسن یافت نشد.</p>;

  return (
    <main className="container mx-auto px-4 py-10">
      <Link
        href={`/videos/${category}/${courseId}`}
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← بازگشت به لیست جلسات
      </Link>

      <h1 className="text-3xl font-bold mb-4 text-gray-900">{lesson.title}</h1>
      <p className="text-gray-700 mb-6 leading-relaxed">{lesson.description}</p>

      <LessonVideoPlayer videoUrl={lesson.video_url} />

      {lesson.duration && (
        <p className="text-sm text-gray-500">⏱ مدت زمان: {lesson.duration}</p>
      )}

      {/* حالا TypeScript خطا نمیده */}
      {lessonId && <CommentsSection videoId={lessonId} />}
    </main>
  );
}
