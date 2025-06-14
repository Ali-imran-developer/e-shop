import { apiRequest } from "./apiController";

class ResaleProductController {
  static getResaleProducts(data: any, product_id: any) {
    return apiRequest(
      "post",
      `/api/v1/products/products/${product_id}/list-for-resale`,
      data
    );
  }
  static getListingProduct() {
    return apiRequest("get", "/api/v1/products/products/listed");
  }
  static getAllCities() {
    return apiRequest("get", "/api/v1/products/products/listed");
  }
}

export default ResaleProductController;
