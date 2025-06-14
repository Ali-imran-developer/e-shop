const express = require("express");
const { createShipperInfo, getShipperInfo, updateShipperInfo, deleteShipperInfo } = require("../controllers/shipper-info");
const router = express.Router();
const protect = require("../controllers/protect");

router.post("/create", protect, createShipperInfo);
router.get("/get", protect, getShipperInfo);
router.put("/update/:id", protect, updateShipperInfo);
router.delete("/delete/:id", protect, deleteShipperInfo);

module.exports = router;