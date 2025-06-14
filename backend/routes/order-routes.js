const express = require("express");
const { createOrder, getAllOrder, updateOrder, deleteOrder, updateStatus, bookingOrder, getBookingOrder } = require("../controllers/order-controller");
const router = express.Router();
const protect = require("../controllers/protect");

router.post("/create", protect, createOrder);
router.get("/get", protect, getAllOrder);
router.put("/update/:id", protect, updateOrder);
router.delete("/delete/:id", protect, deleteOrder);
router.put("/status/update/:id", protect, updateStatus);
router.post("/booking", protect, bookingOrder);
router.get("/booking/get", protect, getBookingOrder);

module.exports = router;