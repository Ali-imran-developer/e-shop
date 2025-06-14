const express = require("express");
const router = express.Router();
const protect = require("../controllers/protect");
const { upload } = require("../helpers/cloudinary");
const { createCourier, getAllCourier, updateCourier, deleteCourier, handleImageUpload } = require("../controllers/courier-controller");

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/create", protect, createCourier);
router.get("/get", protect, getAllCourier);
router.put("/update/:id", protect, updateCourier);
router.delete("/delete/:id", protect, deleteCourier);

module.exports = router;