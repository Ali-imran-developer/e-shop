import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store-hook";
import { setManualOrders, setError } from "@/store/slices/manualOrdersSlice";
import ManualOrderController from "@/controllers/manualOrdersController";

export const useManualOrders = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const data = useAppSelector((state) => state.ManualOrders.data);
  const error = useAppSelector((state) => state.ManualOrders.error);

  const handleManualOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ManualOrderController.getManualOrder();
      console.log("@Fetched Data:", response);
      
      if (!response || response.length === 0) {
        throw new Error('No data received');
      }
      
      dispatch(setManualOrders(response));
    } catch (error) {
      console.error("@Error:", error);
      dispatch(setError(error instanceof Error ? error.message : 'Unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return {
    isLoading,
    data,
    error,
    handleManualOrders,
  };
};
