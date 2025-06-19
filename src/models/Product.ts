import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: String,
    dis: String,
    like: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Product;

export type ProductType = {
  _id: string;
  productName: string;
  dis: string;
  like: { userId: string }[];
  createdAt?: Date;
  updatedAt?: Date;
};
