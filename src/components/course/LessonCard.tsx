"use client";

import Link from "next/link";

interface LessonCardProps {
  lesson: {
    id: number;
    title: string;
    description?: string;
    duration?: string;
  };
  coursePath: string; // مسیر پایه تا courseId (در هر دو حالت)
}

export default function LessonCard({ lesson, coursePath }: LessonCardProps) {
  // مسیر نهایی برای هر درس
  const lessonLink = `${coursePath}/lessons/${lesson.id}`;

  return (
    <Link
      href={lessonLink}
      className="block border rounded-xl p-4 hover:shadow-md transition-shadow bg-white cursor-pointer"
    >
      <h3 className="text-lg font-semibold mb-1">{lesson.title}</h3>

      {lesson.description && (
        <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
      )}

      {lesson.duration && (
        <p className="text-xs text-gray-500">مدت زمان: {lesson.duration}</p>
      )}
    </Link>
  );
}
