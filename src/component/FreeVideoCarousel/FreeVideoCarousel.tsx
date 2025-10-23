"use client";

import { useState, useEffect, useRef } from "react";
import CarouselControls from "./CarouselControls";
import CarouselTrack from "./CarouselTrack";

type Video = { id: string; title: string; thumbnail: string };

export default function FreeVideoCarousel() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(
          "https://backendeducation-production-6623.up.railway.app/api/courses/free/top"
        );
        const json = await res.json();

        // بررسی اینکه json آرایه هست یا داخل data هست
        const data: Video[] = Array.isArray(json) ? json : json.data || [];

        const topVideos = data.slice(0, 5);
        setVideos(topVideos);

        if (topVideos.length > 0) {
          startAutoPlay(topVideos.length);
        }
      } catch (error) {
        console.error("خطا در دریافت ویدیوها:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = (length: number) => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setActive((i) => (length > 0 ? (i + 1) % length : 0));
    }, 4000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const prev = () =>
    setActive((i) =>
      videos.length ? (i - 1 + videos.length) % videos.length : 0
    );
  const next = () =>
    setActive((i) => (videos.length ? (i + 1) % videos.length : 0));
  const getIndex = (offset: number) =>
    videos.length ? (active + offset + videos.length) % videos.length : 0;

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-6xl mx-auto py-8 px-2 sm:px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-8 text-center tracking-tight">
          🎬 آموزش‌های رایگان
        </h2>

        <div className="relative flex items-center justify-center">
          {/* دکمه قبلی */}
          <div className="absolute right-0 z-10">
            <button
              onClick={() => {
                next();
                startAutoPlay(videos.length);
              }}
              className="rounded-full p-2 sm:p-3 bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
              aria-label="بعدی"
            >
              {"<"}
            </button>
          </div>

          {/* کورس */}
          <CarouselTrack
            videos={videos}
            active={active}
            isLoading={isLoading}
            getIndex={getIndex}
          />

          {/* دکمه بعدی */}
          <div className="absolute left-0 z-10">
            <button
              onClick={() => {
                prev();
                startAutoPlay(videos.length);
              }}
              className="rounded-full p-2 sm:p-3 bg-white shadow-md hover:shadow-lg transition-all hover:scale-110"
              aria-label="قبلی"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
