import { useCallback, useState } from "react";
import { useAppDispatch } from "./store-hook";
import toast from "react-hot-toast";
import ResaleProductController from "@/controllers/resaleProductController";
import { setResellerOrder } from "@/store/slices/resaleSlice";
import ResellerProductController from "@/controllers/resellerController";

export const resellerOrder = () => {
  const dispatch = useAppDispatch();
  const [isSetLoading, setIsLoading] = useState(false);

  const handleGetOrder = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await ResellerProductController.getResellerOrder();
      dispatch(setResellerOrder(data));
    } catch (error) {
      toast.error("error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateOrder = useCallback(async (payload: any) => {
    try {
      setIsLoading(true);
      const data: any = await ResellerProductController.createResellerOrder(payload);
      toast.success(data.message || "Create Reseller Order Successfully!");
    } catch (error) {
      console.log("@Error", error);
      toast.error("Failed to Create Reseller Order!")
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isSetLoading,
    handleGetOrder,
    handleCreateOrder,
  };
};
