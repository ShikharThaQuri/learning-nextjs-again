"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function HomePageSearchBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [value, setValue] = useState<string>("");

  const hendelSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("productName", term);
    } else {
      params.delete("productName");
    }
    replace(`/Products?${params}`);
  }, 100);

  return (
    <div className="flex w-full items-center justify-center my-10 z-10">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className=" w-[50%] bg-white px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={() => hendelSearch(value)}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>
  );
}
