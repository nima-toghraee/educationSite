"use client";

import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import React from "react";

import SearchInput from "./SearchInput";

function Header() {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/your-logo.svg"
            alt="Store Logo"
            width={120}
            height={40}
            className="hover:opacity-90 transition"
          />
        </Link>

        {/* Search bar - Replaced with the new component */}
        <SearchInput />

        {/* Navigation and Icons */}
        <div className="flex items-center gap-6 text-gray-700">
          <div className="flex items-center gap-5">
            <Link href="/profile">
              <FiUser size={22} className="hover:text-blue-600 transition" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
