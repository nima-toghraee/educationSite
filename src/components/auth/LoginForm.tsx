"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation"; // برای هدایت به داشبورد

export const LoginForm = () => {
  const { setAuth } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(form);

      if (!res.user) {
        setError("مشکل در پاسخ سرور");
        return;
      }

      setAuth(res.user, res.token);
      if (res.user.role_id === 1) {
        router.push("/dashboard/admin"); // ادمین
      } else {
        router.push("/dashboard/user"); // کاربر معمولی
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("خطا در ورود");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-teal-100">
      <div
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-right"
        dir="rtl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ورود
        </h2>
        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="ایمیل"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            placeholder="رمز عبور"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <Button text="ورود" type="submit" />
        </form>
        <p className="text-center text-gray-500 mt-4">
          حساب کاربری ندارید؟{" "}
          <a href="/auth/register" className="text-green-500 hover:underline">
            ثبت‌نام
          </a>
        </p>
      </div>
    </div>
  );
};
