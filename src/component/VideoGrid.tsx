import Image from "next/image";
import Link from "next/link";

type Video = {
  id: string;
  category: string;
  title: string;
  thumbnail: string;
};

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <section className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">🎥 آخرین ویدیوها</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link
            key={video.id}
            href={`/videos/${video.category}/${video.id}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
          >
            {/* تصویر ویدیو */}
            <div className="relative w-full h-48">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* عنوان ویدیو */}
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-green-700 transition-colors">
                {video.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
