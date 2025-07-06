import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

export const UploadImage = async (buffer: Buffer) => {
  return await new Promise<CloudinaryUploadResult>((resolve, reject) => {
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
  });
};
