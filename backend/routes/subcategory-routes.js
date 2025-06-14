const express = require("express");
const { deleteSubCategory } = require("../controllers/subcategory-controller");
const router = express.Router();
const protect = require("../controllers/protect");

router.delete("/delete/:categoryId/:subCategoryId", protect, deleteSubCategory);
module.exports = router;