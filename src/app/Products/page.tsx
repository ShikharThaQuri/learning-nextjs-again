import Navbar from "@/components/Navbar";
import { SearchBar } from "./SearchBar";
import { getProductsUsingSearchQuery } from "@/services/admin/product";
import Image from "next/image";
import { ProductType } from "@/models/Product";

import firstImage from "@/images/manga edits.jpeg";
import { Suspense } from "react";
import { Pagination } from "./pagination";

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    productName?: string;
    page?: string;
  }>;
}) {
  const searchParam = await searchParams;

  const productName = searchParam?.productName || "";
  const page = Number(searchParam?.page) || 1;

  const result = await getProductsUsingSearchQuery(productName, page, 3);

  return (
    <div className="bg-gray-100 min-h-screen text-black pb-10">
      <Navbar />
      <SearchBar />
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100 text-black px-[120px] pb-10">
        <Suspense fallback={<div>Loading...</div>}>
          {result?.data.map((items: ProductType, i: number) => (
            <div key={i} className="max-w-xl bg-white rounded-lg shadow-md">
              <Image
                src={firstImage}
                alt={"firstImage"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{items.productName}</h2>
                <p className="text-gray-600 mt-2">{items.dis}</p>
              </div>
            </div>
          ))}
        </Suspense>
      </section>
      <Pagination data={result} />
    </div>
  );
}
