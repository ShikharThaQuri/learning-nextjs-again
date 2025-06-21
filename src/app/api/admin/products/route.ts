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

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();

    const result = await Product.findByIdAndDelete(data._id);

    if (!result) {
      return NextResponse.json({
        success: false,
        msg: "Product not found!",
      });
    }
    return NextResponse.json({
      success: true,
      msg: "Successfully Deleted a Product!",
    });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Error Happend!", error });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();
    const { searchParams } = req.nextUrl;
    const productId = searchParams.get("id");

    const result = await Product.findByIdAndUpdate(
      { _id: productId },
      {
        productName: data.productName,
        dis: data.dis,
      },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({
        success: false,
        msg: "something went wrong, please try again!",
      });
    }

    return NextResponse.json({
      success: true,
      msg: "Successfully Updated a Product!",
    });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Error Happend!", error });
  }
}
