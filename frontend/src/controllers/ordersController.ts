import { apiRequest } from "./apiController";

class OrdersController {
  static getAllOrders(queryParams: URLSearchParams) {
    // return apiRequest("get", `/api/v1/orders`);
    return apiRequest("get", `/api/v1/orders?${queryParams}`);
  }
  static createOrder(data: any) {
    // return apiRequest("get", `/api/v1/orders`);
    return apiRequest("post", `/api/v1/orders`, data);
  }
  static updateOrderDispatchStatus(order_id: string, status: URLSearchParams) {
    console.log("@@order_id", order_id, status);

    return apiRequest("put", `/api/v1/orders/${order_id}/status`, {
      status,
    });
  }
  // static updateOrderDispatchStatus(data: URLSearchParams) {
  //   return apiRequest("put", `/api/orders/orderDispatchStatus`, data);
  // }
  static addTrackingNumbers({
    orderId,
    storeId,
    trackingCompany,
    shipmentType,
  }: any) {
    let data = { orderId, storeId, trackingCompany, shipmentType };
    return apiRequest("post", `/api/orders/saveShipmentRecord`, data);
  }
  static saveBillingLogs(storeId: any, current_total_price: URLSearchParams) {
    const data = { storeId: storeId, current_total_price: current_total_price };
    return apiRequest("post", `/api/billingLogs/saveBilling`, data);
  }
  static assignedOrders(data: any) {
    console.log("@datadata", data);
    return apiRequest("post", `/api/v1/orders/booking`, data);
  }
  static getSelectedCourierCities(courier_id: URLSearchParams) {
    // return apiRequest("post", `/api/orders/assignedOrders`, { orders });
    return apiRequest("get", `/api/v1/courier/${courier_id}/cites`);
  }
  static updateShipmentDetails(order_id: string, payload: any) {
    // return apiRequest("post", `/api/orders/assignedOrders`, { orders });
    return apiRequest("put", `/api/v1/orders/${order_id}/address`, payload);
  }
  static addProcureStatuses(payload: any) {
    return apiRequest("put", `/api/v1/orders/procure-status`, payload);
  }
  static getAllShopilamCities() {
    return apiRequest("get", "/api/v1/courier/shopilam-cities");
  }
}

export default OrdersController;
