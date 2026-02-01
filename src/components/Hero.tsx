"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  // شبیه‌سازی لودینگ دیتا
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 20);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-16 md:py-20">
      <div className="container mx-auto max-w-screen-xl px-6 flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-20">
        {/* متن */}
        <div className="flex-1 text-center md:text-right">
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-snug">
            {isLoading ? (
              <Skeleton width={350} height={60} />
            ) : (
              "مسیر یادگیری با دکتر موسوی"
            )}
          </h3>

          <p className="mt-6 text-gray-700 text-base sm:text-lg md:text-lg max-w-md md:max-w-lg mx-auto md:mx-0 leading-relaxed">
            {isLoading ? (
              <Skeleton count={3} />
            ) : (
              "ما نوجوانان را در مسیر تقویت ذهن، مدیریت استرس و رسیدن به اهدافشان همراهی می‌کنیم"
            )}
          </p>

          <p className="mt-4 text-gray-600 text-sm sm:text-md md:text-md max-w-md md:max-w-lg mx-auto md:mx-0 italic">
            {isLoading ? (
              <Skeleton width={250} />
            ) : (
              "«مغز را تیون کن، درست یاد بگیر و توانمند شو.»"
            )}
          </p>

          <div className="mt-8 flex justify-center md:justify-start gap-4 rtl:space-x-reverse flex-wrap">
            {isLoading ? (
              <>
                <Skeleton width={140} height={40} />
                <Skeleton width={140} height={40} />
              </>
            ) : (
              <Link
                href="/consultation"
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
              >
                مشاوره رایگان
              </Link>
            )}
          </div>
        </div>

        {/* تصویر */}
        <div className="flex-1 flex justify-center md:justify-end">
          {isLoading ? (
            <Skeleton
              width={300}
              height={300}
              className="rounded-3xl sm:w-400 sm:h-400 md:w-500 md:h-500"
            />
          ) : (
            <img
              src="/landing.svg"
              alt="دکتر موسوی مدرس"
              className="rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500 w-64 sm:w-80 md:w-96"
            />
          )}
        </div>
      </div>
    </section>
  );
}
