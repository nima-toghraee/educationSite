"use client";

import Link from "next/link";

interface DropdownMenuProps {
  subItems: { label: string; href: string }[];
  onSelect?: () => void;
  position?: "left" | "right";
}

export default function DropdownMenu({
  subItems,
  onSelect,
  position = "left",
}: DropdownMenuProps) {
  return (
    <ul
      className={`absolute ${position}-0 w-40 bg-white rounded-lg shadow-lg mt-2 z-50 border py-2 space-y-2`}
    >
      {subItems.map((sub, i) => (
        <li key={i}>
          <Link
            href={sub.href}
            className="block px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-700 transition"
            onClick={onSelect}
          >
            {sub.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
