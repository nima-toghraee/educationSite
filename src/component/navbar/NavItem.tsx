"use client";

import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";

interface NavItemProps {
  item: {
    id: string;
    label: string;
    href?: string;
    sub?: { label: string; href: string }[];
  };
  isOpen: boolean;
  onToggle: (id: string) => void;
  pathname: string;
  onClose?: () => void;
}

export default function NavItem({
  item,
  isOpen,
  onToggle,
  pathname,
  onClose,
}: NavItemProps) {
  if (item.sub) {
    return (
      <li className="relative">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          className={`flex items-center gap-1 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition ${
            isOpen ? "bg-blue-600 text-white" : ""
          }`}
        >
          {item.label}
          <FiChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && <DropdownMenu subItems={item.sub} onSelect={onClose} />}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href ?? "#"}
        className={`px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition ${
          pathname === item.href ? "bg-blue-600 text-white" : ""
        }`}
        onClick={onClose}
      >
        {item.label}
      </Link>
    </li>
  );
}
