import CoursePage from "@/components/course/CoursePage";

export default function Page({
  params,
}: {
  params: { category: string; subSlug?: string; courseId: string };
}) {
  return (
    <CoursePage
      category={params.category}
      subSlug={params.subSlug}
      courseId={params.courseId}
    />
  );
}
