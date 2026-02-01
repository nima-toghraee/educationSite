import CourseClient from "@/components/course/CourseClient";
import { getCourseWithLessons } from "@/services/courseService";

interface PageProps {
  params: { category: string; courseId: string };
}

export default async function Page({ params }: PageProps) {
  const { category, courseId } = params;

  // fetch server-side
  const data = await getCourseWithLessons(courseId);

  if (!data) throw new Error("دوره پیدا نشد");

  return (
    <CourseClient
      category={category}
      course={data.course}
      lessons={data.lessons}
    />
  );
}
