import LessonFormWrapper from "./LessonFormWrapper";
type Props = {
  params: { id: string; lessonId: string };
};

async function getLesson(lessonId: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/lessons/${lessonId}`;

  const res = await fetch(url, { cache: "no-store" });

  const text = await res.text();

  console.log("[GET_LESSON]", url, res.status, text);

  if (!res.ok) throw new Error("Failed to fetch lesson");

  return JSON.parse(text);
}

async function getCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function EditLessonPage({ params }: Props) {
  const [lesson, courses] = await Promise.all([
    getLesson(params.lessonId),
    getCourses(),
  ]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <LessonFormWrapper
        lesson={lesson}
        courses={courses}
        courseId={params.id}
      />
    </div>
  );
}
