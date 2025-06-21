"use client";

import { deleteProduct } from "@/services/admin/product";
import { useActionState, useEffect, useState } from "react";

export default function DeleteProductPage() {
  const [data, action, isPending] = useActionState(deleteProduct, undefined);

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
        <h2 className="text-2xl font-bold mb-6 text-center">Delete Product</h2>
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
            disabled={isPending}
            name="deleteProduct"
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
          >
            Delete Product
          </button>

          <div className="text-right  w-full mt-[0.4rem]">
            <h1
              className={`${data?.success ? "text-red-700" : "text-blue-700"} `}
            >
              {msg}
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}
