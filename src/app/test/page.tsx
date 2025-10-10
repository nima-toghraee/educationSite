"use client";

import { useEffect } from "react";
import api from "@/lib/api";

export default function TestPage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/courses");
        console.log("✅ داده‌ها:", res.data);
      } catch (error) {
        console.error("❌ خطا در اتصال به بک:", error);
      }
    };
    fetchData();
  }, []);

  return <div className="p-4">در حال تست اتصال به بک‌اند...</div>;
}
