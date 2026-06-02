import Link from "next/link";

type Course = {
  id: number;
  title: string;
  description?: string;
  is_published?: boolean;
};

export default function CourseHeader({ course }: { course: Course }) {
  return (
    <div className="bg-white border rounded-xl p-6 space-y-4">
      {/* title + status */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {course.title}
          </h1>

          {course.description && (
            <p className="text-sm text-gray-500 mt-2 max-w-2xl">
              {course.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* publish badge */}
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium
              ${
                course.is_published
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
          >
            {course.is_published ? "منتشر شده" : "پیش‌نویس"}
          </span>

          {/* edit button */}
          <Link
            href={`/dashboard/admin/courses/${course.id}/edit`}
            className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition"
          >
            ویرایش دوره
          </Link>
        </div>
      </div>

      {/* divider */}
      <div className="border-t pt-4 text-xs text-gray-400">
        شناسه دوره: {course.id}
      </div>
    </div>
  );
}
