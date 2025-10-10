"use client";

import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  const [error, setError] = useState(null);

  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">درباره ما</h3>
            <p className="text-sm">
              ما تیمی متعهد به ارتقاء یادگیری عمیق و توانمندسازی نوجوانان هستیم.
              با آموزش‌های تخصصی، راهنمایی‌های کاربردی و مشاوره حرفه‌ای، مسیر
              موفقیت و رشد فردی را به شما نشان می‌دهیم.{" "}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="hover:text-white transition-colors"
                >
                  فیلم های آموزشی
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-white transition-colors"
                >
                  مقالات
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutPage"
                  className="hover:text-white transition-colors"
                >
                  درباره من
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">تماس با ما</h3>
            <p className="text-sm mb-4">
              آدرس: تهران، خیابان ولیعصر
              <br />
              تلفن: 09029994349
              <br />
              ایمیل: mousavi.physics@yahoo.com
            </p>

            <div className="flex space-x-4">
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
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} فروشگاه شما. تمامی حقوق محفوظ است.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
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
