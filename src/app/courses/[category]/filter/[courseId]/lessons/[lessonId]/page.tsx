import LessonClient from "@/components/lesson/LessonClient";
import { getLessonById } from "@/services/lessonsService";

interface LessonPageProps {
  params: { lessonId: string };
}

export default async function LessonServerPage({ params }: LessonPageProps) {
  try {
    const lesson = await getLessonById(params.lessonId);
    return <LessonClient lesson={lesson} />;
  } catch (error) {
    return (
      <p className="text-red-500 text-center p-6">
        درس پیدا نشد یا خطا رخ داده است.
      </p>
    );
  }
}
