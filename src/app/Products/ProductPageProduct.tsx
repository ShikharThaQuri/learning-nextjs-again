import { Pagination } from "./pagination";
import { ProductBox } from "../../components/productBox";
import { getProductsUsingSearchQuery } from "@/services/admin/product";

export default async function Products({
  productName,
  page,
}: {
  productName: string;
  page: number;
}) {
  const result = await getProductsUsingSearchQuery(productName, page, 5);

  return (
    <>
      <ProductBox data={result} />

      <Pagination data={result} />
    </>
  );
}
