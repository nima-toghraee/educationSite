"use client";

import { useRouter } from "next/navigation";
import CourseForm from "../components/CourseForm";
import { Category } from "@/types/course";

type Course = {
  id: number;
  title: string;
  description?: string;
  thumbnail_url?: string;
  price?: number;
  is_free?: boolean;
  is_published?: boolean;
  field?: string;
  grade?: string;
  discount_percent?: number;
  category_id?: number;
  sub_category_id?: number;
};

export default function EditCourseForm({
  course,
  categories,
  token,
}: {
  course: Course;
  categories: Category[];
  token: string | null;
}) {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">ویرایش دوره</h2>

      <CourseForm
        categories={categories}
        token={token}
        initialData={course} // داده‌های اولیه فرم
        onSubmit={async (data) => {
          try {
            const res = await fetch(
              `http://localhost:5000/api/courses/${course.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token ? `Bearer ${token}` : "",
                },
                body: JSON.stringify(data),
              },
            );

            if (!res.ok) throw new Error("خطا در بروزرسانی دوره");

            alert("دوره با موفقیت بروزرسانی شد");
            router.push("/dashboard/admin/courses");
          } catch (err) {
            console.error(err);
            alert("خطا در بروزرسانی دوره");
          }
        }}
        submitLabel="ذخیره تغییرات"
      />
    </div>
  );
}
