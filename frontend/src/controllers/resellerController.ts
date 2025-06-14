import { apiRequest } from "./apiController";

class ResellerProductController {
  static getResellerOrder() {
    return apiRequest("get", "/reseller/order");
  }
  static getSingleResellerOrder(id: string) {
    return apiRequest("get", `/reseller/order/${id}`);
  }
  static createResellerOrder(data: any) {
    return apiRequest("post", "/reseller/order", data);
  }
  static updateResellerProfit(id: string, data: any) {
    return apiRequest("patch", `/reseller/order/${id}`, data);
  }
}

export default ResellerProductController;