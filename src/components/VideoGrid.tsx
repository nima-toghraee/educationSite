"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { slugify } from "@/lib/slugify";

type Video = {
  id: string;
  category: string;
  sub_category?: string;
  title: string;
  thumbnail: string | null;
};

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(`${API_URL}/courses/latest?limit=3`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("خطا در دریافت ویدیوها");
        }

        const json = await res.json();

        const data: Video[] = Array.isArray(json) ? json : json.data || [];

        setVideos(data);
      } catch (err) {
        console.error("خطا در دریافت ویدیوها:", err);

        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, [API_URL]);

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-20">
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          🎥 آخرین ویدیوها
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse rounded-2xl h-48"
              />
            ))
          ) : videos.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              ویدیویی یافت نشد
            </p>
          ) : (
            videos.map((video, idx) => {
              const href =
                video.category === "mind-skills"
                  ? `/courses/${slugify(video.category)}/${slugify(
                      video.sub_category || "",
                    )}/${video.id}`
                  : `/courses/${slugify(video.category)}/filter/${video.id}`;

              return (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: idx * 0.05,
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <Link href={href} className="block">
                    {video.thumbnail && (
                      <div className="relative w-full h-48">
                        <Image
                          src={video.thumbnail}
                          alt={video.title || "ویدیو بدون عنوان"}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-4">
                      <h3 className="text-lg font-semibold line-clamp-2 hover:text-green-700 transition-colors">
                        {video.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        دسته‌بندی: {video.category}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
