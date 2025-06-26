import connectDB from "@/db/connect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { UploadImage } from "@/lib/cloudinary/upload_image";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();

    const imageData = await UploadImage(data.imageUrl);

    if (!imageData) {
      return NextResponse.json({
        success: false,
        msg: "Image upload failed!",
      });
    }

    const newProduct = new Product({
      productName: data.productName,
      dis: data.dis,
      price: data.price,
      image_Url: imageData.secure.url,
      public_id: imageData.public_id,
    });

    const result = await newProduct.save({});

    return NextResponse.json({
      success: true,
      msg: "Successfully Added a Product!",
      product: result,
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
      product: result,
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
      product: result,
    });
  } catch (error) {
    return NextResponse.json({ success: false, msg: "Error Happend!", error });
  }
}
