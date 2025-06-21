"use client";

import { updateProduct } from "@/services/admin/product";
import { useActionState, useEffect, useState } from "react";

export default function UpdateProduct({
  id,
  productName,
}: {
  id: string;
  productName: string;
}) {
  const [data, result, isPending] = useActionState(updateProduct, undefined);
  const [msg, setMsg] = useState<string>();

  useEffect(() => {
    data?.success
      ? (setMsg(data?.msg),
        setTimeout(() => {
          setMsg("");
          window.location.reload();
        }, 5000))
      : (setMsg(data?.msg),
        setTimeout(() => {
          setMsg("");
        }, 7000));
  }, [data]);

  return (
    <div className="bg-white p-8 rounded shadow-md w-150 mb-20">
      <h1 className="text-2xl font-bold text-center mt-4 mb-8">
        Current Product Name : {productName || "N/A"}
      </h1>

      <form action={result}>
        <input type="text" defaultValue={id} hidden id="Id" name="Id" />

        <div className="mb-4">
          <label
            htmlFor="productId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            required
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter Updated Product Name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discricption"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Discirption
          </label>
          <input
            type="text"
            id="dis"
            name="dis"
            required
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter Updated Discricption"
          />
        </div>
        <button
          disabled={isPending}
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
  );
}
