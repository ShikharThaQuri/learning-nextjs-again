import Navbar from "@/components/Navbar";
import { SearchBar } from "./SearchBar";
import { getProducts } from "@/services/admin/product";
import { ProductType } from "@/models/Product";

import firstImage from "@/images/manga edits.jpeg";
import Image from "next/image";

export default async function AllProductsPage() {
  const result = await getProducts();

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <Navbar />
      <SearchBar />
      <section className="">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100 text-black px-[120px] pb-10">
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
                {/* <p className="text-lg font-bold mt-4">${items.price}</p> */}
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}
