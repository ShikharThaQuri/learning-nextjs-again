import Image from "next/image";
import { ProductType } from "@/models/Product";

import firstImage from "@/images/manga edits.jpeg";

type dataType = {
  success: boolean;
  data: ProductType[];
  totalProducts: number;
  productShown: number;
};

export async function ProductBox({ data }: { data: dataType }) {
  const result = data;
  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 bg-transparant text-black">
      {result?.data?.map((items: ProductType, i: number) => (
        <div
          key={i}
          className="max-w-xs bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={items.image_Url || firstImage}
            alt={"firstImage"}
            width={500}
            height={500}
            className="w-full h-38 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{items.productName}</h2>
            <p className="text-gray-600 mt-2">{items.dis}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
