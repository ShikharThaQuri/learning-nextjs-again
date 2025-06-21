import connectDB from "@/db/connect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchQuery = req.nextUrl.searchParams;
    const productId = searchQuery.get("id");

    const result = await Product.findById(productId);

    if (!result) {
      return NextResponse.json({ success: false, msg: "Product Not Found" });
    }

    return NextResponse.json({
      success: true,
      msg: "Product Found",
      product: result,
    });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Error Happened" });
  }
}
