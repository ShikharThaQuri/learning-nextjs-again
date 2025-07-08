import connectDB from "@/db/connect";
import { deleteImage } from "@/lib/cloudinary/deleteImage";
import { UploadImage } from "@/lib/cloudinary/upload_image";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.formData();

    const image = data.get("file") as File;

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageData = await UploadImage(buffer);

    if (!imageData) {
      return NextResponse.json({
        success: false,
        msg: "Image upload failed!",
      });
    }

    const newProduct = new Product({
      productName: data.get("productName"),
      dis: data.get("dis"),
      price: data.get("price"),
      image_Url: imageData.secure_url,
      public_id: imageData.public_id,
    });

    const result = await newProduct.save({});

    return NextResponse.json({
      success: true,
      msg: "Successfully Added a Product!",
      product: result,
    });
  } catch (error) {
    console.error("Error in POST:", error);
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

    await deleteImage(data.Public_id);

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

    const formData = await req.formData();
    const { searchParams } = req.nextUrl;
    const productId = searchParams.get("id");

    const image = formData.get("file") as File;

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const findImage = await Product.findById(productId);
    if (!findImage) {
      return NextResponse.json({
        success: false,
        msg: "Product not found!",
      });
    }
    await deleteImage(findImage.Public_id);

    const imageData = await UploadImage(buffer);

    const result = await Product.findByIdAndUpdate(
      { _id: productId },
      {
        productName: formData.get("productName"),
        dis: formData.get("dis"),
        price: formData.get("price"),
        image_Url: imageData.secure_url,
        public_id: imageData.public_id,
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
