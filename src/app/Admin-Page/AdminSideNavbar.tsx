"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSideNavbar() {
  const pathname = usePathname();

  return (
    <div className="absolute top-0 bottom-0 left-0 bg-gray-800 text-white w-64 h-screen px-4 pt-10">
      <h2 className="text-xl mb-10">Admin Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="block px-4 py-2 hover:bg-gray-700">
            HOME
          </Link>
        </li>
        <li>
          <Link
            href="/Admin-Page"
            className={`${
              pathname === "/Admin-Page" ? "bg-gray-700" : ""
            } block px-4 py-2 hover:bg-gray-700`}
          >
            Admin Home
          </Link>
        </li>
        <li>
          <Link
            href="/Admin-Page/Add-Product"
            className={`${
              pathname === "/Admin-Page/Add-Product" ? "bg-gray-700" : ""
            } block px-4 py-2 hover:bg-gray-700`}
          >
            Add Product
          </Link>
        </li>
        <li>
          <Link
            href="/Admin-Page/Delete-Product"
            className={`${
              pathname === "/Admin-Page/Delete-Product" ? "bg-gray-700" : ""
            } block px-4 py-2 hover:bg-gray-700`}
          >
            Delete Product
          </Link>
        </li>
        <li>
          <Link
            href="/Admin-Page/Update-Product"
            className={`${
              pathname === "/Admin-Page/Update-Product" ? "bg-gray-700" : ""
            } block px-4 py-2 hover:bg-gray-700`}
          >
            Update Product
          </Link>
        </li>
      </ul>
    </div>
  );
}
