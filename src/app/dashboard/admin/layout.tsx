import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminBreadcrumb from "./components/AdminBreadcrumb";

type Props = {
  children: React.ReactNode;
};

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export default function AdminLayout({ children }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  // اگر کوکی وجود نداشت → redirect به login
  if (!token) {
    redirect("/auth/login");
  }

  let user: { id: number; role_id: number } | null = null;

  try {
    // بررسی JWT و گرفتن payload
    user = jwt.verify(token, JWT_SECRET) as { id: number; role_id: number };
  } catch (err) {
    console.error("Invalid token:", err);
    redirect("/auth/login");
  }

  // بررسی نقش ادمین
  if (!user || user.role_id !== 1) {
    redirect("/"); // کاربر معمولی → ریدایرکت به صفحه اصلی
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <AdminHeader />

        <main className="p-6">
          <AdminBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
