import connectDB from "@/db/connect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

type queryObject = {
  productName: {
    $regex: string;
    $options: string;
  };
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchQuery = req.nextUrl.searchParams;
    const productNameQuery = searchQuery.get("productName");
    const limitQuery = searchQuery.get("limit");
    const pageQuery = searchQuery.get("page");
    const sort = searchQuery.get("sort");

    const queryObject: queryObject = {} as queryObject;

    if (productNameQuery) {
      queryObject.productName = { $regex: productNameQuery, $options: "i" };
    }

    let result = Product.find(queryObject);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    }
    // else {
    //   result = result.sort("createAt");
    // }

    const limit = Number(limitQuery);
    const page = Number(pageQuery) || 1;
    const skip = (page - 1) * limit;

    result = result.limit(limit).skip(skip);

    const products = await result;
    const resultAll = await Product.find({});

    return NextResponse.json({
      success: true,
      data: products,
      totalProducts: resultAll.length,
      productShown: products.length,
    });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Error Happend!!", error });
  }
}
