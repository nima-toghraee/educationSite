"use client";

import { Lesson } from "@/types/lesson";
import CommentsSection from "@/components/comments/CommentSection";

interface Props {
  lesson: Lesson;
}

export default function LessonClient({ lesson }: Props) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} دقیقه ${secs} ثانیه`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* VIDEO PLAYER */}
      <div className="bg-black rounded-xl overflow-hidden shadow-lg aspect-video">
        {lesson.video_url ? (
          <video
            src={lesson.video_url}
            controls
            className="w-full h-full"
            onError={() => console.log("❌ Video failed to load")}
            onLoadedData={() => console.log("✅ Video loaded")}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            ویدیویی برای این درس موجود نیست
          </div>
        )}
      </div>

      {/* TITLE + META */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>

        <div className="flex gap-3 text-sm text-gray-500">
          <span>درس {lesson.order_index}</span>
          <span>•</span>
          <span>{formatDuration(lesson.duration)}</span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="bg-white border rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-2">توضیحات درس</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {lesson.description || "توضیحی ثبت نشده است."}
        </p>
      </div>

      {/* COMMENTS */}
      <div className="border-t pt-6">
        <CommentsSection videoId={lesson.id} />
      </div>
    </div>
  );
}
