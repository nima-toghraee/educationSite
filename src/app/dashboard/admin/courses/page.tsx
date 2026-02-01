import AdminLayout from "../layout";
import Link from "next/link";

export default function CoursesPage() {
  // TODO: جایگزین با fetch از API
  const courses = [
    { id: 1, title: "فیزیک دهم" },
    { id: 2, title: "ریاضی یازدهم" },
  ];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">دوره‌ها</h2>
        <Link
          href="/dashboard/admin/courses/LessonForm"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          افزودن دوره جدید
        </Link>
      </div>

      <ul className="space-y-2">
        {courses.map((course) => (
          <li
            key={course.id}
            className="p-3 bg-white rounded shadow flex justify-between items-center"
          >
            <span>{course.title}</span>
            <Link
              href={`/dashboard/admin/courses/${course.id}`}
              className="text-blue-600 hover:underline"
            >
              ویرایش
            </Link>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
}
