"use client";

import { useState } from "react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-extrabold text-center mb-6 text-gray-800">
          {isLogin ? "ورود به حساب کاربری" : "ثبت‌نام در سایت"}
        </h1>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="نام کامل"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="ایمیل"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="رمز عبور"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="تایید رمز عبور"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow hover:bg-indigo-700 transition duration-300"
          >
            {isLogin ? "ورود" : "ثبت‌نام"}
          </button>
        </form>

        {/* لینک تغییر حالت */}
        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "حساب کاربری ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:underline font-semibold"
          >
            {isLogin ? "ثبت‌نام کنید" : "وارد شوید"}
          </button>
        </p>
      </div>
    </main>
  );
}
