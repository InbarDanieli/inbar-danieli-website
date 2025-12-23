import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  src: string;
  imageId: string;
}

export async function uploadImage(
  file: Buffer,
  folder: string = "yarns"
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve({
              src: result.secure_url,
              imageId: result.public_id,
            });
          } else {
            reject(new Error("Upload failed: No result returned"));
          }
        }
      )
      .end(file);
  });
}

export async function deleteImage(imageId: string): Promise<void> {
  if (!imageId) return;
  
  try {
    await cloudinary.uploader.destroy(imageId);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error);
    throw error;
  }
}

export default cloudinary;

