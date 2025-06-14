import { useCallback, useState } from "react";
import { useAppDispatch } from "./store-hook";
import InvoiceDetailController from "@/controllers/invoiceDetailController";
import { setInvoiceDetail } from "@/store/slices/invoiceDetailSlice";

export const useInvoiceDetail = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGetInvoiceDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await InvoiceDetailController.getInvoiceDetail();
      console.log("@Fetched Data:", data);
      dispatch(setInvoiceDetail(data));
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    isLoading,
    handleGetInvoiceDetail,
  };
};
