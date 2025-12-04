"use client";

import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface RegisterFormState {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<RegisterFormState>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("رمز عبور و تکرار آن یکسان نیست");
      return;
    }

    try {
      const res = await registerUser({
        email: form.email,
        password: form.password,
      });

      setAuth(res.user, res.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("خطا در ثبت‌نام");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-teal-100">
      <div
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-right"
        dir="rtl"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ثبت‌نام
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
          <Input
            placeholder="تکرار رمز عبور"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <Button text="ثبت‌نام" type="submit" />
        </form>
        <p className="text-center text-gray-500 mt-4">
          حساب کاربری دارید؟{" "}
          <Link href="/auth/login" className="text-green-500 hover:underline">
            ورود
          </Link>
        </p>
      </div>
    </div>
  );
};
