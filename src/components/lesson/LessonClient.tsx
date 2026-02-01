"use client";

import { Lesson } from "@/types/lesson";

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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
      <p className="text-gray-500 mb-2">درس {lesson.order_index}</p>
      <p className="text-gray-600 mb-4">
        مدت: {formatDuration(lesson.duration)}
      </p>
      <div className="prose mb-6">{lesson.description}</div>
      {lesson.video_file ? (
        <video
          src={lesson.video_file}
          controls
          className="w-full rounded-lg shadow-lg"
        />
      ) : (
        <p className="text-gray-500">ویدیویی برای این درس موجود نیست.</p>
      )}
    </div>
  );
}
