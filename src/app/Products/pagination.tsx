"use client";

import { ProductType } from "@/models/Product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const leftRightBox =
  "mx-[1rem] border border-[0.15rem] px-[0.9rem] py-[0.5rem] font-bold  cursor-pointer";

type dataType = {
  success: boolean;
  data: ProductType[];
  totalProducts: number;
  productShown: number;
};

export function Pagination({ data }: { data: dataType }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalItems = data.totalProducts;
  const totalPage = Math.ceil(totalItems / 3);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params}`;
  };

  const leftClickFunction = () => {
    let currnPage = currentPage;

    if (currentPage > 1) {
      currnPage = currentPage - 1;
    }

    const path = createPageURL(currnPage);

    replace(path);
  };

  const rightClickFunction = () => {
    let currnPage = currentPage;

    if (currentPage < totalPage) {
      currnPage = currentPage + 1;
    }

    const path = createPageURL(currnPage);

    replace(path);
  };

  return (
    <div className="flex justify-center mt-[1.5rem]">
      {currentPage <= 1 ? (
        <p className={`${leftRightBox} border-[#d6ccc2] text-[#d6ccc2]`}>
          Left
        </p>
      ) : (
        <p
          className={`${leftRightBox} border-[#2f3e46]`}
          onClick={leftClickFunction}
        >
          Left
        </p>
      )}

      {currentPage >= totalPage ? (
        <p className={`${leftRightBox} border-[#d6ccc2] text-[#d6ccc2]`}>
          Right
        </p>
      ) : (
        <p
          className={`${leftRightBox} border-[#2f3e46]`}
          onClick={rightClickFunction}
        >
          Right
        </p>
      )}
    </div>
  );
}
