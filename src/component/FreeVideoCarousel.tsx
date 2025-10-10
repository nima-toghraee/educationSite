"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Video = {
  id: string;
  title: string;
  thumbnail: string;
};

const freeVideos: Video[] = [
  { id: "1", title: "آموزش ری‌اکت رایگان", thumbnail: "/home3.jpg" },
  { id: "2", title: "آموزش نکست‌جی‌اس کاربردی", thumbnail: "/home1.jpg" },
  { id: "3", title: "ترفندهای جاوااسکریپت", thumbnail: "/home5.jpg" },
  { id: "4", title: "رایگان: دیزاین با Tailwind", thumbnail: "/home2.jpg" },
  { id: "5", title: "ورود به مسیر فریلنسر", thumbnail: "/home4.jpg" },
];

export default function FreeVideoCarousel() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const prev = () =>
    setActive((i) => (i - 1 + freeVideos.length) % freeVideos.length);

  const next = () => setActive((i) => (i + 1) % freeVideos.length);

  const getIndex = (offset: number) =>
    (active + offset + freeVideos.length) % freeVideos.length;

  useEffect(() => {
    // شبیه‌سازی لود دیتا
    const timer = setTimeout(() => {
      setIsLoading(false);
      startAutoPlay();
    }, 2000); // 2 ثانیه لودینگ

    return () => {
      clearTimeout(timer);
      stopAutoPlay();
    };
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % freeVideos.length);
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-6xl mx-auto py-8 sm:py-10 md:py-12 px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center tracking-tight">
          🎬 آموزش‌های رایگان
        </h2>

        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              prev();
              startAutoPlay();
            }}
            className="rounded-full p-2 sm:p-3 bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
            aria-label="قبلی"
          >
            {"<"}
          </button>

          <div className="flex gap-3 sm:gap-4 md:gap-6 w-[260px] xs:w-[320px] sm:w-[400px] md:w-[600px] overflow-hidden relative">
            <AnimatePresence initial={false} mode="popLayout">
              {[getIndex(-1), active, getIndex(1)].map((idx, i) => {
                const isCenter = i === 1;
                const video = freeVideos[idx];

                return (
                  <motion.div
                    key={video.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.6,
                      scale: isCenter ? 1.05 : 0.9,
                      y: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: 30 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className={`flex-shrink-0 ${
                      isCenter
                        ? "w-28 xs:w-32 sm:w-44 md:w-64"
                        : "w-20 xs:w-24 sm:w-32 md:w-40"
                    }`}
                  >
                    <Link
                      href={`/videos/free/${video.id}`}
                      className={`block bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl 
                      overflow-hidden border transition-all border-transparent 
                      ${
                        isCenter
                          ? "ring-2 ring-green-400"
                          : "hover:ring hover:ring-gray-200"
                      }`}
                      style={{
                        pointerEvents: isCenter ? "auto" : "none",
                      }}
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
                      <div className="p-1 sm:p-2 text-center text-xs xs:text-sm md:text-base font-medium line-clamp-2">
                        {isLoading ? <Skeleton width="80%" /> : video.title}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            onClick={() => {
              next();
              startAutoPlay();
            }}
            className="rounded-full p-2 sm:p-3 bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
            aria-label="بعدی"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
}
