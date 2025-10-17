"use client";

import { motion, AnimatePresence } from "framer-motion";
import VideoCard from "./VideoCard";

type CarouselTrackProps = {
  videos: { id: string; title: string; thumbnail: string }[];
  active: number;
  isLoading: boolean;
  getIndex: (offset: number) => number;
};

export default function CarouselTrack({
  videos,
  active,
  isLoading,
  getIndex,
}: CarouselTrackProps) {
  if (videos.length === 0) return null;

  const count = Math.min(videos.length, 3);

  return (
    <div className="flex gap-4 sm:gap-6 w-[260px] xs:w-[320px] sm:w-[400px] md:w-[600px] overflow-hidden relative">
      <AnimatePresence initial={false} mode="popLayout">
        {[...Array(count)].map((_, i) => {
          const idx = getIndex(i - 1);
          const isCenter = i === 1 && videos.length > 1;
          const video = videos[idx];

          return (
            <motion.div
              key={`${video.id}-${i}`}
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
              <VideoCard
                video={video}
                isCenter={isCenter}
                isLoading={isLoading}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
