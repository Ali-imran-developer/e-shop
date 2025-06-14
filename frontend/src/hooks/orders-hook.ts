import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./store-hook"; // Adjust the path
import OrdersController from "@/controllers/ordersController"; // Adjust the path
import { setOrders } from "@/store/slices/ordersSlice"; // Adjust the path

import toast from "react-hot-toast";

import { PDFDocument } from "pdf-lib";
import { useAuth } from "./auth-hooks";

interface FetchOrdersParams {
  status: string;
  isAssigned?: boolean;
  fulfillmentStatus?: string;
  deliveryStatus?: string;
  page?: number;
  limit?: number;
  startDate?: string | null;
  endDate?: string | null;
  title?: string;
  searchByCity?: string;
  filterByCity?: string;
}

export const useOrders = (params?: FetchOrdersParams) => {
  const { user, accessToken } = useAuth();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetOrders = useCallback(async (queryParams: any) => {
    try {
      setLoading(true);
      if (queryParams) {
        const params = new URLSearchParams();
        params.append("fulfillmentStatus", queryParams.fulfillmentStatus);
        params.append("status", queryParams?.status);
        params.append("isAssigned", queryParams?.isAssigned?.toString());
        // params.append("deliveryStatus", queryParams?.deliveryStatus);
        params.append("title", queryParams.title?.toString()?.trim());
        params.append(
          "searchByCity",
          queryParams?.searchByCity?.toString()?.trim()
        );
        params.append("filterByCity", queryParams.filterByCity);
        params.append("page", queryParams?.page?.toString());
        params.append("limit", queryParams.limit?.toString());
        params.append("startDate", queryParams.startDate);
        params.append("endDate", queryParams.endDate);
        const orders: any = await OrdersController.getAllOrders(params);
        dispatch(setOrders(orders));
        return orders;
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetOrders(params);
  }, [params]);

  const handleUpdateOrderDispatchStatus = useCallback(
    async (id: string, data: any) => {
      try {
        setLoading(true);
        const { orders }: any =
          await OrdersController.updateOrderDispatchStatus(id, data);
        dispatch(setOrders(orders));
      } catch (error) {
        console.log("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const chunkArray = async (arr: any[], size: any) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArray.push(arr.slice(i, i + size));
    }
    return [...chunkedArray];
  };

  const mergePDFs = async (base64PDFs: any) => {
    try {
      const mergedPDF = await PDFDocument.create();

      for (let i = 0; i < base64PDFs.length; i++) {
        const base64PDF = base64PDFs[i];
        if (
          base64PDF !==
          "eyJzdGF0dXMiOjEsIm1lc3NhZ2UiOiJBbHJlYWR5IFJlY2VpdmVkIn0="
        ) {
          const pdfBytes = Uint8Array.from(atob(base64PDF), (c) =>
            c.charCodeAt(0)
          );

          const pdfDoc = await PDFDocument.load(pdfBytes);
          const pages = await mergedPDF.copyPages(
            pdfDoc,
            pdfDoc.getPageIndices()
          );

          pages.forEach((page: any) => {
            mergedPDF.addPage(page);
          });
        } else {
          toast.success("The tracking has been completed.");
        }
      }
      const mergedPDFBase64 = await mergedPDF.saveAsBase64();

      return mergedPDFBase64;
    } catch (error: any) {
      error.message = `Error while merging PDFs: ${error.message}`;
      console.log(error.message || error);
    }
  };

  const handleDownloadPdf = async (
    pdfdownloadString: string,
    selectedOrdersInBulk: any[]
  ) => {
    let orderNames = [];
    if (accessToken && user) {
      if (pdfdownloadString) {
        const link = document.createElement("a");
        link.setAttribute(
          "href",
          'data:"application/pdf;base64,' + pdfdownloadString
        );

        let today: any = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0");
        let yyyy = today.getFullYear();

        today = dd + "-" + mm + "-" + yyyy;

        if (selectedOrdersInBulk.length === 1) {
          for (const order of selectedOrdersInBulk) {
            orderNames.push(order.name);
            link.setAttribute(
              "download",
              `${order.order_number}-${order.orderRefNumber.replace(
                `${order.name}-`,
                ""
              )}.pdf`
            );
          }
        } else {
          let storename = selectedOrdersInBulk.map((order) =>
            order.orderRefNumber.replace(`${order.name}-`, "")
          )[0];
          for (const order of selectedOrdersInBulk) {
            orderNames.push(order.name);
            link.setAttribute(
              "download",
              `${today}-${JSON.stringify(storename)}.pdf`
            );
          }
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
    return orderNames;
  };

  return {
    handleGetOrders,
    loading,
    handleUpdateOrderDispatchStatus,
    handleDownloadPdf,
    mergePDFs,
    chunkArray,
  };
};
