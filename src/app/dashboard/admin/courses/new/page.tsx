import { cookies } from "next/headers";
import NewCourseForm from "./NewCourseForm";

type Category = { id: number; name: string; parent_id: number | null };

export default async function NewCoursePage() {
  const token = cookies().get("token")?.value ?? null;

  const categoriesRes = await fetch(
    "http://localhost:5000/api/categories/main",
    {
      cache: "no-store",
    },
  );

  if (!categoriesRes.ok) throw new Error("Failed to fetch categories");

  const categories: Category[] = await categoriesRes.json();

  return <NewCourseForm categories={categories} token={token} />;
}
