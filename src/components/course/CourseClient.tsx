"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Course, Access } from "@/types/course";
import { Lesson } from "@/types/lesson";
import { useEffect, useState } from "react";
import { checkCourseAccess } from "@/services/courseService";

interface Props {
  category: string;
  course: Course;
  lessons: Lesson[];
}

export default function CourseClient({ category, course, lessons }: Props) {
  const { token } = useAuth();
  const [accessMap, setAccessMap] = useState<Record<number, Access>>({});

  useEffect(() => {
    async function loadAccess() {
      const map: Record<number, Access> = {};

      if (course.is_free || course.price === 0) {
        lessons.forEach((lesson) => {
          map[lesson.id] = { is_purchased: true, locked: false };
        });
      } else if (token) {
        const access = await checkCourseAccess(course.id, token);
        lessons.forEach((lesson) => {
          map[lesson.id] = access;
        });
      } else {
        lessons.forEach((lesson) => {
          map[lesson.id] = { is_purchased: false, locked: true };
        });
      }

      setAccessMap(map);
    }

    loadAccess();
  }, [lessons, course, token]);

  const coursePath = `/courses/${category}/filter/${course.id}`;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* اطلاعات دوره */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          {course.title}
        </h1>
        <p className="text-gray-700 leading-relaxed">{course.description}</p>
        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              course.is_free
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {course.is_free
              ? "رایگان"
              : `${Number(course.price).toLocaleString()} تومان`}
          </span>
        </div>
      </div>

      {/* لیست درس‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => {
          const lessonAccess = accessMap[lesson.id];
          const isLocked = lessonAccess?.locked ?? true;

          const lessonLink = isLocked
            ? token
              ? `/checkout/${course.id}`
              : `/auth/login?redirect=/checkout/${course.id}`
            : `${coursePath}/lessons/${lesson.id}`;

          return (
            <Link
              key={lesson.id}
              href={lessonLink}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-sm
                hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                flex flex-col h-full overflow-hidden p-4"
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-blue-600">
                {lesson.title}
              </h3>
              {isLocked && (
                <span className="mt-auto text-sm text-red-500 font-medium">
                  🔒 نیاز به خرید
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
