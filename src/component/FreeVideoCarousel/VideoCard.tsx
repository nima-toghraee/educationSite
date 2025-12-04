"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

type Video = {
  id: string;
  title: string;
  thumbnail: string | null;
  category: string;
  sub_category?: string;
};

type VideoCardProps = {
  video: Video;
  isCenter?: boolean;
  isLoading?: boolean;
};

function toSlug(name?: string) {
  return (name || "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\u0600-\u06FF-]/g, "")
    .toLowerCase();
}

export default function VideoCard({
  video,
  isCenter = false,
  isLoading = false,
}: VideoCardProps) {
  const category = video?.category || "بدون دسته‌بندی";
  const subCategory = video?.sub_category || "";

  const href =
    category === "توانمندی ذهن"
      ? `/courses/${toSlug(category)}/${toSlug(subCategory)}/${video.id}`
      : `/courses/${toSlug(category)}/filter/${video.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
    >
      <Link
        href={href}
        className={`block border transition-all border-transparent ${
          isCenter ? "ring-2 ring-green-400" : "hover:ring hover:ring-gray-200"
        }`}
        style={{ pointerEvents: isCenter ? "auto" : "none" }}
      >
        <div className="relative w-full h-40 sm:h-48">
          {isLoading || !video.thumbnail ? (
            <Skeleton
              height="100%"
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
              className="rounded-xl"
            />
          ) : (
            <Image
              src={`https://backend-education-x5ta.onrender.com${video.thumbnail}`}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          )}
        </div>
        <div className="p-4 text-center text-sm sm:text-base font-medium line-clamp-2">
          {isLoading ? <Skeleton width="80%" /> : video.title}
        </div>
        <p className="text-xs text-gray-500 mt-1 text-center">{category}</p>
      </Link>
    </motion.div>
  );
}
