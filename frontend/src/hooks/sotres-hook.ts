import { useCallback, useEffect, useState } from "react";
import { CALLBACK_STATUS } from "../config/enums";
import AuthController from "../controllers/authController";
import ProductController from "../controllers/productController";
import { useAppDispatch, useAppSelector } from "./store-hook";
import OrdersController from "@/controllers/ordersController";
import { setOrders } from "@/store/slices/ordersSlice";
import StoreController from "@/controllers/storeController";

export const useStores = () => {
  const handleGetAllStores = useCallback(
    async (callback: (status: any, value: any) => void) => {
      try {
        callback && callback(CALLBACK_STATUS.LOADING, true);
        const stores: any = await StoreController.getAllStores();
        console.log("HooksStore", stores);
        AuthController.setSession({
          store: stores,
        });
        callback && callback(CALLBACK_STATUS.SUCCESS, stores);
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );
  const handleAddStores = useCallback(
    async (data: any, callback: (status: any, value: any) => void) => {
      try {
        callback && callback(CALLBACK_STATUS.LOADING, true);
        const { message, stores }: any = await StoreController.addStore(data);

        console.log("storesstores", message, stores);

        AuthController.setSession({
          stores,
        });
        callback && callback(CALLBACK_STATUS.SUCCESS, message);
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );
  const handleBulkOperation = useCallback(
    async (data: any, callback: (status: any, value: any) => void) => {
      try {
        callback && callback(CALLBACK_STATUS.LOADING, true);

        const res = await StoreController.bulkOperation({
          storeId: data,
        });
        callback && callback(CALLBACK_STATUS.SUCCESS, res);
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );
  return {
    handleGetAllStores,
    handleAddStores,
    handleBulkOperation,
  };
};
