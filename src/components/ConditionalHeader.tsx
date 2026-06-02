"use client";

import { usePathname } from "next/navigation";
import MainMenu from "./navbar/MainMenu";
import Footer from "./Footer";
import HeaderClient from "./HeaderClient";

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
      {!isDashboard && (
        <>
          <HeaderClient />
          <MainMenu />
        </>
      )}

      {children}

      {!isDashboard && <Footer />}
    </>
  );
}
