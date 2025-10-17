"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Video = {
  id: string;
  category: string;
  title: string;
  thumbnail: string;
};

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          "http://localhost:5000/api/courses/latest?limit=3"
        );
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("خطا در دریافت ویدیوها:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-20">
      <div className="px-4 py-8 max-w-6xl mx-auto ">
        <h2 className="text-2xl font-bold text-center mb-8">
          🎥 آخرین ویدیوها
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse rounded-2xl h-48"
                ></div>
              ))
            : videos.map((video) => (
                <Link
                  key={video.id}
                  href={`/videos/${video.category}/${video.id}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-green-700 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
