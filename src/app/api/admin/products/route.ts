import connectDB from "@/db/connect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();

    const newProduct = new Product({
      productName: data.productName,
      dis: data.dis,
    });

    const result = await newProduct.save({});

    return NextResponse.json({
      success: true,
      msg: "Successfully Added a Product!",
    });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Error Happend!", error });
  }
}
