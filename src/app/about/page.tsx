"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* بخش تصویر */}
        <div className="relative h-80 md:h-auto">
          <Image
            src="/images/about-me.jpg"
            alt="عکس دکتر خلیل موسوی"
            fill
            className="object-cover"
          />
        </div>

        {/* بخش متن */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            دکتر خلیل موسوی و تیم Mind Tuning Academy
          </h1>
          <p className="text-xl font-semibold text-gray-800 mb-6">
            از آموزش فیزیک تا پرورش ذهن و ساختن نسل خلاق آینده
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            من،{" "}
            <span className="font-semibold text-green-700">
              دکتر خلیل موسوی
            </span>{" "}
            هستم؛ دکتری فیزیک هسته‌ای، مدرس دانشگاه و دبیرستان، عضو بنیاد ملی
            نخبگان و کوچ حرفه‌ای مورد تأیید ICF کانادا. سال‌هاست در مسیر آموزش
            به دانش‌آموزان و دانشجویان فعالیت می‌کنم و در این مسیر، به یک حقیقت
            مهم رسیدم: مشکل بیشتر بچه‌ها <em>یاد نگرفتن درس‌ها نیست</em>، بلکه
            نداشتن روش درست یادگیری، تمرکز، برنامه‌ریزی و مدیریت ذهن است.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            برای همین تصمیم گرفتم علاوه بر آموزش فیزیک، وارد دنیای توانمندسازی
            ذهن و کوچینگ شوم؛ جایی که نوجوانان یاد می‌گیرند چطور ذهن خود را
            مدیریت کنند، احساساتشان را بشناسند، استرس را کنترل کنند و یادگیری را
            به یک مهارت لذت‌بخش تبدیل کنند.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            اما این مسیر، فقط به من ختم نمی‌شود. در کنار من، تیمی از مدرسین
            متخصص و کوچ‌های آموزشی فعالیت می‌کنند تا دروس مختلفی مثل فیزیک،
            ریاضی، کدنویسی و مهارت‌های نوین یادگیری را با شیوه‌ای علمی و جذاب
            آموزش دهند. هدف ما ساختن بستری است که در آن یادگیری صرفاً حفظ فرمول
            و نکته نباشد — بلکه تجربه‌ای باشد برای رشد، تفکر، و شکوفایی
            استعدادهای ذهنی.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🎯 مأموریت ما در Mind Tuning Academy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ترکیب آموزش علمی با رشد ذهنی، تا دانش‌آموزان بتوانند:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
            <li>با آرامش یاد بگیرند</li>
            <li>با تمرکز پیشرفت کنند</li>
            <li>با اعتماد‌به‌نفس، مسیر آینده‌شان را بسازند</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-6">
            ما اینجا هستیم تا نسل جدید را برای دنیایی آماده کنیم که یادگیری،
            تفکر و خلاقیت کلید موفقیت در آن است.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Link
              href="/consultation"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              🎯 رزرو جلسه رایگان کوچینگ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
