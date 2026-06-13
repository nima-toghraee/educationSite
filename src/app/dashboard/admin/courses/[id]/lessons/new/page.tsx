"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LessonForm from "./LessonForm";
import { Course } from "@/types/course";
import { Lesson } from "@/types/lesson";

export default function NewLessonPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(`${API_URL}/courses`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCourses();
  }, []);

  const handleSubmit = async (lesson: Lesson) => {
    console.log("📦 LESSON SENT TO API:", lesson);
    try {
      const res = await fetch(`${API_URL}/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(lesson),
      });

      if (!res.ok) throw new Error("خطا در ایجاد درس");

      alert("درس با موفقیت ایجاد شد");
      router.push("/dashboard/admin/courses");
    } catch (err) {
      console.error(err);
      alert("خطا در ایجاد درس");
    }
  };

  if (courses.length === 0) return <p>در حال بارگذاری دوره‌ها...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">افزودن درس جدید</h2>
      <LessonForm courses={courses} onSubmit={handleSubmit} />
    </div>
  );
}
