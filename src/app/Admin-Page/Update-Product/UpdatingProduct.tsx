"use client";

import { updateProduct } from "@/services/admin/product";
import { useActionState, useEffect, useState } from "react";

const inputStyle =
  "w-full px-3 py-2 mb-[1rem] border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500";

const labelStyle = "block text-sm font-medium text-gray-700 mb-2";

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
    setMsg(data?.msg);

    setTimeout(() => {
      setMsg("");
    }, 5000);
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

        <div className="flex flex-col w-full text-left ">
          <label className={`${labelStyle}`} htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            required
            placeholder="Enter Product Price"
            className={`${inputStyle}`}
          />
        </div>

        <div className="mb-[3rem] tablet:flex tablet:flex-col tablet:gap-y-[2rem] tablet:items-center">
          <label className={`${labelStyle}`} htmlFor="price">
            Upload File
          </label>
          <input
            type="file"
            name="file"
            id="uploadImg"
            accept="image/*"
            required
            className={`border border-gray-300 rounded w-full
              file:px-3 file:py-2 file:text-[1rem] file:mr-[1rem] file:bg-[#d4a373] file:text-xs file:text-black
              hover:file:cursor-pointer`}
          />
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          onClick={() => (isPending ? "" : setMsg("Waitig..."))}
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
