"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  getCourseById,
  getLessonsByCourse,
  checkCourseAccess,
} from "@/services/courseService";
import type { Course } from "@/types/course";
import type { Lesson } from "@/types/lesson";
import LessonCard from "./LessonCard";

type Access = {
  is_purchased: boolean;
  locked: boolean;
};

interface Props {
  category: string;
  subSlug?: string;
  courseId: string;
}

export default function CoursePage({ category, subSlug, courseId }: Props) {
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [access, setAccess] = useState<Access>({
    is_purchased: false,
    locked: true,
  });
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();

  useEffect(() => {
    async function load() {
      setLoading(true);

      const course = await getCourseById(courseId);
      const lessons = await getLessonsByCourse(courseId);

      setCourse(course);
      setLessons(lessons);

      if (course.is_free || course.price === 0) {
        setAccess({ is_purchased: true, locked: false });
      } else {
        const access = await checkCourseAccess(courseId, token);
        setAccess(access);
      }

      setLoading(false);
    }

    load();
  }, [courseId, token]);

  if (loading) return <p className="p-10 text-center">در حال بارگذاری...</p>;
  if (!course)
    return <p className="p-10 text-center text-red-500">دوره پیدا نشد</p>;

  const basePath = subSlug
    ? `/courses/${category}/${subSlug}/${courseId}`
    : `/courses/${category}/${courseId}`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>

      <p className="mb-4 text-gray-700">{course.description}</p>

      <p className="mb-6 text-lg font-bold text-green-600">
        {course.is_free || course.price === 0
          ? "رایگان"
          : `${course.price.toLocaleString()} تومان`}
      </p>

      <h2 className="text-2xl font-semibold mb-4">درس‌ها</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lessons.map((lesson) => {
          const unlocked =
            lesson.is_free || access.is_purchased || course.is_free;

          if (!unlocked) {
            return (
              <div
                key={lesson.id}
                className="p-4 border rounded-xl bg-yellow-50 text-center"
              >
                <p>{lesson.title}</p>
                <p className="text-xs text-gray-500 mt-1">این درس قفل است</p>
                <Link
                  href={token ? `/checkout/${course.id}` : "/auth/login"}
                  className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                >
                  {token ? "خرید دوره" : "ورود"}
                </Link>
              </div>
            );
          }

          return (
            <LessonCard key={lesson.id} lesson={lesson} coursePath={basePath} />
          );
        })}
      </div>
    </div>
  );
}
