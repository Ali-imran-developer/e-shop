import { useCallback, useState } from "react";
import InvoiceController from "@/controllers/invoiceController";
import { useAppDispatch } from "./store-hook";
import { setInvoice } from "@/store/slices/invoiceSlice";

export const useInvoice = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGetInvoice = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await InvoiceController.getInvoice();
      console.log("@Fetched Data:", data);
      dispatch(setInvoice(data));
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    isLoading,
    handleGetInvoice,
  };
};
