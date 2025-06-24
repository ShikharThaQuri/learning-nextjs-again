import { Suspense } from "react";
import ProductsBox from "./ProductsBox";
import Loading from "./Loading";

export default async function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-center mb-[2rem] font-bold text-xl">Products</h1>

      <Suspense fallback={<Loading />}>
        <ProductsBox />
      </Suspense>
    </div>
  );
}
