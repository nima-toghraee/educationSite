"use client";

import { useRouter } from "next/navigation";
import CourseForm from "../[id]/components/CourseForm";
import { Category } from "@/types/course";

type Props = {
  categories: Category[];
};

export default function NewCourseForm({ categories }: Props) {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">افزودن دوره جدید</h2>

      <CourseForm
        categories={categories}
        onSubmit={async (data) => {
          try {
            console.log("DATA:", data);

            const res = await fetch("http://localhost:5000/api/courses", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("خطا در ایجاد دوره");

            router.push("/dashboard/admin/courses");
          } catch (err) {
            console.error(err);
            alert("خطا در ایجاد دوره");
          }
        }}
        submitLabel="ایجاد دوره"
      />
    </div>
  );
}
