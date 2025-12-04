"use client";

import { useEffect, useState } from "react";
import LessonCard from "./LessonCard";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface Lesson {
  id: number;
  title: string;
  description?: string;
  duration?: string;
  is_free?: boolean; // فرض کنیم این مشخصه درس هم داریم
}

interface Course {
  id: number;
  name: string;
  description: string;
  price?: number;
  is_free?: boolean;
}

interface Access {
  is_purchased: boolean;
  locked: boolean;
}

// دریافت اطلاعات دوره و درس‌ها
async function getCourseData(
  courseId: string
): Promise<{ course: Course; lessons: Lesson[] }> {
  const courseRes = await fetch(
    `http://localhost:5000/api/courses/${courseId}`,
    {
      cache: "no-store",
    }
  );
  const course = await courseRes.json();

  const lessonsRes = await fetch(
    `http://localhost:5000/api/lessons/by-course/${courseId}`,
    { cache: "no-store" }
  );
  const lessons = await lessonsRes.json();

  return { course, lessons };
}

// بررسی دسترسی کاربر به دوره
async function checkCourseAccess(
  courseId: string,
  token?: string
): Promise<Access> {
  if (!token) return { is_purchased: false, locked: true };

  const res = await fetch(
    `http://localhost:5000/api/courses/${courseId}/check-access`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  if (!res.ok) return { is_purchased: false, locked: true };
  return await res.json();
}

interface ClientPageProps {
  params: {
    category: string;
    subSlug?: string;
    courseId: string;
  };
}

// کامپوننت را از CoursePage به CourseClientPage تغییر نام دادیم
export default function CourseClientPage({ params }: ClientPageProps) {
  const { category, subSlug, courseId } = params;
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [access, setAccess] = useState<Access>({
    is_purchased: false,
    locked: true,
  });
  const [loading, setLoading] = useState(true);

  const { user, token } = useAuth(); // فرض بر وجود useAuth

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { course, lessons } = await getCourseData(courseId);
      setCourse(course);
      setLessons(lessons); // اگر دوره رایگان بود یا کاربر پولی خرید کرده

      if (course.is_free || course.price === 0) {
        setAccess({ is_purchased: true, locked: false });
      } else {
        const accessData = await checkCourseAccess(
          courseId,
          token ?? undefined
        );
        setAccess(accessData);
      }
      setLoading(false);
    }

    fetchData();
  }, [courseId, token]);

  if (loading) return <p className="text-center p-10">در حال بارگذاری...</p>;
  if (!course)
    return <p className="text-center p-10 text-red-500">دوره پیدا نشد</p>;

  const coursePath = subSlug
    ? `/courses/${category}/${subSlug}/${courseId}`
    : `/courses/${category}/${courseId}`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
      {subSlug && (
        <h2 className="text-lg text-gray-500 mb-2">
          {subSlug.replace(/-/g, " ")}
        </h2>
      )}

      <p className="text-gray-700 mb-4">{course.description}</p>

      <p className="text-lg font-bold text-green-600 mb-6">
        {course.is_free || course.price === 0
          ? "رایگان"
          : `${Number(course.price).toLocaleString()} تومان`}
      </p>

      <h2 className="text-2xl font-semibold mb-4">درس‌های این دوره</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lessons.map((lesson) => {
          const showLesson =
            lesson.is_free ||
            access.is_purchased ||
            course.is_free ||
            course.price === 0;

          if (!showLesson) {
            return (
              <div
                key={lesson.id}
                className="p-4 border rounded-xl bg-yellow-50 text-center"
              >
                <p className="mb-2">{lesson.title}</p>
                <p className="text-xs text-gray-500">
                  برای مشاهده این درس باید دوره را خریداری کنید.
                </p>
                <Link
                  href={token ? `/purchase/${course.id}` : `/auth/login`}
                  className="px-3 py-1 mt-2 inline-block bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {token ? "خرید دوره" : "ورود / ثبت‌نام"}
                </Link>
              </div>
            );
          }

          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              coursePath={coursePath}
            />
          );
        })}
      </div>
    </div>
  );
}
