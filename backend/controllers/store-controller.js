const { ImageUploadUtil } = require("../helpers/cloudinary");
const Store = require("../models/store");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const getAllStore = async (req, res) => {
  try {
    const fetchStore = await Store.find({ user: req.user._id });
    if (!fetchStore || fetchStore.length === 0) {
      return res.status(200).json({
        store: [],
        message: "No store found",
      });
    }
    return res.status(200).json({
      success: true,
      store: fetchStore,
    });
  } catch (error) {
    if (error.name === "MongoNetworkError") {
      return res.status(503).json({
        success: false,
        message: "Database connection error. Please try again later.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { storeName, storeDomain, storeLogo } = req.body;
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid store ID",
      });
    }
    const findStore = await Store.findById(id);
    if (!findStore) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }
    if (!findStore.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    if (storeName !== undefined) findStore.storeName = storeName;
    if (storeDomain !== undefined) findStore.storeDomain = storeDomain;
    if (storeLogo !== undefined) findStore.storeLogo = storeLogo;
    await findStore.save();
    res.status(200).json({
      success: true,
      message: "Store updated successfully",
      store: findStore,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllStore,
  updateStore,
  handleImageUpload,
};
