"use server";

import axios from "axios";

export async function getProducts() {
  try {
    const res = await fetch(
      `http://localhost:3000/api/common/products/getProducts`,
      {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 5 },
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching All products:", error);
    return {
      success: false,
      msg: "Something Went Wrong Please Try Again!",
    };
  }
}

export async function getProductsUsingSearchQuery(
  productName: string,
  currentPage: number,
  limit: number
) {
  try {
    const getQuery = `?productName=${productName}&page=${currentPage}&limit=${limit}`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/common/products/getProducts${getQuery}`,
      {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 3 },
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      msg: "Something Went Wrong Please Try Again!",
    };
  }
}

export async function getProductById(
  previousState: unknown,
  formData: FormData
) {
  try {
    const { data } = await axios.get(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/common/products/getProductById?id=${formData.get("productId")}`
    );

    return data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return {
      success: false,
      msg: "Something Went Wrong Please Try Again!",
    };
  }
}

export async function addNewProduct(
  previousState: unknown,
  formData: FormData
) {
  try {
    const productName = formData.get("productName") as string;
    const dis = formData.get("dis") as string;
    const price = formData.get("price") as string;
    const file = formData.get("file") as File;

    const Data = new FormData();
    Data.set("productName", productName);
    Data.set("dis", dis);
    Data.set("price", price);
    Data.set("file", file);

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`,
      Data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return data;
  } catch (error) {
    console.error("Error adding new product:", error);
    return {
      success: false,
      msg: "Something Went Wrong Please Try Again!",
    };
    // throw new Error("Failed to add new product");
  }
}

export async function deleteProduct(
  previousState: unknown,
  formData: FormData
) {
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`,
      {
        data: {
          _id: formData.get("productId"),
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      msg: "Something Went Wrong Please Try Again!",
    };
  }
}

export async function updateProduct(
  previousState: unknown,
  formData: FormData
) {
  try {
    const productName = formData.get("productName") as string;
    const dis = formData.get("dis") as string;
    const price = formData.get("price") as string;
    const file = formData.get("file") as File;

    const Data = new FormData();
    Data.set("productName", productName);
    Data.set("dis", dis);
    Data.set("price", price);
    Data.set("file", file);

    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products?id=${formData.get(
        "Id"
      )}`,
      Data
    );

    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      msg: "Something Went Wrong Please Try Again!",
    };
  }
}
