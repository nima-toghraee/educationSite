"use client";

import { useEffect, useState } from "react";
import { Smile, LogOut } from "lucide-react";

type AdminUser = {
  id: number;
  name: string;
  email?: string;
};

export default function AdminHeader() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      console.log("🟡 [ME] Requesting user info...");

      const res = await fetch("http://localhost:5000/auth/me", {
        credentials: "include",
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("❌ [ME] Response is not JSON");
        return;
      }

      setAdmin(data.user);
    } catch (err) {
      console.error("❌ [ME] Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/";
  };

  return (
    <>
      <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Smile className="w-7 h-7 text-blue-500" />
          <h1 className="text-xl font-extrabold text-blue-800">پنل ادمین</h1>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-sm font-semibold text-slate-800">
            {loading ? "..." : admin?.name || "ادمیییین"}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-bold px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition"
          >
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>
      </header>

      <div className="bg-blue-50 px-6 py-4 border-b border-blue-200">
        <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="flex items-center gap-3 bg-blue-100 px-4 py-2 rounded-lg">
            <Smile className="w-6 h-6 text-blue-600" />
            <span className="text-blue-800 font-semibold text-sm">
              امروز چطور می‌توانیم کمکتان کنیم؟
            </span>
          </div>

          <div className="text-center md:text-right">
            <h2 className="text-2xl font-extrabold text-blue-800">
              به پنل مدیریت خوش آمدید!
            </h2>
            <p className="text-md text-slate-600 mt-1">
              ابزارهای مدیریت در دسترس شماست.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
