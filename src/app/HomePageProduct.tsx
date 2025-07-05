import { ProductBox } from "@/components/productBox";
import { getProductsUsingSearchQuery } from "@/services/admin/product";

export default async function HomeProducts() {
  const result = await getProductsUsingSearchQuery("Product", 1, 5);

  return (
    <>
      <ProductBox data={result} />
    </>
  );
}
