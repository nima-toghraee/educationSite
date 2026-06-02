import Link from "next/link";
import { cookies } from "next/headers";
import DeleteCourseButton from "./DeleteCourseButton";
import { Course } from "@/types/course";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { FaBook, FaBookOpen } from "react-icons/fa6";

async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("[COURSES] fetch failed:", res.status);
    return [];
  }

  return res.json();
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {" "}
      {/* header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">مدیریت دوره‌ها</h1>
          <p className="text-base text-gray-600 mt-1">
            مرور، ویرایش و مدیریت تمامی دوره‌های آموزشی شما.
          </p>
        </div>

        <Link
          href="/dashboard/admin/courses/new"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <FaPlusCircle className="w-5 h-5" /> <span> افزودن دوره جدید</span>
        </Link>
      </div>
      {/* empty state */}
      {courses.length === 0 ? (
        <div className="border border-dashed rounded-2xl p-16 text-center bg-white flex flex-col items-center justify-center space-y-4">
          <FaBookOpen className="w-16 h-16 text-gray-400" />{" "}
          <h3 className="text-xl font-semibold text-gray-700">
            هنوز هیچ دوره‌ای اضافه نشده است!
          </h3>
          <p className="text-gray-500 mb-4 max-w-md">
            برای شروع، روی دکمه "افزودن دوره جدید" کلیک کنید و اولین دوره آموزشی
            خود را ایجاد نمایید.
          </p>
          <Link
            href="/dashboard/admin/courses/new"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            ایجاد اولین دوره
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FaBook className="w-6 h-6 text-blue-500" />{" "}
                  <p className="font-bold text-lg text-gray-900 truncate">
                    {course.title}
                  </p>
                </div>
                <p className="text-xs text-gray-400 ml-9">
                  شناسه دوره: {course.id}
                </p>
              </div>

              <div className="flex items-center justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
                <Link
                  href={`/dashboard/admin/courses/${course.id}`}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  <FaRegEdit className="w-4 h-4" />
                  <span>ویرایش</span>
                </Link>

                <DeleteCourseButton id={course.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
