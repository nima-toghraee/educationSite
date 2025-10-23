import { Lesson } from "@/types/lesson";
import Link from "next/link";

type Props = {
  lesson: Lesson;
  category: string;
  courseId: number;
};

export default function LessonCard({ lesson, category, courseId }: Props) {
  return (
    <Link
      href={`/videos/${category}/${courseId}/${lesson.id}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {lesson.title}
      </h3>

      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
        {lesson.description}
      </p>

      <span className="text-blue-600 font-medium text-sm">
        زمان ویدیو: {lesson.duration} دقیقه
      </span>
    </Link>
  );
}
