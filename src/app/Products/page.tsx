import Navbar from "@/components/Navbar";
import Loading from "../Loading";
import { SearchBar } from "./SearchBar";

import { Suspense } from "react";
import { Pagination } from "./pagination";
import { ProductBox } from "../../components/productBox";
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

  const result = await getProductsUsingSearchQuery(productName, page, 5);

  return (
    <div className="bg-gray-100 min-h-screen text-black pb-10">
      <Navbar />
      <SearchBar />

      <div className="px-[120px]">
        <Suspense fallback={<Loading />}>
          <ProductBox data={result} />
        </Suspense>
      </div>

      <Pagination data={result} />
    </div>
  );
}
