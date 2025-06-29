const Order = require("../models/order");
const Product = require("../models/product");
const Customer = require("../models/customer");
const Courier = require("../models/courier");
const ShipperInfo = require("../models/shipper-info");
const Store = require("../models/store");
const axios = require("axios");

const createOrder = async (req, res) => {
  try {
    const {
      products,
      tags,
      promoCode,
      shipmentDetails,
      pricing,
      paymentMethod,
      shipperCity,
      status,
    } = req.body;

    const store = await Store.findOne({ user: req.user._id });
    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found for this user.",
      });
    }

    const totalOrders = await Order.countDocuments();
    const customOrderName = `#${1001 + totalOrders}`;
    const { email, name, phone, city } = shipmentDetails;
    let customer;
    customer = await Customer.findOne({
      user: req.user._id,
      customerName: name,
      phone,
    });
    let isNewCustomer = false;
    if (customer) {
      customer.totalOrders += 1;
      customer.totalSpent += pricing.totalPrice;
      customer.city = city;
    } else {
      const sameCityCustomer = await Customer.findOne({
        user: req.user._id,
        city,
      });
      if (sameCityCustomer) {
        customer = new Customer({
          customerName: name,
          phone,
          city,
          totalOrders: 1,
          totalSpent: pricing.totalPrice,
        });
      } else {
        customer = new Customer({
          user: req.user._id,
          customerName: name,
          phone,
          city,
          totalOrders: 1,
          totalSpent: pricing.totalPrice,
        });
        isNewCustomer = true;
      }
    }
    await customer.save();
    const newOrder = new Order({
      user: req.user._id,
      store: store._id,
      name: customOrderName,
      products,
      tags,
      promoCode,
      paymentMethod,
      shipperCity,
      shipmentDetails,
      pricing,
      customer: customer._id,
      status,
    });
    await newOrder.save();
    store.totalOrders = (store.totalOrders || 0) + 1;
    if (isNewCustomer) {
      store.totalCustomers = (store.totalCustomers || 0) + 1;
    }
    await store.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders || orders.length === 0) {
      return res.status(200).json({
        orders: [],
        message: "No orders found",
      });
    }
    const allProductIds = orders?.flatMap((order) =>
      order?.products?.map((pd) => pd?.productId)
    );
    const uniqueProductIds = [...new Set(allProductIds)];
    const allProducts = await Product.find({ _id: { $in: uniqueProductIds } });
    const enrichedOrders = orders.map((order) => {
      const enrichedProductDetails = order?.products
        ?.map((pd) => {
          const productData = allProducts?.find((product) =>
            product._id.equals(pd.productId)
          );
          if (productData) {
            return {
              productData,
              quantity: pd.productQty,
            };
          }
          return null;
        })
        .filter(Boolean);
      return {
        ...order.toObject(),
        trackingId: order.trackingId || null,
        products: enrichedProductDetails,
      };
    });
    return res.status(200).json({
      success: true,
      orders: enrichedOrders,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { shipmentDetails } = req.body;
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (!order.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    order.shipmentDetails = {
      ...order.shipmentDetails.toObject(),
      ...shipmentDetails,
    };
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Shipment details updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    if (!order.user.equals(req.user._id)) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    const storeId = order.store;
    await Order.findByIdAndDelete(id);
    if (storeId) {
      const store = await Store.findById(storeId);
      if (store && store.totalOrders > 0) {
        store.totalOrders -= 1;
        await store.save();
      }
    }
    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID format",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || id.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    if (!status || typeof status !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid status must be provided",
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (!order.user.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this order",
      });
    }

    if (order.status === status) {
      return res.status(200).json({
        success: true,
        message: "Order status is already up to date",
        order,
      });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      updatedOrder: order,
    });
  } catch (error) {
    console.error(error);

    // if (error.name === "ValidationError") {
    //   return res.status(400).json({ success: false, message: error.message });
    // }

    // if (error.name === "CastError") {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid Order ID format",
    //   });
    // }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const bookingOrder = async (req, res) => {
  const { orderId, userId, courierId, shipmentType, shipperId } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (!order.user.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to book this order",
      });
    }
    const courierPayload = {
      payment_method: order.paymentMethod?.toUpperCase() || "COD",
      total: order.pricing?.totalPrice || 0,
      name: order._id ? `#${order._id}` : "",
      subtotal: order.pricing?.subTotal || 0,
      shipping_name: order.shipmentDetails?.name || "",
      email: order.shipmentDetails?.email || "",
      shipping_phone: `+92${order.shipmentDetails?.phone?.replace(/^0/, "")}` || "",
      shipping_street: order.shipmentDetails?.address || "",
      shipping_company: "shopCart",
      shipping_city: order.shipmentDetails?.city || "",
      line_items: order.products.map((item) => ({
        lineitem_price: item?.productData?.price || 0,
        lineitem_quantity: item?.quantity || 1,
        lineitem_name: item?.productData?.name || "",
        lineitem_sku: item?.productData?._id || "",
      })),
      shipping_address1: order.shipmentDetails?.address || "",
      created_at: new Date(order.createdAt).toISOString(),
      account_id: "q6398070"
    };

    const response = await axios.post('http://honeybeecourier.com/api/v10/parcels/booking',
      courierPayload,
      {
        headers: {
          'apiKey': 'HBC_0xGhUiqkNtziEPaeUZnt6ghy',
          'Content-Type': 'application/json'
        }
      }
    );

    const { message, tracking_id } = response?.data || {};
    const trackingId = tracking_id;
    if (message && trackingId) {
      order.trackingId = trackingId;
      order.status = "booked";
      order.courierId = courierId;
      order.shipperId = shipperId;
      order.shipmentType = shipmentType;
      await order.save();
      return res.status(200).json({
        success: true,
        message: `${message}`,
        trackingId,
        order,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Courier booking failed",
        courierResponse: response.data,
      });
    }
  } catch (error) {
    console.error('Courier Booking Error:', error.response?.data || error.message);
    return res.status(500).json({
      message: 'Failed to book order with courier',
      error: error.response?.data || error.message
    });
  }
};

