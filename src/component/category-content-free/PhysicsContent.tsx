"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ContentProps {
  categorySlug: string; // این همان 'physics' است
}

// لیست‌های ثابت برای فیلترها (می‌تواند شبیه ریاضی باشد)
const grade = ["دهم", "یازدهم", "دوازدهم"];
const fields = ["ریاضی", "تجربی"];

export default function PhysicsContentFree({ categorySlug }: ContentProps) {
  const router = useRouter();
  const [selectedBase, setSelectedBase] = useState<string>("");
  const [selectedField, setSelectedField] = useState<string>("");

  // تابع هندل کردن کلیک دکمه "ادامه"
  const handleContinue = () => {
    if (selectedBase && selectedField) {
      // تبدیل مقادیر انتخابی به اسلاگ
      const baseSlug = selectedBase.replace(/\s+/g, "-");
      const fieldSlug = selectedField.replace(/\s+/g, "-");

      // ساختار URL فیلتر شده: /courses/physics/filter?base=slug-base&field=slug-field
      const newPath = `/free-courses/${categorySlug}/filter?base=${baseSlug}&field=${fieldSlug}`;

      // هدایت کاربر به صفحه جدید دوره های فیلتر شده
      router.push(newPath);
    } else {
      alert("لطفا هم پایه و هم رشته تحصیلی را انتخاب کنید.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-orange-600 text-center">
        دوره‌های فیزیک
      </h1>

      <p className="text-gray-700 leading-relaxed mb-8 text-justify border-b pb-4">
        این بخش شامل دوره‌های فیزیک است. لطفا فیلترهای زیر را انتخاب کنید.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-xl border border-orange-200">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          انتخاب فیلتر دوره‌ها
        </h2>

        {/* فیلتر پایه تحصیلی */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            پایه تحصیلی:
          </label>
          <select
            value={selectedBase}
            onChange={(e) => setSelectedBase(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
          >
            <option value="" disabled>
              انتخاب کنید
            </option>
            {grade.map((base) => (
              <option key={base} value={base}>
                {base}
              </option>
            ))}
          </select>
        </div>

        {/* فیلتر رشته تحصیلی */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            رشته تحصیلی:
          </label>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition duration-150"
          >
            <option value="" disabled>
              انتخاب کنید
            </option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        {/* دکمه ادامه */}
        <button
          onClick={handleContinue}
          disabled={!selectedBase || !selectedField}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 ${
            selectedBase && selectedField
              ? "bg-orange-600 hover:bg-orange-700 shadow-md"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          ادامه
        </button>
      </div>
    </div>
  );
}
