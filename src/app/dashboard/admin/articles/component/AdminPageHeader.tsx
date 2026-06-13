"use client";

import { useRouter } from "next/navigation";

type Props = {
  title: string;
  buttonText?: string;
  buttonHref?: string;
  onClick?: () => void;
};

export default function AdminPageHeader({
  title,
  buttonText = "+ جدید",
  buttonHref,
  onClick,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    if (buttonHref) return router.push(buttonHref);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

      {/* ACTION */}
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm"
      >
        {buttonText}
      </button>
    </div>
  );
}
