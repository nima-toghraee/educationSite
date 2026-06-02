import CoursePage from "@/components/course/CoursePage";
import type { PageProps } from "next/types";

interface CoursePageParams {
  category: string;
  subSlug?: string;
  courseId: string;
}

interface CoursePagePageProps extends PageProps {
  params: CoursePageParams;
}

export default function Page({ params }: CoursePagePageProps) {
  return (
    <CoursePage
      category={params.category}
      subSlug={params.subSlug}
      courseId={params.courseId}
    />
  );
}
