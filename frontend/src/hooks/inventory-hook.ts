import { useCallback, useState } from "react";
import InventoryController from "@/controllers/inventoryController";
import { useAppDispatch } from "./store-hook";
import { setInventoryProducts } from "@/store/slices/inventorySlice";
import { CALLBACK_STATUS } from "../config/enums";

export const useInventory = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetInventory = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await InventoryController.getInventoryProducts();
      console.log("@Fetched Data:", data);
      dispatch(setInventoryProducts(data));
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddInventory = useCallback(
    async (values: any, callback: (status: any, value: any) => void) => {
      try {
        const response: any = await InventoryController.addInventoryProduct(
          values
        );
        response && dispatch(setInventoryProducts(response));
        callback && callback(CALLBACK_STATUS.SUCCESS, response);
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );

  const handleUpdateInventory = useCallback(
    async (values: any, callback: (status: any, value: any) => void) => {
      try {
        console.log("@values", values);
        const response: any = await InventoryController.updateInventoryProduct(
          values
        );
        console.log("@response", response);
        response && dispatch(setInventoryProducts(response));
        callback && callback(CALLBACK_STATUS.SUCCESS, response);
      } catch (error) {
        callback && callback(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback && callback(CALLBACK_STATUS.LOADING, false);
      }
    },
    []
  );

  return {
    handleGetInventory,
    handleAddInventory,
    handleUpdateInventory,
    isLoading,
  };
};
