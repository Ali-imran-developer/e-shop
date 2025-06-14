const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
const authRouter = require("./routes/auth-routes");
const shipperInfo = require("./routes/shipper-info");
const productRouter = require("./routes/product-route");
const OrderRouter = require("./routes/order-routes");
const ProfileRoute = require("./routes/profile-routes");
const CategoryRoute = require("./routes/category-routes");
const subCategoryRoutes = require("./routes/subcategory-routes");
const customerRouter = require("./routes/customer-routes");
const courierRouter = require("./routes/courier-routes");
const storeRouter = require("./routes/store-routes");
const envPort = process.env.PORT;
const host = process.env.BASEURL;
const mongodb = process.env.mongoUrl;

mongoose.connect(`${mongodb}`).then(() => console.log('MongoDB Connected')).catch((error) => console.log(error));
const app = express()
const PORT = envPort || 5001;
app.use(
    cors({
        origin : `${host}`,
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "Cache-Control",
          "Expires",
          "Pragma",
        ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/profile", ProfileRoute);
app.use("/api/categories", CategoryRoute);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/shipperinfo", shipperInfo);
app.use("/api/customer", customerRouter);
app.use("/api/courier", courierRouter);
app.use("/api/store", storeRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));