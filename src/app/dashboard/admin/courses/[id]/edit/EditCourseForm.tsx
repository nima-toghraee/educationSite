"use client";

import { useRouter } from "next/navigation";
import CourseForm from "../components/CourseForm";
import { Category, Course } from "@/types/course";

export default function EditCourseForm({
  course,
  categories,
}: {
  course: Course;
  categories: Category[];
}) {
  const router = useRouter();
  const formInitialData = {
    ...course,
    price: course.price?.toString() ?? "",
    discount_percent: course.discount_percent?.toString() ?? "",
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">ویرایش دوره</h2>

      <CourseForm
        categories={categories}
        initialData={formInitialData}
        onSubmit={async (data) => {
          console.log("🟡 SUBMIT FIRED");
          console.log("DATA:", data);
          try {
            const res = await fetch(
              `http://localhost:5000/api/courses/${course.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include", // 👈 اگر auth با cookie هست
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
