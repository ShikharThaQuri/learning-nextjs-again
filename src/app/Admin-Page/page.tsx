import { getProducts } from "@/services/admin/product";
import type { ProductType } from "@/models/Product";
import { Suspense } from "react";

export default async function AdminPage() {
  const result = await getProducts();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-center mb-[2rem] font-bold text-xl">Products</h1>

      <Suspense fallback={<div>Loading...</div>}>
        {result?.data?.map((items: ProductType, i: number) => (
          <div
            key={i}
            className="bg-white rounded shadow-md p-4 mb-5 flex justify-between w-[50%] items-center"
          >
            <h2>{items.productName}</h2>
            <p>{items._id}</p>
          </div>
        ))}
      </Suspense>
    </div>
  );
}
