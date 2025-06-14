const express = require("express");
const { handleImageUpload, createProfile, getProfile, updateProfile } = require("../controllers/profile-controller");
const { upload } = require("../helpers/cloudinary");
const router = express.Router();
const protect = require("../controllers/protect");

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/create", protect, createProfile);
router.get("/get", protect, getProfile);
router.put("/update/:id", protect, updateProfile);

module.exports = router;