import Navbar from "@/components/Navbar";
import { SearchBar } from "./SearchBar";
import { Pagination } from "./pagination";
import { ProductBox } from "../../components/productBox";
import { getProductsUsingSearchQuery } from "@/services/admin/product";

import Loading from "../Loading";
import { Suspense } from "react";

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

  return (
    <div className="bg-gray-100 min-h-screen text-black pb-10">
      <Navbar />
      <SearchBar />
      <div className="px-[120px]">
        <Suspense fallback={<Loading />}>
          <Products productName={productName} page={page} />
        </Suspense>
      </div>
    </div>
  );
}

async function Products({
  productName,
  page,
}: {
  productName: string;
  page: number;
}) {
  const result = await getProductsUsingSearchQuery(productName, page, 10);

  return (
    <>
      <ProductBox data={result} />

      <Pagination data={result} />
    </>
  );
}
