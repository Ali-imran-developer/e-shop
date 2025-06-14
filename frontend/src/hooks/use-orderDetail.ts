import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/store-hook";
import OrdersController from "@/controllers/ordersController";

interface OrderDetailType {
  id: string;
  name: string;
  shipping_address: {
    name: string;
  };
  line_items: any[];
  total_price: string;
  created_at: string;
  dispatchStatus: string;
}

export const useOrderDetail = () => {
  const [currentOrder, setCurrentOrder] = useState<OrderDetailType | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams(); // Get orderId from URL params
  const { data: orders } = useAppSelector((state) => state?.Orders);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);

        // First try to find the order in the existing Redux state
        const orderFromState = orders?.find(
          (order: OrderDetailType) => order.line_items[0].id === orderId
        );

        if (orderFromState) {
          setCurrentOrder(orderFromState);
        } else {
          // If not found in state, fetch from API
          // const response = await OrdersController.getOrderById(orderId);
          // setCurrentOrder(response);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    // if (orderId) {
    //   fetchOrderDetail();
    // }
  }, [orderId, orders]);

  return {
    currentOrder,
    loading,
    isError: !loading && !currentOrder,
  };
};
