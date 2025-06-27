import connectDB from "@/db/connect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.formData();

    const image = data.get("file") as File;

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageData = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadstream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          }
        );
        uploadstream.end(buffer);
      }
    );

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
