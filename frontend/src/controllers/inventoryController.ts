import { apiClient } from "../config/api.config";
import { apiRequest } from "./apiController";

class InventoryController {
  static getInventoryProducts() {
    return apiRequest(
      "get",
      "/api/v1/products?limit=50&page=1&tabStatus=all&prodStatus=all&vendor=&search="
    );
  }

  static addInventoryProduct(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/api/inventory/create", data)
        .then((res) => {
          if (res?.status === 200) {
            resolve(res?.data);
          } else {
            reject(res.data);
          }
        })
        .catch(({ response }) => {
          console.log("@auth error....", response);
          reject(response?.data);
        });
    });
  }

  static updateInventoryProduct(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/api/inventory/update", data)
        .then((res) => {
          if (res?.status === 200) {
            resolve(res?.data);
          } else {
            reject(res.data);
          }
        })
        .catch(({ response }) => {
          console.log("@auth error....", response);
          reject(response?.data);
        });
    });
  }

  static deleteInventoryProduct(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/api/inventory/delete", data)
        .then((res) => {
          if (res?.status === 200) {
            resolve(res?.data);
          } else {
            reject(res.data);
          }
        })
        .catch(({ response }) => {
          console.log("@auth error....", response);
          reject(response?.data);
        });
    });
  }
}

export default InventoryController;
