const express = require("express");
const { createCustomer, getAllCustomer, updateCustomer, deleteCustomer, } = require("../controllers/customer-controller");
const router = express.Router();
const protect = require("../controllers/protect");

router.post("/create", protect, createCustomer);
router.get("/get", protect, getAllCustomer);
router.put("/update/:id", protect, updateCustomer);
router.delete("/delete/:id", protect, deleteCustomer);

module.exports = router;