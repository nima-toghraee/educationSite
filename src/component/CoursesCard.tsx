import Link from "next/link";

type Props = {
  course: any;
  category: string;
};

export default function CoursesCard({ course, category }: Props) {
  return (
    <Link
      href={`/videos/${category}/${course.id}`}
      className="block rounded-2xl border border-gray-100 bg-white p-5 shadow-md hover:shadow-xl hover:border-blue-500 transition-all duration-300"
    >
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
        {course.title}
      </h2>

      <p className="text-gray-600 text-sm md:text-base line-clamp-2">
        {course.description}
      </p>

      {course.thumbnail_url && (
        <img
          src={course.thumbnail_url}
          alt={course.title}
          className="mt-3 w-full h-40 object-cover rounded-lg"
        />
      )}

      <span className="mt-3 block text-blue-600 font-medium text-sm">
        مشاهده ویدیو →
      </span>
    </Link>
  );
}
