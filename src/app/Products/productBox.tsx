import { getProductsUsingSearchQuery } from "@/services/admin/product";
import Image from "next/image";
import { ProductType } from "@/models/Product";

import firstImage from "@/images/manga edits.jpeg";

export async function ProductBox({
  productName,
  page,
}: {
  productName: string;
  page: number;
}) {
  const result = await getProductsUsingSearchQuery(productName, page, 3);

  return (
    <>
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
    </>
  );
}
