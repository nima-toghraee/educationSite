"use client";

import { usePathname } from "next/navigation";
import MainMenu from "./navbar/MainMenu";
import Footer from "./Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard =
    pathname?.startsWith("/dashboard/admin") ||
    pathname?.startsWith("/dashboard/user");

  return (
    <>
      {!isDashboard && <MainMenu />}

      {children}

      {!isDashboard && <Footer />}
    </>
  );
}
