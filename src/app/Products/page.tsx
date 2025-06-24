import Navbar from "@/components/Navbar";
import Loading from "./Loading";
import { SearchBar } from "./SearchBar";

import { Suspense } from "react";
import { Pagination } from "./pagination";
import { ProductBox } from "./productBox";
import { getProductsUsingSearchQuery } from "@/services/admin/product";

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
        <Suspense fallback={<Loading />}>
          <ProductBox productName={productName} page={page} />
        </Suspense>
      </section>
      <Pagination data={result} />
    </div>
  );
}
