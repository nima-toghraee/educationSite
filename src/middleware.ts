import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const response = await fetch(
      "http://localhost:5000/auth/admin/check",
      {
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.redirect(
        new URL("/auth/login", req.url)
      );
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(
      new URL("/auth/login", req.url)
    );
  }
}

export const config = {
  matcher: ["/dashboard/admin/:path*"],
};