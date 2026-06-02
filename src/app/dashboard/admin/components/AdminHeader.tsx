"use client";

import { Smile, LogOut, Search } from "lucide-react"; // اضافه کردن آیکون جستجو

const mockAdminName = "محمد عزیز"; // تغییر نام برای عمومیت بیشتر

export default function AdminHeader() {
  return (
    <>
      {/* هدر اصلی */}
      <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 border-b border-slate-200">
        {/* بخش سمت چپ: عنوان پنل و آیکون */}
        <div className="flex items-center gap-3">
          <Smile className="w-7 h-7 text-blue-500" />
          <h1 className="text-xl font-extrabold text-blue-800 tracking-tight">
            پنل ادمین
          </h1>
        </div>

        {/* بخش سمت راست: اطلاعات ادمین و خروج */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-800 font-semibold">
              {mockAdminName}
            </span>
          </div>
          <button className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-bold px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors duration-200 shadow-sm">
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>
      </header>

      {/* بخش پیام خوش‌آمدگویی (تغییر یافته) */}
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
        <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row-reverse items-center justify-between">
          {" "}
          <div className="flex items-center gap-3 bg-blue-100 px-4 py-2 rounded-lg shadow-sm mb-3 md:mb-0">
            {" "}
            {/* اضافه کردن mb-3 md:mb-0 برای فاصله در موبایل */}
            <Smile className="w-6 h-6 text-blue-600" />
            <span className="text-blue-800 font-semibold text-sm">
              امروز چطور می‌توانیم کمکتان کنیم؟
            </span>
          </div>
          {/* تغییر: md:flex-row-reverse */}
          <div className="text-center md:text-right mb-3 md:mb-0">
            {" "}
            {/* تغییر: md:text-right */}
            <h2 className="text-2xl font-extrabold text-blue-800 tracking-tight">
              به پنل مدیریت خوش آمدید!
            </h2>
            <p className="text-md text-slate-600 mt-1">
              ابزارهای لازم برای مدیریت محتوا در دسترس شماست.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
