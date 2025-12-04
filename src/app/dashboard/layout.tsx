"use client";

import { ReactNode } from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { AuthProvider } from "@/context/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-auto">
          <Navbar />
          <main className="p-6 bg-gray-50 flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
