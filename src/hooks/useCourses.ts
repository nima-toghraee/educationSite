import { Course } from "@/types/course";
import { useEffect, useState } from "react";

export function useFreeCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://backendeducation-production-6623.up.railway.app/api/courses/free"
        );
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data: Course[] = await res.json();
        setCourses(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
}
