import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./store-hook"; // Adjust the path
import OrdersController from "@/controllers/ordersController"; // Adjust the path
// import { setOrders } from "@/store/slices/ordersSlice"; // Adjust the path
import { CALLBACK_STATUS } from "@/config/enums";
import CourierControllers from "@/controllers/courierController";
// import { setCouriers, setCourierName, setManualCourier } from "@/store/slices/CourierSlice";
import AuthController from "@/controllers/authController";
import toast from "react-hot-toast";

export const useCouriers = () => {
  const dispatch = useAppDispatch();

  // const loadCouriers = useCallback(async () => {
  //   try {
  //     const data = await CourierControllers.getUserPreferences();
  //     AuthController.setSession({
  //       updatedCouriers: data,
  //     });
  //     dispatch(setCouriers(data));
  //     console.log("@@@@@@data", data);

  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }, []);

  // const loadCouriers = useCallback(async () => {
  //   try {
  //     const data = await CourierControllers.getAllSelectedCourier();
  //     if (data) {
  //       AuthController.setSession({ updatedCouriers: data });
  //       dispatch(setCouriers(data));
  //     }
  //     return data;
  //   } catch (error: any) {
  //     console.error("Failed to load couriers:", error);
  //     return error;
  //   }
  // }, []);

  // const addCouriers = useCallback(async (payload: {name: string; logo: string}) => {
  //   try {
  //     const data = await CourierControllers.addCourier(payload);
  //     toast.success("Courier added successfully!");
  //     return data;
  //   } catch (error: any) {
  //     console.error("Failed to load couriers:", error);
  //     toast.error("Failed to add courier. Please try again.");
  //     return error;
  //   }
  // }, []);

  // const handleAddCourierKeys = useCallback(
  //   async (payload: any, callback: (status: any, value: any) => void) => {
  //     try {
  //       callback && callback(CALLBACK_STATUS.LOADING, true);
  //       const response = await CourierControllers.addKeys(payload);
  //       loadCouriers();
  //       callback && callback(CALLBACK_STATUS.SUCCESS, response);
  //     } catch (error) {
  //       callback && callback(CALLBACK_STATUS.ERROR, error);
  //     } finally {
  //       callback && callback(CALLBACK_STATUS.LOADING, false);
  //     }
  //   },
  //   []
  // );

  // const getCouriersName = useCallback(async () => {
  //   try {
  //     const response = await CourierControllers.getCouriersname();
  //     dispatch(setCourierName(response));
  //     return response;
  //   } catch (error) {
  //     return error;
  //   }
  // }, []);

  // const getManualCouriers = useCallback(async () => {
  //   try {
  //     const response = await CourierControllers.getManualCourier();
  //     dispatch(setManualCourier(response));
  //     return response;
  //   } catch (error) {
  //     return error;
  //   }
  // }, []);

  // const updateMyCouriers = useCallback(async (data: any) => {
  //   try {
  //     const response = await CourierControllers.updateCourier(data);
  //     loadCouriers();
  //     return response;
  //   } catch (error) {
  //     return error;
  //   }
  // }, []);

  return {
    // loadCouriers,
    // getCouriersName,
    // updateMyCouriers,
    // handleAddCourierKeys,
    // addCouriers,
    // getManualCouriers,
    // user: session?.user,
    // isAuthenticated: session?.isAuthenticated,
    // accessToken: session?.accessToken,
  };
};
