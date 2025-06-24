import firstImage from "@/images/manga edits.jpeg";
import Image from "next/image";

export default function Loading() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100 text-black px-[120px] pb-10">
      <div className="max-w-xl bg-white rounded-lg shadow-md">
        <Image
          src={firstImage}
          alt={"firstImage"}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">loading...</h2>
          <p className="text-gray-600 mt-2">loading...</p>
        </div>
      </div>
    </section>
  );
}
