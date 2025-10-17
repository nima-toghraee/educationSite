"use client";

import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

type VideoCardProps = {
  video: { id: string; title: string; thumbnail: string };
  isCenter: boolean;
  isLoading: boolean;
};

export default function VideoCard({
  video,
  isCenter,
  isLoading,
}: VideoCardProps) {
  return (
    <Link
      href={`/videos/free/${video.id}`}
      className={`block bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border transition-all border-transparent ${
        isCenter ? "ring-2 ring-green-400" : "hover:ring hover:ring-gray-200"
      }`}
      style={{ pointerEvents: isCenter ? "auto" : "none" }}
    >
      <div className="relative w-full h-20 xs:h-24 sm:h-28 md:h-40">
        {isLoading ? (
          <Skeleton
            height={"100%"}
            baseColor="#e0e0e0"
            highlightColor="#f5f5f5"
            className="rounded-xl"
          />
        ) : (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        )}
      </div>
      <div className="p-2 text-center text-sm sm:text-base font-medium line-clamp-2">
        {isLoading ? <Skeleton width="80%" /> : video.title}
      </div>
    </Link>
  );
}
