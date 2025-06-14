import { useCallback, useState } from "react";
import { useAppDispatch } from "./store-hook";
import toast from "react-hot-toast";
import ResaleProductController from "@/controllers/resaleProductController";
import { setProducts, setResaleProducts } from "@/store/slices/resaleSlice";

export const reslaeProduct = () => {
  const dispatch = useAppDispatch();
  const [isSetLoading, setIsLoading] = useState(false);

  const handleGetResaleProducts = useCallback(async (payload: any, product_id: any) => {
    try {
      setIsLoading(true);
      const data: any = await ResaleProductController.getResaleProducts(payload, product_id);
      dispatch(setProducts(data));
    } catch (error) {
      toast.error("error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGetListingProduct = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any =
        await ResaleProductController.getListingProduct();
      console.log("@data", data);
      dispatch(setResaleProducts(data));
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isSetLoading,
    handleGetResaleProducts,
    handleGetListingProduct,
  };
};
