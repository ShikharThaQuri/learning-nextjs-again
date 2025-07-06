import firstImage from "@/images/manga edits.jpeg";
import Image from "next/image";

export default function Loading() {
  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-6 bg-transparant">
      <div className="max-w-xs bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
        <Image
          src={firstImage}
          alt={"firstImage"}
          width={500}
          height={500}
          className="w-full h-38 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">loading...</h2>
          <p className="text-gray-600 mt-2">loading...</p>
        </div>
      </div>

      <div className="max-w-xs bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
        <Image
          src={firstImage}
          alt={"firstImage"}
          width={500}
          height={500}
          className="w-full h-38 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">loading...</h2>
          <p className="text-gray-600 mt-2">loading...</p>
        </div>
      </div>

      <div className="max-w-xs bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
        <Image
          src={firstImage}
          alt={"firstImage"}
          width={500}
          height={500}
          className="w-full h-38 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">loading...</h2>
          <p className="text-gray-600 mt-2">loading...</p>
        </div>
      </div>

      <div className="max-w-xs bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
        <Image
          src={firstImage}
          alt={"firstImage"}
          width={500}
          height={500}
          className="w-full h-38 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">loading...</h2>
          <p className="text-gray-600 mt-2">loading...</p>
        </div>
      </div>

      <div className="max-w-xs bg-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
        <Image
          src={firstImage}
          alt={"firstImage"}
          width={500}
          height={500}
          className="w-full h-38 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold">loading...</h2>
          <p className="text-gray-600 mt-2">loading...</p>
        </div>
      </div>
    </section>
  );
}
