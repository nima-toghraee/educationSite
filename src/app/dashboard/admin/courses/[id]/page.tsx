import { cookies } from "next/headers";
import Link from "next/link";
import CourseHeader from "./components/CourseHeader";
import LessonList from "./components/LessonList";

type Course = {
  id: number;
  title: string;
  description?: string;
  is_published?: boolean;
};

type Lesson = {
  id: number;
  title: string;
  order?: number;
};

async function getCourse(
  id: string,
  token: string | undefined,
): Promise<Course> {
  const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch course");

  return res.json();
}

async function getLessons(
  id: string,
  token: string | undefined,
): Promise<Lesson[]> {
  const res = await fetch(`http://localhost:5000/api/lessons/by-course/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
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
  const token = cookies().get("token")?.value;

  const [course, lessons] = await Promise.all([
    getCourse(params.id, token),
    getLessons(params.id, token),
  ]);

  return (
    <div className="space-y-6">
      {/* header */}
      <CourseHeader course={course} />

      {/* actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">
          {" "}
          لیست درس های دوره
        </h3>

        <Link
          href={`/dashboard/admin/courses/${course.id}/lessons/new`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          + افزودن لسن
        </Link>
      </div>

      {/* lesson list */}
      <LessonList
        lessons={lessons}
        courseId={course.id}
        token={token ?? null}
      />
    </div>
  );
}
