import EditCourseForm from "./EditCourseForm";
import { Course } from "@/types/course";

async function getCourse(id: string): Promise<Course> {
  const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch course");

  return res.json();
}

async function getCategories() {
  const res = await fetch("http://localhost:5000/api/categories/main", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
}

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [categories, course] = await Promise.all([
    getCategories(),
    getCourse(id),
  ]);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">ویرایش دوره</h2>

      <EditCourseForm course={course} categories={categories} />
    </div>
  );
}
