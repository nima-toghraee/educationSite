import { cookies } from "next/headers";
import EditCourseForm from "./EditCourseForm";

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
};

async function getCourse(
  id: string,
  token: string | undefined,
): Promise<Course> {
  const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch course");

  return res.json();
}

async function getCategories(token?: string) {
  const res = await fetch("http://localhost:5000/api/categories/main", {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const categories = await getCategories(token);
  const course = await getCourse(id, token);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">ویرایش دوره</h2>
      <EditCourseForm
        course={course}
        categories={categories}
        token={token ?? null}
      />{" "}
    </div>
  );
}
