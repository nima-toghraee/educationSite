import Link from "next/link";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail_url: string;
  };
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block bg-white shadow-md hover:shadow-xl rounded-2xl p-6 border border-gray-100 hover:border-blue-500 transition-all duration-300"
    >
      <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition">
        {course.title}
      </h2>

      <p className="text-gray-600 text-sm">{course.description}</p>

      <img
        src={course.thumbnail_url}
        alt={course.title}
        className="mt-4 w-full h-40 object-cover rounded-lg"
      />

      <span className="mt-4 inline-block text-blue-600 group-hover:underline font-semibold">
        مشاهده ویدیوها →
      </span>
    </Link>
  );
}
