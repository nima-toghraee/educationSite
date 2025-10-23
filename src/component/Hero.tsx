"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(true);

  // شبیه‌سازی لودینگ دیتا به مدت 2 ثانیه
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 20);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto max-w-screen-xl px-6 flex flex-col md:flex-row items-center">
        <div className="flex-1 text-center md:text-right">
          <h3 className="text-5xl md:text-6xl font-semibold text-gray-900 leading-tight">
            {isLoading ? (
              <Skeleton width={400} height={60} />
            ) : (
              "مسیر یادگیری با دکتر موسوی"
            )}
          </h3>
          <p className="mt-6 text-gray-700 md:text-lg max-w-lg mx-auto md:mx-0">
            {isLoading ? (
              <Skeleton count={3} />
            ) : (
              "ما نوجوانان را در مسیر تقویت ذهن، مدیریت استرس و رسیدن به اهدافشان همراهی می‌کنیم"
            )}
          </p>
          <p className="mt-4 text-gray-600 md:text-md max-w-lg mx-auto md:mx-0 italic">
            {isLoading ? (
              <Skeleton width={300} />
            ) : (
              "«مغز را تیون کن، درست یاد بگیر و توانمند شو.»"
            )}
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4 rtl:space-x-reverse">
            {isLoading ? (
              <>
                <Skeleton width={140} height={40} />
                <Skeleton width={140} height={40} />
              </>
            ) : (
              <>
                <Link
                  href="/consultation"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-md hover:shadow-xl transition"
                >
                  مشاوره رایگان
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          {isLoading ? (
            <Skeleton width={500} height={500} className="rounded-3xl" />
          ) : (
            <img
              src="/landing.svg"
              alt="دکتر موسوی مدرس"
              width={500}
              height={500}
              className="rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-115"
            />
          )}
        </div>
      </div>
    </section>
  );
}
