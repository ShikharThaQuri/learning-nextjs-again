import firstImage from "@/images/manga edits.jpeg";
import Image from "next/image";

export default function Loading() {
  return (
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
  );
}
