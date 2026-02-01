"use client";

import React from "react";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* About Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-white">درباره ما</h3>
            <p className="text-sm leading-relaxed">
              ما تیمی متعهد به ارتقاء یادگیری عمیق و توانمندسازی نوجوانان هستیم.
              با آموزش‌های تخصصی، راهنمایی‌های کاربردی و مشاوره حرفه‌ای، مسیر
              موفقیت و رشد فردی را به شما نشان می‌دهیم.
            </p>
          </div>

          {/* Contact & Social Media */}
          <div className="flex flex-col mt-6 md:mt-0">
            <h3 className="text-xl font-bold mb-4 text-white">تماس با ما</h3>
            <p className="text-sm mb-4 leading-relaxed">
              آدرس: تبریز <br />
              تلفن: 09029994349 <br />
              ایمیل: mousavi.physics@yahoo.com
            </p>

            <div className="flex space-x-4 rtl:space-x-reverse mt-2">
              <a
                href="https://t.me/course_of_physics899496"
                aria-label="Telegram"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegramPlane size={20} />
              </a>
              <a
                href="https://instagram.com/username"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Placeholder برای لینک‌های سریع (اگر فعال شود) */}
          {/* <div className="flex flex-col mt-6 md:mt-0">
            <h3 className="text-xl font-bold mb-4 text-white">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-white transition-colors">
                  فیلم‌های آموزشی
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">
                  مقالات
                </Link>
              </li>
              <li>
                <Link href="/aboutPage" className="hover:text-white transition-colors">
                  درباره ما
                </Link>
              </li>
            </ul>
          </div> */}

          {/* می‌توانید ستون چهارم را برای هر محتوای اضافی پر کنید */}
          <div className="flex flex-col mt-6 md:mt-0">
            {/* خالی یا هر محتوا */}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} فروشگاه شما. تمامی حقوق محفوظ است.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-2 sm:gap-4">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              سیاست حریم خصوصی
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              قوانین و شرایط
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
