import { getProducts } from "@/services/admin/product";
import type { ProductType } from "@/models/Product";

export const revalidate = 5; // Revalidate every 60 seconds

export default async function ProductsBox() {
  const result = await getProducts();

  return (
    <>
      {result?.data?.map((items: ProductType, i: number) => (
        <div
          key={i}
          className="bg-white rounded shadow-md p-4 mb-5 flex justify-between w-[50%] items-center"
        >
          <h2>{items.productName}</h2>
          <p>{items._id}</p>
        </div>
      ))}
    </>
  );
}
