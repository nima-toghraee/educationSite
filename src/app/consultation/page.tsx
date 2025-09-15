"use client";

import { useState } from "react";

export default function Consultation() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-20 min-h-[70vh] flex items-center justify-center">
      <form className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          شروع مسیر موفقیت همین الان!
        </h2>

        <label className="block mb-6">
          <span className="text-gray-900 text-lg font-semibold">نام</span>
          <input
            type="text"
            placeholder="نام خود را وارد کنید"
            className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-300 p-3"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-900 text-lg font-semibold">
            پایه تحصیلی
          </span>
          <select
            className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-300 p-3"
            required
          >
            <option value="">انتخاب کنید</option>
            <option value="9">نهم</option>
            <option value="10">دهم</option>
            <option value="11">یازدهم</option>
            <option value="12">دوازدهم</option>
          </select>
        </label>

        <label className="block mb-6">
          <span className="text-gray-900 text-lg font-semibold">
            شماره تماس
          </span>
          <input
            type="tel"
            placeholder="09xx xxx xxxx"
            className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-300 p-3"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-900 text-lg font-semibold">ایمیل</span>
          <input
            type="email"
            placeholder="email@example.com"
            className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-300 p-3"
          />
        </label>

        <label className="block mb-8">
          <span className="text-gray-900 text-lg font-semibold">توضیحات</span>
          <textarea
            rows={4}
            placeholder="هر سوال یا توضیحی داری اینجا بنویس..."
            className="mt-2 block w-full rounded-xl border-gray-300 shadow-sm focus:border-green-600 focus:ring focus:ring-green-300 p-3"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
        >
          🚀 ارسال درخواست
        </button>
      </form>
    </section>
  );
}
