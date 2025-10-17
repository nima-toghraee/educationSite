"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCourseById, fetchLessonsByCourse } from "@/lib/apiLessons";
import CourseHeader from "@/component/CourseHeader";
import LessonCard from "@/component/LessonCard";
import { Course } from "@/type/course";
import { Lesson } from "@/type/lesson";

export default function CourseLessonsPage() {
  const params = useParams();
  const { category, courseId } = params;

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseData, lessonsData] = await Promise.all([
          fetchCourseById(courseId as string),
          fetchLessonsByCourse(courseId as string),
        ]);
        setCourse(courseData);
        setLessons(lessonsData);
      } catch (err) {
        console.error("❌ خطا در دریافت داده‌ها:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [courseId]);

  if (loading) return <p className="text-center py-20">در حال بارگذاری...</p>;
  if (!course) return <p className="text-center py-20">کورس پیدا نشد.</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      <CourseHeader title={course.title} description={course.description} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              category={category as string}
              courseId={course.id}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            هنوز هیچ لسن‌ای در این کورس اضافه نشده است.
          </p>
        )}
      </div>
    </main>
  );
}
