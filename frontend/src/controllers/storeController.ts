import { apiRequest } from "./apiController";

class StoreController {
  // static getAllStores(token?: any) {
  //   return apiRequest("get", "/api/stores/getAllStore", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
  static getAllStores(token?: string) {
    return apiRequest("get", "/api/stores/getAllStore", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }

  static addStore(data: any) {
    // return apiRequest("post", "/api/stores/saveStore", data);
    return apiRequest("post", "/api/v1/shopify/add-store", data);
  }

  static removeChanel(store_id: URLSearchParams) {
    // return apiRequest("post", `/api/orders/assignedOrders`, { orders });
    return apiRequest("delete", `/api/v1/shopify/delete-store/${store_id}`);
  }
  static bulkOperation(data: any) {
    return apiRequest("post", "/api/jobs/shopifyBulkOperation", data);
  }
}

export default StoreController;
