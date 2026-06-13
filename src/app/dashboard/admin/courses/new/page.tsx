import { cookies } from "next/headers";
import NewCourseForm from "./NewCourseForm";
import { Category } from "@/types/course";

export default async function NewCoursePage() {
  const categoriesRes = await fetch(
    "http://localhost:5000/api/categories/main",
    {
      cache: "no-store",
    },
  );

  if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

  const categories: Category[] = await categoriesRes.json();

  return <NewCourseForm categories={categories} />;
}
