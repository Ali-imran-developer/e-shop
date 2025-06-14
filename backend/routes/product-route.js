const express = require("express");
const { handleImageUpload, createProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/product-controller");
const { upload } = require("../helpers/cloudinary");
const router = express.Router();
const protect = require("../controllers/protect");

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/create", protect, createProduct);
router.get("/get", protect, getAllProducts);
router.put("/update/:id", protect, updateProduct);
router.delete("/delete/:id", protect, deleteProduct);

module.exports = router;