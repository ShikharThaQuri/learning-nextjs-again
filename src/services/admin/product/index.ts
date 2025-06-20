"use server";

import axios from "axios";

export async function getProducts(
  productName: string,
  currentPage: string,
  limit: number,
  price: number
) {
  try {
    let getQuery = `?productName=${productName}&page=${currentPage}&limit=${limit}&sort=${price}`;

    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/common/products/getProducts${getQuery}`
    );

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function addNewProduct(formData: FormData) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/addProduct`,
      {
        productName: formData.get("productName"),
        dis: formData.get("dis"),
      }
    );

    return data;
  } catch (error) {
    console.error("Error adding new product:", error);
    throw new Error("Failed to add new product");
  }
}
