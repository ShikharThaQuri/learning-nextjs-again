"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const hendelSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("productName", term);
    } else {
      params.delete("productName");
    }

    replace(`${pathname}?${params}`);
  }, 100);

  return (
    <div className="flex items-center justify-center my-10 z-10">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => hendelSearch(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
