import Link from "next/link";

type Video = {
  id: string;
  title: string;
  description: string;
  category: string;
};

const videos: Video[] = [
  {
    id: "vid1",
    category: "react",
    title: "React جلسه 1",
    description: "مقدمه React",
  },
  {
    id: "vid2",
    category: "react",
    title: "React جلسه 2",
    description: "کامپوننت‌ها",
  },
  {
    id: "vid3",
    category: "nextjs",
    title: "Next.js جلسه 1",
    description: "مقدمه Next.js",
  },
  {
    id: "vid4",
    category: "nextjs",
    title: "Next.js جلسه 2",
    description: "مسیردهی داینامیک",
  },
];

type Props = {
  params: { category: string };
};

export default function CategoryVideos({ params }: Props) {
  const filtered = videos.filter((v) => v.category === params.category);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        ویدیوهای آموزشی: {params.category}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((video) => (
          <Link
            href={`/videos/${params.category}/${video.id}`}
            key={video.id}
            className="block border rounded p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <p className="mt-2 text-gray-600">{video.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
