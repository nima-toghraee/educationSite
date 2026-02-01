"use client";

import Link from "next/link";
import type { Course } from "@/types/course";

type Props = {
  courses: Course[];
  categorySlug: string;
  subSlug: string;
};

export default function CourseGrid({ courses, categorySlug, subSlug }: Props) {
  if (!courses.length) {
    return (
      <p className="text-center py-16 text-gray-500 text-lg">
        دوره‌ای یافت نشد
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course) => {
        const isFree = course.is_free;

        return (
          <Link
            key={course.id}
            href={`/courses/${categorySlug}/${subSlug}/${course.id}`}
            className="group block bg-white rounded-2xl border border-gray-100
             shadow-sm hover:shadow-xl transition-all duration-300
             hover:-translate-y-1
             flex flex-col h-full"
          >
            {/* تصویر دوره */}
            <div className="relative w-full h-48 overflow-hidden rounded-t-2xl bg-gray-100">
              {course.thumbnail_url ? (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-full object-cover
                             transition-transform duration-300
                             group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  بدون تصویر
                </div>
              )}

              {/* Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full
                  ${
                    isFree
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
              >
                {isFree ? "رایگان" : "پولی"}
              </span>
            </div>

            {/* محتوای متنی */}
            <div className="p-5 flex flex-col h-full">
              <h3
                className="font-bold text-lg text-gray-800 mb-2 line-clamp-2
                           group-hover:text-blue-600 transition-colors"
              >
                {course.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {course.total_duration} دقیقه
                </span>

                <span className="text-base font-bold text-blue-600">
                  {isFree ? "رایگان" : `${course.price} تومان`}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
