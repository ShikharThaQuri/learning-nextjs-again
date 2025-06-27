import cloudinary from "./cloudinary";

export const UploadImage = async (buffer) => {
  return await new Promise(async (resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "reLearning-Nextjs",
        },
        async (err, result) => {
          if (err) {
            return reject(err.message);
          }
          return resolve(result);
        }
      )
      .end(buffer);
  });
};
