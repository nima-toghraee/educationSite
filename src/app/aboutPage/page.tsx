import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* بخش تصویر */}
        <div className="relative h-80 md:h-auto">
          <Image
            src="/images/about-me.jpg" // اینجا عکس خودت رو بذار تو public/images
            alt="عکس دکتر موسوی"
            fill
            className="object-cover"
          />
        </div>

        {/* بخش متن */}
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            درباره من
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            سلام! من <span className="font-semibold text-green-700">موسوی</span>{" "}
            هستم، دکتری فیزیک و مدرس با تجربه دانشگاه و دبیرستان، که مسیرم را
            وقف یادگیری عمیق و توانمندسازی نوجوان‌ها کرده‌ام.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            باور دارم یادگیری فقط درس خواندن نیست؛ موفقیت واقعی وقتی حاصل می‌شود
            که دانش‌آموز علاوه بر مفاهیم علمی، مهارت‌های ذهنی، برنامه‌ریزی،
            تمرکز و هدف‌گذاری را هم یاد بگیرد.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            به همین دلیل علاوه بر تدریس فیزیک، با مدرک تندخوانی و بیزینس کوچ ICF
            کانادا، دانش‌آموزان را در مسیر تقویت ذهن، مدیریت استرس، روش مطالعه و
            توانمندسازی فردی هدایت می‌کنم.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            فلسفه من ساده است:{" "}
            <span className="font-semibold text-green-700">
              مغز را تیون کن، درست یاد بگیر و توانمند شو.
            </span>
          </p>

          {/* دکمه‌ها */}
          <div className="flex gap-3 flex-wrap">
            <a
              href="/consultation"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              🎯 رزرو جلسه رایگان کوچینگ
            </a>
            <a
              href="/videos"
              className="px-6 py-3 border border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-colors"
            >
              🎥 دیدن ویدیوهای رایگان
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
