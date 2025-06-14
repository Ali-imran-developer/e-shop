const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dtzkgdojm",
  api_key: "122776748714567",
  api_secret: "gazoE698Amg0oiHFPf4rGLV7UxU",
});

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });
module.exports = { upload, ImageUploadUtil };
