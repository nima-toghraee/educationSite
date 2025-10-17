"use client";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto">
        <DesktopMenu />
        <MobileMenu />
      </div>
    </nav>
  );
}
