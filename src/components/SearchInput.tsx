"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  // Debounce the search term to avoid immediate API calls on every keystroke
  useEffect(() => {
    // Only update the URL if the search term is not empty
    if (searchTerm !== "") {
      const timer = setTimeout(() => {
        // Create a new URLSearchParams object to safely update the URL
        const params = new URLSearchParams(searchParams.toString());
        params.set("q", searchTerm);
        router.replace(`/products?${params.toString()}`);
      }, 300); // Wait for 300ms after the user stops typing

      // Cleanup the timer on component unmount or when searchTerm changes
      return () => clearTimeout(timer);
    }
  }, [searchTerm, router, searchParams]);

  return (
    <div className="flex-1 max-w-xl mx-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="جستجو آموزش..."
          className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FiSearch size={20} />
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
