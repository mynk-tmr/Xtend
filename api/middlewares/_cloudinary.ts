import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//converts textfields in formdata into req.body AND uploaded files into req.files or req.file
//parser's .array() => req.files is array of files
export const formDataParser = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 2 ** 20, //5 MB
  },
});

export async function uploadFiles(files: Express.Multer.File[]) {
  const tasks = files.map(async (file) => {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;
    const { url } = await cloudinary.uploader.upload(dataURI);
    return url;
  });

  const links = await Promise.all(tasks);
  return links;
}
