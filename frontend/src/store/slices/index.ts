import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import orderReducer from "./ordersSlice";
import ManualOrderReducer from "./manualOrdersSlice";
import storeReducer from "./storeSlice";
import invetoryReducer from "./inventorySlice";
import invoiceReduce from "./invoiceSlice";
import invoiceDetailReduce from "./invoiceDetailSlice";
import SkuMappingReduce from "./skuMappingSlice";
import courierReducer from "./CourierSlice";
import CustomerReducer from "./customerSlice";
import RolesReduce from "./rolesSlice";
import ResaleProductReducer from "./resaleSlice";
import categoriesReducer from "./categoriesSlice";
import profileReducer from "./profileSlice";
import shipperReducer from "./shipperSlice";

const rootReducer = combineReducers({
  Auth: authReducer,
  Products: productReducer,
  Orders: orderReducer,
  Shipper: shipperReducer,
  Profile: profileReducer,
  ManualOrders: ManualOrderReducer,
  Stores: storeReducer,
  Inventory: invetoryReducer,
  Categories: categoriesReducer,
  Courier: courierReducer,
  Invoice: invoiceReduce,
  Roles: RolesReduce,
  InvoiceDetail: invoiceDetailReduce,
  SkuMapping: SkuMappingReduce,
  Customer: CustomerReducer,
  resaleProduct: ResaleProductReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
