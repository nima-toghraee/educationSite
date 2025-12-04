"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  description?: string;
  grade?: string;
  field?: string;
}

interface Lesson {
  id: number;
  title: string;
  thumbnail_url?: string;
  duration?: string;
}

export default function FilteredCoursePage() {
  const { courseId, category } = useParams() as {
    courseId: string;
    category: string;
  };
  const categorySlug = category;

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [errorCourse, setErrorCourse] = useState("");
  const [errorLessons, setErrorLessons] = useState("");

  // fetch اطلاعات دوره
  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      setLoadingCourse(true);
      setErrorCourse("");
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/${courseId}`
        );
        if (!res.ok) throw new Error("خطا در دریافت اطلاعات دوره");

        const data: Course = await res.json();
        setCourse(data);
      } catch (err: unknown) {
        if (err instanceof Error) setErrorCourse(err.message);
        else setErrorCourse("خطا در دریافت دوره");
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // fetch لیست درس‌ها
  useEffect(() => {
    if (!courseId) return;

    const fetchLessons = async () => {
      setLoadingLessons(true);
      setErrorLessons("");
      try {
        const res = await fetch(
          `http://localhost:5000/api/lessons/by-course/${courseId}`
        );
        if (!res.ok) throw new Error("خطا در دریافت درس‌ها");

        const data: Lesson[] = await res.json();
        setLessons(data);
      } catch (err: unknown) {
        if (err instanceof Error) setErrorLessons(err.message);
        else setErrorLessons("خطا در دریافت درس‌ها");
      } finally {
        setLoadingLessons(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  if (loadingCourse)
    return <p className="text-center mt-6">در حال بارگذاری دوره...</p>;
  if (errorCourse)
    return <p className="text-center mt-6 text-red-500">{errorCourse}</p>;
  if (!course) return <p className="text-center mt-6">دوره‌ای پیدا نشد.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* اطلاعات دوره */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-sm text-gray-600 text-right">
          {course.grade} - {course.field}
        </p>
        <div className="prose mt-4">
          <p>{course.description || "بدون توضیحات"}</p>
        </div>
      </div>

      {/* لیست درس‌ها */}
      <h2 className="text-xl font-semibold mb-4">درس‌های دوره</h2>
      {loadingLessons && <p>در حال بارگذاری درس‌ها...</p>}
      {errorLessons && <p className="text-red-500">{errorLessons}</p>}
      {!loadingLessons && lessons.length === 0 && (
        <p>هیچ درسی برای این دوره وجود ندارد.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {lessons.map((lesson, index) => (
          <Link
            key={lesson.id}
            href={`/courses/${categorySlug}/filter/${courseId}/lessons/${lesson.id}`}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center"
          >
            {lesson.thumbnail_url && (
              <img
                src={lesson.thumbnail_url}
                alt={lesson.title}
                className="w-full h-32 object-cover mb-3 rounded"
              />
            )}
            <span className="text-gray-500 text-sm mb-1">درس {index + 1}</span>
            <h3 className="font-semibold text-lg text-center">
              {lesson.title}
            </h3>
            {lesson.duration && (
              <p className="text-sm text-gray-600 mt-1">{lesson.duration}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
