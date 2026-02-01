"use client";

import { ReactNode, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for desktop */}
        <Sidebar className="hidden md:flex md:flex-col w-64 flex-shrink-0 bg-white border-r" />

        {/* Mobile sidebar drawer */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 max-w-[80vw] bg-white border-rtransform transition-transform duration-300 md:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Overlay when mobile sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden bg-black/30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-auto">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-4 sm:p-6 bg-gray-50 flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
