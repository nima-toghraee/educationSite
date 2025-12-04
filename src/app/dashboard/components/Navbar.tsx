"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">داشبورد آموزشی</h1>
      <div className="flex items-center space-x-4">
        <span className="ml-4">سلام، {user?.name || "کاربر"}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          خروج
        </button>
      </div>
    </nav>
  );
};
