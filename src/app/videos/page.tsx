import Link from "next/link";

const categories = [
  { id: "react", name: "React آموزش" },
  { id: "nextjs", name: "Next.js آموزش" },
];

export default function VideosCategories() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">موضوعات ویدیوهای آموزشی</h1>
      <ul className="space-y-4">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/videos/${cat.id}`}
              className="text-blue-600 hover:underline text-xl"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
