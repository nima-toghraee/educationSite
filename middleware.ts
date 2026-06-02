import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard/admin");

  // 🔥 اگر وارد پنل ادمین شدی ولی توکن نداری
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}