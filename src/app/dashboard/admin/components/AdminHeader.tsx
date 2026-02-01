"use client";

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="font-semibold">پنل مدیریت</div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin</span>
        <button className="text-sm text-red-600 hover:underline">خروج</button>
      </div>
    </header>
  );
}
