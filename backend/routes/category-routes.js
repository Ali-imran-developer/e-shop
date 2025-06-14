const express = require("express");
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category-controller");
const router = express.Router();
const protect = require("../controllers/protect");

router.post("/create", protect, createCategory);
router.get("/get", protect, getAllCategory);
router.put("/update/:id", protect, updateCategory);
router.delete("/delete/:id", protect, deleteCategory);

module.exports = router;