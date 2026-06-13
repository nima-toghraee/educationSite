import Link from "next/link";
import CourseHeader from "./components/CourseHeader";
import LessonList from "./components/LessonList";
import { Course } from "@/types/course";
import { Lesson } from "@/types/lesson";

async function getCourse(id: string): Promise<Course> {
  const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch course");

  return res.json();
}

async function getLessons(id: string): Promise<Lesson[]> {
  const res = await fetch(`http://localhost:5000/api/lessons/by-course/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch lessons");

  return res.json();
}

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const [course, lessons] = await Promise.all([
    getCourse(params.id),
    getLessons(params.id),
  ]);

  return (
    <div className="space-y-6">
      <CourseHeader course={course} />

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">لیست درس های دوره</h3>

        <Link
          href={`/dashboard/admin/courses/${course.id}/lessons/new`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          + افزودن لسن
        </Link>
      </div>

      <LessonList lessons={lessons} courseId={course.id} />
    </div>
  );
}
