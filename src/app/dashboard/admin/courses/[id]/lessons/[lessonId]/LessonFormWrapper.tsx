"use client";

import { Lesson } from "@/types/lesson";
import { useRouter } from "next/navigation";
import LessonForm from "../new/LessonForm";

export default function LessonFormWrapper({
  lesson,
  courses,
  courseId,
}: {
  lesson: Lesson;
  courses: any[];
  courseId: string;
}) {
  const router = useRouter();

  const handleSubmit = async (data: Lesson) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons/${lesson.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "خطا در ویرایش درس");
      }

      alert("✅ تغییرات با موفقیت ذخیره شد");

      router.push(`/dashboard/admin/courses/${courseId}`);
    } catch (err: any) {
      console.error(err);
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <LessonForm
      initialData={lesson}
      courses={courses}
      onSubmit={handleSubmit}
      submitLabel="ویرایش درس"
    />
  );
}
