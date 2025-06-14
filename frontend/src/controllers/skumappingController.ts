import { apiClient } from "../config/api.config";
import { apiRequest } from "./apiController";

class SkuMappingController {
  static getVariantsForSkuMapping() {
    return apiRequest("post", "/api/products/getVariantsForSkuMapping");
  }

  // static getVariantsForSkuMapping(storeId: any) {
  //   return apiRequest("post", "/api/products/getVariantsForSkuMapping", { storeId });
  // }

  // static updateVariantSKU(variantId: any, sku: string, storeId: any) {
  //   return apiRequest("put", "/api/products/updateVariantSku", {variantId,sku,storeId});
  // }

  static updateSkuMapping(data: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("api/products/updateVariantSku", data)
        .then((res) => {
          if (res?.status === 200) {
            resolve(res?.data);
          } else {
            reject(new Error("Invalid response format"));
          }
        })
        .catch((error) => {
          console.error("SKU Mapping update error:", error);
          reject(error?.response?.data || error);
        });
    });
  }
}

export default SkuMappingController;
