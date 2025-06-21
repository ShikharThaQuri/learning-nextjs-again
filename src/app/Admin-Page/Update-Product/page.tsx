"use client";

import { getProductById } from "@/services/admin/product";
import { useActionState, useEffect, useState } from "react";

export default function UpdataProductPage() {
  const [data, action, isPending] = useActionState(getProductById, undefined);

  const [msg, setMsg] = useState<string>();

  useEffect(() => {
    setMsg(data?.msg);

    setTimeout(() => {
      setMsg("");
    }, 5000);
  }, [data]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>
        <form action={action}>
          <div className="mb-4">
            <label
              htmlFor="productId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Product ID
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter Product ID"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Update Product
          </button>

          <div className="text-right  w-full mt-[0.4rem]">
            <h1
              className={`${data?.success ? "text-blue-700" : "text-red-700"} `}
            >
              {msg}
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}