const getBookingOrder = async (req, res) => {
  try {
    const bookedOrders = await Order.find({ user: req.user._id, status: "booked" });
    if (!bookedOrders || bookedOrders.length === 0) {
      return res.status(200).json({
        bookedOrders: [],
        message: "No bookedOrders found",
      });
    }
    const allProductIds = bookedOrders?.flatMap((order) =>
      order?.products?.map((pd) => pd?.productId)
    );
    const uniqueProductIds = [...new Set(allProductIds)];
    const allProducts = await Product.find({ _id: { $in: uniqueProductIds } });
    const courierIds = bookedOrders.map(order => order.courierId).filter(id => id);
    const shipperIds = bookedOrders.map(order => order.shipperId).filter(id => id);

    const allCouriers = await Courier.find({ _id: { $in: courierIds } });
    const allShippers = await ShipperInfo.find({ _id: { $in: shipperIds } });

    const bookOrders = bookedOrders.map((order) => {
      const enrichedProductDetails = order?.products
        ?.map((pd) => {
          const productData = allProducts?.find((product) =>
            product._id.equals(pd.productId)
          );
          if (productData) {
            return {
              productData,
              quantity: pd.productQty,
            };
          }
          return null;
        })
        .filter(Boolean);

      const courierData = allCouriers.find(c => c._id.equals(order.courierId));
      const shipperData = allShippers.find(s => s._id.equals(order.shipperId));

      return {
        ...order.toObject(),
        products: enrichedProductDetails,
        courier: courierData || null,
        shipper: shipperData || null,
        shipmentType: order.shipmentType || null,
      };
    });

    return res.status(200).json({
      success: true,
      bookOrders,
    });

  } catch (error) {
    console.error("Get Booking Order Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  updateStatus,
  bookingOrder,
  getBookingOrder,
};
