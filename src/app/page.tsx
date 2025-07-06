import Navbar from "@/components/Navbar";

import HeroImage from "@/images/bg-image.jpeg";
import Image from "next/image";
import { HomePageSearchBar } from "./HomePageSearchBar";
import { Suspense } from "react";
import Loading from "./Loading";
import { ProductBox } from "@/components/productBox";
import { getProductsUsingSearchQuery } from "@/services/admin/product";

export default async function Home() {
  return (
    <div className="bg-gray-100 pb-[2rem] text-black">
      <Navbar />

      <main
        className={`relative flex flex-col items-center justify-center h-[70vh] bg-gradient-to-t from-yellow-900 to-transparent`}
      >
        <Image
          src={HeroImage}
          alt="Mirko"
          className="absolute w-full h-full object-cover opacity-80"
        ></Image>
        <Suspense fallback={<div>Loading....</div>}>
          <HomePageSearchBar />
        </Suspense>
      </main>

      <section className="py-[2rem]">
        <h1 className="text-3xl font-bold text-center mb-6">Products</h1>
        <div className="mx-[100px] px-[20px] py-[2rem] bg-[#e9edc9] rounded-lg shadow-md">
          <Suspense fallback={<Loading />}>
            <HomeProducts />
          </Suspense>
        </div>
      </section>

      <section className="py-[2rem] text-center">
        <h1>Hello World</h1>
      </section>
    </div>
  );
}

async function HomeProducts() {
  const result = await getProductsUsingSearchQuery("Product", 1, 5);

  return (
    <>
      <ProductBox data={result} />
    </>
  );
}
