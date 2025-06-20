"use client";

import { addNewProduct } from "@/services/admin/product";
import { useActionState, useEffect, useState } from "react";

const inputStyle =
  "px-[0.5rem] py-[0.3rem] text-[1.3rem] bg-[#d4a373] text-black outline-none mt-[0.8rem] mb-[2rem] w-full min-w-[20rem]";

const labelStyle = "text-[1.4rem] ";

export default function AddProduct() {
  const [data, action, isPending] = useActionState(addNewProduct, undefined);

  const [msg, setMsg] = useState<string>();

  useEffect(() => {
    data?.success ? setMsg("") : setMsg(data?.msg);

    setTimeout(() => {
      setMsg("");
    }, 3000);
  }, [data]);

  console.log(data?.msg);

  return (
    <div className="py-[2rem]">
      <div className="text-center">
        <h1 className="mb-[2rem] text-[1.5rem] font-bold">Add Product</h1>
      </div>

      <form action={action} className="flex flex-col items-center">
        <div className="flex flex-col w-[50%] text-left ">
          <label className={`${labelStyle}`} htmlFor="product name">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            required
            className={`${inputStyle}`}
          />
        </div>

        <div className="flex flex-col w-[50%] text-left ">
          <label className={`${labelStyle}`} htmlFor="Discription">
            Discription
          </label>
          <input type="text" name="dis" required className={`${inputStyle}`} />
        </div>

        <input
          disabled={isPending}
          type="submit"
          className={` px-[1rem] py-[0.5rem] bg-[#fb8500] cursor-pointer cursor-pointer`}
        />

        <div className="text-right  w-[50%]">
          <h1 className="text-[#c1121f] text-[1.2rem]">{msg}</h1>
        </div>
      </form>
    </div>
  );
}
